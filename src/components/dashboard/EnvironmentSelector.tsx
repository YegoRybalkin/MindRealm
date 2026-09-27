"use client";

import { Check } from "lucide-react";
import { ScenePreview } from "@/components/scene/ScenePreview";
import { ENVIRONMENTS, type EnvironmentTemplate } from "@/environments";
import { cn } from "@/lib/utils";

export function EnvironmentPreview({ env, className }: { env: EnvironmentTemplate; className?: string }) {
  const first = env.sections[0];
  return <ScenePreview background={first.background} objects={first.objects.map((o) => ({ id: o.key, visualType: o.visualType, position: { x: o.x, y: o.y }, size: o.size, flip: o.flip, z: o.z }))} className={className} />;
}

export function EnvironmentSelector({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <div role="radiogroup" aria-label="Environment" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {ENVIRONMENTS.map((env) => {
        const active = value === env.id;
        return (
          <button
            key={env.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(env.id)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border text-left transition-all duration-300",
              active ? "border-foreground/80 ring-2 ring-foreground/15" : "border-border hover:border-foreground/30 hover:shadow-soft",
            )}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <EnvironmentPreview env={env} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                <p className="font-serif text-xl leading-tight">{env.name}</p>
                <p className="text-[13px] text-white/75">{env.tagline}</p>
              </div>
              {active && (
                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
