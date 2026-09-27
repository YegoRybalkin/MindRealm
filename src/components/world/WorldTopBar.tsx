"use client";

import Link from "next/link";
import { ArrowLeft, Brain, Check, Eye, EyeOff, ListPlus, Loader2, Map, MoreHorizontal, Plus, Search, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TERMS } from "@/lib/terminology";
import { cn } from "@/lib/utils";

interface Props {
  worldName: string;
  environmentName: string;
  sectionName: string;
  mode: "learn" | "test";
  showLabels: boolean;
  saving: boolean;
  generating: boolean;
  onToggleLabels: () => void;
  onModeChange: (m: "learn" | "test") => void;
  onSearch: () => void;
  onMap: () => void;
  onGenerate: () => void;
  onImport: () => void;
  onSettings: () => void;
  onDelete: () => void;
}

const iconBtn = "h-10 w-10 rounded-full text-white/80 hover:bg-white/10 hover:text-white";

export function WorldTopBar(p: Props) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/70 via-black/30 to-transparent px-3 pb-10 pt-3 sm:px-5 sm:pt-4">
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        <Link href="/" aria-label="Back to dashboard" className={cn("flex shrink-0 items-center justify-center", iconBtn)}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1 text-white">
          <p className="truncate text-[11px] uppercase tracking-[0.18em] text-white/55">{p.worldName}</p>
          <p className="truncate font-serif text-lg leading-tight sm:text-xl">
            <span className="text-white/60">{p.environmentName} /</span> {p.sectionName}
          </p>
        </div>

        {/* Mode switch */}
        <div role="radiogroup" aria-label="Mode" className="glass hidden shrink-0 items-center rounded-full p-1 md:flex">
          {(["learn", "test"] as const).map((m) => (
            <button
              key={m}
              role="radio"
              aria-checked={p.mode === m}
              onClick={() => p.onModeChange(m)}
              className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", p.mode === m ? "bg-white text-black" : "text-white/75 hover:text-white")}
            >
              {m === "learn" ? TERMS.learnMode : TERMS.testMode}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <span className="hidden w-16 items-center justify-end gap-1 text-xs text-white/45 lg:flex" aria-live="polite">
            {p.saving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" /> Saving
              </>
            ) : (
              <>
                <Check className="h-3 w-3" /> Saved
              </>
            )}
          </span>
          <Button variant="ghost" size="icon" className={iconBtn} onClick={p.onSearch} aria-label="Search concepts" title="Search (⌘K)">
            <Search className="!h-[18px] !w-[18px]" />
          </Button>
          {p.mode === "learn" && (
            <Button variant="ghost" size="icon" className={cn(iconBtn, "hidden sm:inline-flex")} onClick={p.onToggleLabels} aria-label={p.showLabels ? "Hide concept labels" : "Show concept labels"} aria-pressed={p.showLabels} title={p.showLabels ? "Hide labels" : "Show labels"}>
              {p.showLabels ? <EyeOff className="!h-[18px] !w-[18px]" /> : <Eye className="!h-[18px] !w-[18px]" />}
            </Button>
          )}
          <Button variant="ghost" size="icon" className={iconBtn} onClick={p.onMap} aria-label={TERMS.worldMap} title={TERMS.worldMap}>
            <Map className="!h-[18px] !w-[18px]" />
          </Button>
          {p.mode === "learn" && (
            <Button variant="glass" size="sm" className="hidden h-10 px-4 lg:inline-flex" onClick={p.onGenerate} disabled={p.generating}>
              {p.generating ? <Loader2 className="animate-spin" /> : <Plus />} {TERMS.generateSection}
            </Button>
          )}
          {p.mode === "learn" && (
            <Button variant="gold" className="ml-1 h-10 px-3 sm:px-5" onClick={() => p.onModeChange("test")}>
              <Brain /> <span className="hidden sm:inline">{TERMS.testMemory}</span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={iconBtn} aria-label="More actions">
                <MoreHorizontal className="!h-5 !w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark">
              {p.mode === "test" && <DropdownMenuItem onSelect={() => p.onModeChange("learn")}>Back to {TERMS.learnModeLong}</DropdownMenuItem>}
              <DropdownMenuItem onSelect={p.onGenerate} disabled={p.generating}>
                <Plus /> {TERMS.generateSection}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={p.onImport}>
                <ListPlus /> Add concepts in bulk
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={p.onToggleLabels} className="sm:hidden">
                {p.showLabels ? <EyeOff /> : <Eye />} {p.showLabels ? "Hide labels" : "Show labels"}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={p.onSettings}>
                <Settings2 /> World details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive onSelect={p.onDelete}>
                <Trash2 /> Delete world
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
