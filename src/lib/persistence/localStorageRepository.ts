import type { Profile, World } from "@/lib/types";
import { EMPTY_PROFILE } from "@/lib/domain/profile";
import type { MemoryRepository } from "./repository";

const NS = "mindrealm:v1";
const INDEX_KEY = `${NS}:index`;
const PROFILE_KEY = `${NS}:profile`;
const worldKey = (id: string) => `${NS}:world:${id}`;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("MindRealm: failed to persist", key, e);
    throw e;
  }
}

export class LocalStorageRepository implements MemoryRepository {
  async listWorlds(): Promise<World[]> {
    const ids = read<string[]>(INDEX_KEY, []);
    return ids.map((id) => read<World | null>(worldKey(id), null)).filter((w): w is World => !!w && Array.isArray(w.sections));
  }

  async saveWorld(world: World): Promise<void> {
    write(worldKey(world.id), world);
    const ids = read<string[]>(INDEX_KEY, []);
    if (!ids.includes(world.id)) write(INDEX_KEY, [...ids, world.id]);
  }

  async deleteWorld(id: string): Promise<void> {
    window.localStorage.removeItem(worldKey(id));
    write(
      INDEX_KEY,
      read<string[]>(INDEX_KEY, []).filter((x) => x !== id),
    );
  }

  async loadProfile(): Promise<Profile> {
    return { ...EMPTY_PROFILE, ...read<Partial<Profile>>(PROFILE_KEY, {}) };
  }

  async saveProfile(profile: Profile): Promise<void> {
    write(PROFILE_KEY, profile);
  }
}
