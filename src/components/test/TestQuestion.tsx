"use client";

import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, SheetContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ObjectArt } from "@/components/scene/ObjectArt";
import type { TestAnswer } from "@/lib/domain/testSession";
import type { Concept, Section, WorldObject } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  section?: Section;
  container?: WorldObject;
  object?: WorldObject;
  concept?: Concept;
  result?: TestAnswer;
  glow: string;
  onSubmit: (answer: string) => void;
  onContinue: () => void;
}

export function TestQuestion({ open, onOpenChange, section, container, object, concept, result, glow, onSubmit, onContinue }: Props) {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) setAnswer("");
  }, [open, object?.id]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => (result ? continueRef.current?.focus() : inputRef.current?.focus()), 220);
    return () => clearTimeout(t);
  }, [open, result]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SheetContent className="dark" aria-describedby={undefined}>
        {object && section && concept && (
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="relative px-6 pb-4 pt-6">
              <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(120% 90% at 20% 0%, ${glow}33, transparent 60%)` }} />
              <div className="relative flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
                  <ObjectArt visualType={object.visualType} className="max-h-full max-w-full" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {section.name}
                    {container ? ` · ${container.name}` : ""}
                  </p>
                  <DialogPrimitive.Title className="truncate font-serif text-xl font-medium">{object.name}</DialogPrimitive.Title>
                </div>
              </div>
            </div>
            <div className="flex-1 px-6 pb-6">
              {!result ? (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (answer.trim()) onSubmit(answer);
                  }}
                >
                  <label htmlFor="recall" className="block font-serif text-lg leading-snug">
                    What concept is associated with this object?
                  </label>
                  <Input id="recall" ref={inputRef} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer…" autoComplete="off" autoCorrect="off" spellCheck={false} />
                  <div className="flex items-center gap-2">
                    <Button type="submit" variant="gold" disabled={!answer.trim()}>
                      Check Answer
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => onSubmit("")}>
                      I don&apos;t know
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Capitalisation and small typos are forgiven.</p>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-5" aria-live="polite">
                  {result.correct ? (
                    <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-400/30">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-5 w-5" strokeWidth={3} />
                      </span>
                      <div>
                        <p className="font-medium text-emerald-300">Correct ✓</p>
                        {!result.exact && <p className="text-xs text-emerald-200/70">Close enough — spelled “{result.answer}”.</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-rose-500/10 p-4 ring-1 ring-rose-400/30">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white">
                          <X className="h-5 w-5" strokeWidth={3} />
                        </span>
                        <p className="font-medium text-rose-300">Not quite</p>
                      </div>
                      <dl className="mt-3 grid grid-cols-[auto,1fr] gap-x-4 gap-y-1.5 text-sm">
                        <dt className="text-muted-foreground">Your answer</dt>
                        <dd className="text-foreground/80 line-through decoration-rose-400/60">{result.answer || "—"}</dd>
                        <dt className="text-muted-foreground">Correct answer</dt>
                        <dd className="font-medium">{result.expected}</dd>
                      </dl>
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-gold">{concept.title}</h3>
                    {concept.description && <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">{concept.description}</p>}
                    {concept.example && <p className="mt-3 border-l-2 border-white/10 pl-3 text-sm italic leading-relaxed text-muted-foreground">{concept.example}</p>}
                  </div>
                  <Button ref={continueRef} variant="secondary" onClick={onContinue}>
                    Continue <ArrowRight />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Dialog>
  );
}
