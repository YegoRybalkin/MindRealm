"use client";

import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Lightbulb, NotebookPen, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Dialog, SheetContent } from "@/components/ui/dialog";
import { Field, Input, Textarea } from "@/components/ui/input";
import { ObjectArt } from "@/components/scene/ObjectArt";
import { MasteryBadge } from "@/components/common/ProgressIndicator";
import { TERMS } from "@/lib/terminology";
import type { Concept, Section, WorldObject } from "@/lib/types";
import { formatRelative } from "@/lib/utils";
import type { ConceptInput } from "@/lib/domain/world";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: Section | undefined;
  container?: WorldObject;
  object: WorldObject | undefined;
  concept: Concept | undefined;
  glow: string;
  onSave: (input: ConceptInput) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function ConceptPanel({ open, onOpenChange, section, container, object, concept, glow, onSave, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (open) setEditing(!concept);
  }, [open, object?.id, concept]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SheetContent className="dark" aria-describedby={undefined}>
        {object && section && (
          <>
            <div className="relative overflow-hidden rounded-t-3xl px-6 pb-5 pt-6">
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
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {editing ? (
                <ConceptForm
                  key={concept?.id ?? object.id}
                  initial={concept}
                  onCancel={() => (concept ? setEditing(false) : onOpenChange(false))}
                  onSubmit={async (input) => {
                    await onSave(input);
                    setEditing(false);
                  }}
                />
              ) : concept ? (
                <ConceptView concept={concept} onEdit={() => setEditing(true)} onDelete={() => setConfirmOpen(true)} />
              ) : null}
            </div>
          </>
        )}
      </SheetContent>
      <ConfirmDialog
        dark
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Delete this ${TERMS.concept.toLowerCase()}?`}
        description={`“${concept?.title ?? ""}” will be removed from the ${object?.name ?? "object"}, along with its study history.`}
        onConfirm={async () => {
          await onDelete();
          toast("Concept deleted");
          onOpenChange(false);
        }}
      />
    </Dialog>
  );
}

function ConceptView({ concept, onEdit, onDelete }: { concept: Concept; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-serif text-2xl font-medium leading-tight text-gold">{concept.title}</h3>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <MasteryBadge concept={concept} />
          <span className="text-xs text-muted-foreground">Reviewed {formatRelative(concept.lastReviewed).toLowerCase()}</span>
        </div>
      </div>
      {concept.description ? (
        <p className="text-[15px] leading-relaxed text-foreground/90">{concept.description}</p>
      ) : (
        <p className="text-sm italic text-muted-foreground">No description yet.</p>
      )}
      {concept.example && (
        <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/5">
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" /> Example
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">{concept.example}</p>
        </div>
      )}
      {concept.notes && (
        <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/5">
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <NotebookPen className="h-3.5 w-3.5" /> Notes
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">{concept.notes}</p>
        </div>
      )}
      <div className="flex gap-2 pt-1">
        <Button variant="secondary" onClick={onEdit}>
          <Pencil /> Edit
        </Button>
        <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={onDelete}>
          <Trash2 /> Delete
        </Button>
      </div>
    </div>
  );
}

function ConceptForm({ initial, onSubmit, onCancel }: { initial?: Concept; onSubmit: (c: ConceptInput) => Promise<void>; onCancel: () => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [example, setExample] = useState(initial?.example ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => titleRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  const submit = async () => {
    if (!title.trim()) {
      setError("Give the concept a name.");
      titleRef.current?.focus();
      return;
    }
    setBusy(true);
    try {
      await onSubmit({ title, description, example, notes });
      toast.success("Concept saved");
    } catch {
      toast.error("Couldn't save — storage may be full.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          void submit();
        }
      }}
    >
      <p className="text-sm text-muted-foreground">{initial ? "Edit the concept attached to this object." : "Attach a concept to this object. Picture it here, vividly."}</p>
      <Field label="Concept name" htmlFor="c-title">
        <Input
          id="c-title"
          ref={titleRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="e.g. Sociological Imagination"
          maxLength={120}
          aria-invalid={!!error}
          autoComplete="off"
        />
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </Field>
      <Field label="Description" htmlFor="c-desc">
        <Textarea id="c-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does it mean, in your own words?" rows={4} />
      </Field>
      <Field label="Example" hint="optional" htmlFor="c-ex">
        <Textarea id="c-ex" value={example} onChange={(e) => setExample(e.target.value)} placeholder="A concrete case that makes it stick" rows={2} className="min-h-[64px]" />
      </Field>
      <Field label="Notes" hint="optional" htmlFor="c-notes">
        <Textarea id="c-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Mnemonic, source, page number…" rows={2} className="min-h-[64px]" />
      </Field>
      <div className="flex items-center gap-2 pt-1">
        <Button type="submit" variant="gold" disabled={busy}>
          Save
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">⌘/Ctrl + Enter</span>
      </div>
    </form>
  );
}
