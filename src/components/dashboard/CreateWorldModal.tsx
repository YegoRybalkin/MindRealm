"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, Input, Textarea } from "@/components/ui/input";
import { getEnvironment } from "@/environments";
import { useMemoryStore } from "@/lib/store/MemoryStore";
import { TERMS, plural } from "@/lib/terminology";
import { EnvironmentPreview, EnvironmentSelector } from "./EnvironmentSelector";

export function CreateWorldModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const store = useMemoryStore();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [envId, setEnvId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStep(1);
      setEnvId(null);
      setName("");
      setSubject("");
      setDescription("");
    }
  }, [open]);

  useEffect(() => {
    if (step === 2) setTimeout(() => nameRef.current?.focus(), 150);
  }, [step]);

  const env = envId ? getEnvironment(envId) : null;

  const create = async () => {
    if (!envId || !name.trim()) return;
    setBusy(true);
    try {
      const world = await store.createWorld({ name, environmentType: envId, subject, description });
      toast.success("World created", { description: `${world.name} is ready — start placing concepts.` });
      onOpenChange(false);
      router.push(`/worlds/${world.id}`);
    } catch {
      toast.error("Couldn't create the world.");
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-5 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <DialogHeader>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Step 1 of 2</p>
                <DialogTitle>Choose an environment</DialogTitle>
                <DialogDescription>Pick a place you can picture clearly. Each has distinct rooms full of objects to hold your concepts.</DialogDescription>
              </DialogHeader>
              <EnvironmentSelector
                value={envId}
                onChange={(id) => {
                  setEnvId(id);
                  setStep(2);
                }}
              />
            </motion.div>
          ) : (
            env && (
              <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.2 }}>
                <DialogHeader>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Step 2 of 2</p>
                  <DialogTitle>Name your {env.name.toLowerCase()}</DialogTitle>
                  <DialogDescription>{env.description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 sm:grid-cols-[1fr,1.1fr]">
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-2xl border">
                      <EnvironmentPreview env={env} className="aspect-[16/9] w-full" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Starts with {plural(Math.min(env.startingSections, env.sections.length), TERMS.section.toLowerCase())}: {env.sections.slice(0, env.startingSections).map((s) => s.name).join(", ")}. Generate more any time.
                    </p>
                  </div>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void create();
                    }}
                  >
                    <Field label="World name" htmlFor="w-name">
                      <Input id="w-name" ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Organic Chemistry" maxLength={60} required />
                    </Field>
                    <Field label="Subject / course" hint="optional" htmlFor="w-subject">
                      <Input id="w-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. CHEM 201" maxLength={60} />
                    </Field>
                    <Field label="Description" hint="optional" htmlFor="w-desc">
                      <Textarea id="w-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What will you memorise here?" rows={3} />
                    </Field>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Button variant="ghost" onClick={() => setStep(1)}>
                        <ArrowLeft /> Back
                      </Button>
                      <Button type="submit" disabled={!name.trim() || busy}>
                        {busy ? <Loader2 className="animate-spin" /> : null} Enter world <ArrowRight />
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
