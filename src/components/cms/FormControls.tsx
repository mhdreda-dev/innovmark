"use client";

import { useActionState, useEffect, useState } from "react";
import { Check, Loader2, Plus, Trash2, Upload } from "lucide-react";

type State = { ok: boolean; message: string };

export const initialActionState: State = { ok: false, message: "" };

export function SubmitBar({ action, label = "Save draft", publishAction }: { action: (state: State, formData: FormData) => Promise<State>; label?: string; publishAction?: (state: State, formData: FormData) => Promise<State> }) {
  const [state, formAction, pending] = useActionState(action, initialActionState);
  const [publishState, publishFormAction, publishPending] = useActionState(publishAction ?? action, initialActionState);
  const visible = state.message || publishState.message;

  return (
    <div className="sticky bottom-4 z-20 mt-6 rounded-2xl border border-white/10 bg-black/70 p-3 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className={`text-sm ${state.ok || publishState.ok ? "text-emerald-200" : "text-white/60"}`}>{visible || "Draft changes are private until published."}</div>
        <div className="flex gap-2">
          <button formAction={formAction} disabled={pending} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/84 transition hover:border-cyan-100/40 disabled:opacity-50">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {label}
          </button>
          {publishAction && (
            <button formAction={publishFormAction} disabled={publishPending} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-cyan-100 disabled:opacity-50">
              {publishPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Field({ label, name, defaultValue, as = "input", placeholder, rows = 4 }: { label: string; name: string; defaultValue?: string | number; as?: "input" | "textarea"; placeholder?: string; rows?: number }) {
  const className = "mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-cyan-100/40";
  return (
    <label className="block text-sm text-white/74">
      {label}
      {as === "textarea" ? <textarea name={name} defaultValue={defaultValue} placeholder={placeholder} rows={rows} className={className} /> : <input name={name} defaultValue={defaultValue} placeholder={placeholder} className={className} />}
    </label>
  );
}

export function JsonListEditor<T extends Record<string, unknown>>({
  name,
  initial,
  emptyItem,
  renderItem,
}: {
  name: string;
  initial: T[];
  emptyItem: T;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void, remove: () => void, move: (direction: -1 | 1) => void) => React.ReactNode;
}) {
  const [items, setItems] = useState<T[]>(initial);

  function update(index: number, patch: Partial<T>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function remove(index: number) {
    if (window.confirm("Delete this item?")) setItems((current) => current.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items.map((item, index) => ({ ...item, sortOrder: index })))} />
      <div className="grid gap-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            {renderItem(item, index, (patch) => update(index, patch), () => remove(index), (direction) => move(index, direction))}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setItems((current) => [...current, emptyItem])} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/80 hover:border-cyan-100/40">
        <Plus className="h-4 w-4" />
        Add item
      </button>
    </div>
  );
}

export function ItemToolbar({ onRemove, onMove }: { onRemove: () => void; onMove: (direction: -1 | 1) => void }) {
  return (
    <div className="mb-4 flex justify-end gap-2">
      <button type="button" onClick={() => onMove(-1)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:text-white">Up</button>
      <button type="button" onClick={() => onMove(1)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:text-white">Down</button>
      <button type="button" onClick={onRemove} className="inline-flex items-center gap-1 rounded-full border border-red-300/20 px-3 py-1 text-xs text-red-100/70 hover:text-red-100">
        <Trash2 className="h-3 w-3" />
        Delete
      </button>
    </div>
  );
}

export function MediaUploader() {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  async function upload(formData: FormData) {
    setMessage("Uploading...");
    const file = formData.get("file");
    if (file instanceof File) setPreview(URL.createObjectURL(file));
    const response = await fetch("/api/cms/upload", { method: "POST", body: formData });
    const json = await response.json();
    setMessage(response.ok ? `Uploaded: ${json.asset.url}` : json.error ?? "Upload failed");
  }

  return (
    <form action={upload} className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <input type="file" name="file" accept="image/*,video/*" className="block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black" />
      <input name="alt" placeholder="Alt text" className="mt-3 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
      {preview && (
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          {preview.startsWith("blob:") && <img src={preview} alt="" className="max-h-64 w-full object-contain" />}
        </div>
      )}
      <button className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black">
        <Upload className="h-4 w-4" />
        Upload media
      </button>
      {message && <p className="mt-3 text-sm text-white/64">{message}</p>}
    </form>
  );
}
