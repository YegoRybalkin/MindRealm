"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Field, Input, Textarea } from "@/components/ui/input";
import type { World } from "@/lib/types";

export function WorldSettingsDialog({
  open,
  onOpenChange,
  world,
  onSave,
  dark,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  world: World;
  onSave: (patch: { name: string; subject?: string; description?: string }) => Promise<void>;
  dark?: boolean;
}) {
  const [name, setName] = useState(world.name);
  const [subject, setSubject] = useState(world.subject ?? "");
  const [description, setDescription] = useState(world.description ?? "");
  useEffect(() => {
    if (open) {
      setName(world.name);
      setSubject(world.subject ?? "");
      setDescription(world.description ?? "");
    }
  }, [open, world]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dark ? "dark" : undefined}>
        <DialogHeader>
          <DialogTitle>World details</DialogTitle>
          <DialogDescription>Rename or describe this memory world.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!name.trim()) return;
            await onSave({ name: name.trim(), subject: subject.trim() || undefined, description: description.trim() || undefined });
            toast.success("World updated");
            onOpenChange(false);
          }}
        >
          <Field label="World name" htmlFor="ws-name">
            <Input id="ws-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required />
          </Field>
          <Field label="Subject / course" hint="optional" htmlFor="ws-subject">
            <Input id="ws-subject" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={60} />
          </Field>
          <Field label="Description" hint="optional" htmlFor="ws-desc">
            <Textarea id="ws-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </Field>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
