"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { ScenePreview } from "@/components/scene/ScenePreview";
import { MasteryRing } from "@/components/common/ProgressIndicator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getEnvironment } from "@/environments";
import { sortSections } from "@/lib/domain/sections";
import { worldStats } from "@/lib/domain/world";
import { TERMS, plural } from "@/lib/terminology";
import type { World } from "@/lib/types";
import { formatRelative } from "@/lib/utils";

export function WorldCard({ world, onEdit, onDelete }: { world: World; onEdit: () => void; onDelete: () => void }) {
  const env = getEnvironment(world.environmentType);
  const stats = worldStats(world);
  const cover = sortSections(world.sections)[0];
  return (
    <article className="group relative overflow-hidden rounded-3xl border bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <Link href={`/worlds/${world.id}`} className="block outline-none" aria-label={`Open ${world.name}`}>
        <div className="relative aspect-[16/9] overflow-hidden" style={{ background: env.theme.ambient }}>
          {cover && <ScenePreview background={cover.background} objects={cover.objects} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">{env.name}</p>
              <h3 className="truncate font-serif text-2xl leading-tight">{world.name}</h3>
            </div>
            <div className="shrink-0 rounded-full bg-black/35 p-0.5 backdrop-blur">
              <MasteryRing value={stats.mastery} size={46} stroke={4} />
            </div>
          </div>
          {world.isDemo && <span className="absolute left-4 top-3.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-black">Example</span>}
        </div>
        <div className="grid grid-cols-3 gap-2 px-5 py-4 text-sm">
          <div>
            <p className="font-semibold tabular-nums">{stats.conceptCount}</p>
            <p className="text-xs text-muted-foreground">{stats.conceptCount === 1 ? TERMS.concept.toLowerCase() : TERMS.concepts.toLowerCase()}</p>
          </div>
          <div>
            <p className="font-semibold tabular-nums">{stats.sectionCount}</p>
            <p className="text-xs text-muted-foreground">{stats.sectionCount === 1 ? TERMS.section.toLowerCase() : TERMS.sections.toLowerCase()}</p>
          </div>
          <div>
            <p className="truncate font-semibold">{formatRelative(world.lastStudiedAt)}</p>
            <p className="text-xs text-muted-foreground">last studied</p>
          </div>
        </div>
        {world.subject && <p className="-mt-1 truncate px-5 pb-4 text-xs text-muted-foreground">{world.subject}</p>}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white opacity-100 backdrop-blur transition-opacity hover:bg-black/55 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 data-[state=open]:opacity-100"
            aria-label={`Actions for ${world.name}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onEdit}>
            <Pencil /> Edit details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onSelect={onDelete}>
            <Trash2 /> Delete world
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="sr-only">
        {plural(stats.conceptCount, "concept")}, {plural(stats.sectionCount, "section")}, {Math.round(stats.mastery * 100)}% mastery
      </span>
    </article>
  );
}
