"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getEnvironment } from "@/environments";
import { createDemoWorld } from "@/lib/demo";
import { migrateWorld } from "@/lib/domain/migrate";
import { placeConcepts } from "@/lib/domain/placement";
import { EMPTY_PROFILE, addTestRecord, recordActivity } from "@/lib/domain/profile";
import * as W from "@/lib/domain/world";
import { sectionGenerator } from "@/lib/generation";
import { createRepository, type MemoryRepository } from "@/lib/persistence";
import type { Concept, Profile, Section, TestRecord, World } from "@/lib/types";

type Status = "loading" | "ready" | "error";

interface MemoryStore {
  status: Status;
  saving: boolean;
  worlds: World[];
  profile: Profile;
  getWorld(id: string): World | undefined;
  createWorld(input: W.NewWorldInput): Promise<World>;
  deleteWorld(id: string): Promise<void>;
  updateWorldMeta(id: string, patch: Parameters<typeof W.updateWorldMeta>[1]): Promise<void>;
  saveConcept(worldId: string, sectionId: string, objectId: string, input: W.ConceptInput): Promise<Concept>;
  deleteConcept(worldId: string, sectionId: string, objectId: string): Promise<void>;
  generateSection(worldId: string): Promise<Section>;
  deleteSection(worldId: string, sectionId: string): Promise<void>;
  renameSection(worldId: string, sectionId: string, name: string): Promise<void>;
  recordAnswer(worldId: string, conceptId: string, correct: boolean): Promise<void>;
  recordTest(record: TestRecord): Promise<void>;
  markStudied(worldId: string): Promise<void>;
  importConcepts(worldId: string, concepts: W.ConceptInput[]): Promise<{ placed: number; sectionsAdded: number }>;
  restoreDemo(): Promise<World>;
}

const Ctx = createContext<MemoryStore | null>(null);

export function MemoryStoreProvider({ children, repository }: { children: ReactNode; repository?: MemoryRepository }) {
  const repo = useMemo(() => repository ?? createRepository(), [repository]);
  const [status, setStatus] = useState<Status>("loading");
  const [saving, setSaving] = useState(false);
  const [worlds, setWorlds] = useState<World[]>([]);
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const worldsRef = useRef<World[]>([]);
  const profileRef = useRef<Profile>(EMPTY_PROFILE);
  const pending = useRef(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let [ws, p] = await Promise.all([repo.listWorlds(), repo.loadProfile()]);
        // Upgrade worlds saved by older versions (adds wallpapers & container contents).
        ws = await Promise.all(
          ws.map(async (w) => {
            const m = migrateWorld(w);
            if (m !== w) await repo.saveWorld(m);
            return m;
          }),
        );
        if (!p.demoSeeded) {
          if (ws.length === 0) {
            const demo = createDemoWorld();
            await repo.saveWorld(demo);
            ws = [demo];
          }
          p = { ...p, demoSeeded: true };
          await repo.saveProfile(p);
        }
        if (cancelled) return;
        worldsRef.current = ws;
        profileRef.current = p;
        setWorlds(ws);
        setProfile(p);
        setStatus("ready");
      } catch (e) {
        console.error(e);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const track = useCallback(async (p: Promise<void>) => {
    pending.current++;
    setSaving(true);
    try {
      await p;
    } finally {
      pending.current--;
      if (pending.current === 0) setSaving(false);
    }
  }, []);

  const commitWorld = useCallback(
    async (world: World) => {
      const exists = worldsRef.current.some((w) => w.id === world.id);
      worldsRef.current = exists ? worldsRef.current.map((w) => (w.id === world.id ? world : w)) : [...worldsRef.current, world];
      setWorlds(worldsRef.current);
      await track(repo.saveWorld(world));
    },
    [repo, track],
  );

  const commitProfile = useCallback(
    async (p: Profile) => {
      profileRef.current = p;
      setProfile(p);
      await track(repo.saveProfile(p));
    },
    [repo, track],
  );

  const mustGet = useCallback((id: string) => {
    const w = worldsRef.current.find((x) => x.id === id);
    if (!w) throw new Error("World not found");
    return w;
  }, []);

  const touchActivity = useCallback(() => {
    const next = recordActivity(profileRef.current);
    if (next !== profileRef.current) void commitProfile(next);
  }, [commitProfile]);

  const store = useMemo<MemoryStore>(
    () => ({
      status,
      saving,
      worlds,
      profile,
      getWorld: (id) => worlds.find((w) => w.id === id),
      async createWorld(input) {
        const world = W.createWorld(input);
        await commitWorld(world);
        return world;
      },
      async deleteWorld(id) {
        worldsRef.current = worldsRef.current.filter((w) => w.id !== id);
        setWorlds(worldsRef.current);
        await track(repo.deleteWorld(id));
      },
      async updateWorldMeta(id, patch) {
        await commitWorld(W.updateWorldMeta(mustGet(id), patch));
      },
      async saveConcept(worldId, sectionId, objectId, input) {
        const { world, concept } = W.upsertConcept(mustGet(worldId), sectionId, objectId, input);
        await commitWorld(W.markStudied(world));
        touchActivity();
        return concept;
      },
      async deleteConcept(worldId, sectionId, objectId) {
        await commitWorld(W.removeConcept(mustGet(worldId), sectionId, objectId));
      },
      async generateSection(worldId) {
        const world = mustGet(worldId);
        const section = await sectionGenerator.generate({ world, environment: getEnvironment(world.environmentType) });
        await commitWorld(W.addSection(world, section));
        return section;
      },
      async deleteSection(worldId, sectionId) {
        await commitWorld(W.removeSection(mustGet(worldId), sectionId));
      },
      async renameSection(worldId, sectionId, name) {
        await commitWorld(W.renameSection(mustGet(worldId), sectionId, name));
      },
      async recordAnswer(worldId, conceptId, correct) {
        await commitWorld(W.recordReview(mustGet(worldId), conceptId, correct));
        touchActivity();
      },
      async recordTest(record) {
        await commitProfile(addTestRecord(profileRef.current, record));
      },
      async markStudied(worldId) {
        const w = worldsRef.current.find((x) => x.id === worldId);
        if (!w) return;
        await commitWorld(W.markStudied(w));
        touchActivity();
      },
      async importConcepts(worldId, concepts) {
        const res = await placeConcepts(mustGet(worldId), concepts);
        await commitWorld(W.markStudied(res.world));
        touchActivity();
        return { placed: res.placed, sectionsAdded: res.sectionsAdded };
      },
      async restoreDemo() {
        const demo = createDemoWorld();
        await commitWorld(demo);
        return demo;
      },
    }),
    [status, saving, worlds, profile, commitWorld, commitProfile, mustGet, repo, track, touchActivity],
  );

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useMemoryStore(): MemoryStore {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMemoryStore must be used inside MemoryStoreProvider");
  return ctx;
}
