"use client";

import { useEffect, useState, useTransition } from "react";
import { ImageIcon, RefreshCw, Trash2, X } from "lucide-react";
import type { CmsMediaAsset } from "@/lib/cms/types";
import { UploadDropzone } from "./UploadDropzone";

type MediaPickerProps = {
  open: boolean;
  kind?: "IMAGE" | "VIDEO";
  alt?: string;
  onClose: () => void;
  onSelect: (asset: CmsMediaAsset) => void;
  onMessage?: (message: string, ok?: boolean) => void;
};

export function MediaPicker({ open, kind = "IMAGE", alt, onClose, onSelect, onMessage }: MediaPickerProps) {
  const [assets, setAssets] = useState<CmsMediaAsset[]>([]);
  const [isPending, startTransition] = useTransition();

  function loadAssets() {
    startTransition(async () => {
      const response = await fetch(`/api/cms/upload?kind=${kind}&take=60`, { cache: "no-store" });
      const json = await response.json();
      setAssets(json.assets ?? []);
    });
  }

  async function deleteAsset(id: string) {
    const label = kind === "VIDEO" ? "video" : "image";
    if (!window.confirm(`Delete this ${label} from the media library?`)) return;
    const response = await fetch(`/api/cms/upload?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!response.ok) {
      const json = await response.json();
      onMessage?.(json.error ?? `Could not delete ${label}.`, false);
      return;
    }
    setAssets((current) => current.filter((asset) => asset.id !== id));
    onMessage?.(`${kind === "VIDEO" ? "Video" : "Image"} removed from media library.`, true);
  }

  useEffect(() => {
    if (open) loadAssets();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md">
      <div className="max-h-[88svh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#050914] shadow-2xl">
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-cyan-100/64">Media library</div>
            <h2 className="mt-1 text-2xl font-light tracking-tight text-white">Choose {kind === "VIDEO" ? "video" : "image"}</h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={loadAssets} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 px-4 text-sm text-white/72 hover:text-white">
              <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/72 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid max-h-[calc(88svh-88px)] gap-5 overflow-y-auto p-4 lg:grid-cols-[320px_1fr]">
          <UploadDropzone
            alt={alt}
            mediaKind={kind === "VIDEO" ? "video" : "image"}
            onMessage={onMessage}
            onUploaded={(asset) => {
              setAssets((current) => [asset, ...current]);
              onSelect(asset);
              onClose();
            }}
          />

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-white/58">
              <ImageIcon className="h-4 w-4" />
              Recent uploads
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {assets.map((asset) => (
                <article key={asset.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(asset);
                      onClose();
                    }}
                    className="block w-full"
                  >
                    {kind === "VIDEO" ? (
                      <video src={asset.url} className="h-36 w-full bg-black object-cover transition group-hover:scale-[1.02]" muted playsInline preload="metadata" />
                    ) : (
                      <img src={asset.url} alt={asset.alt ?? ""} className="h-36 w-full object-cover transition group-hover:scale-[1.02]" />
                    )}
                  </button>
                  <div className="flex items-center justify-between gap-2 p-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(asset);
                        onClose();
                      }}
                      className="min-w-0 text-left"
                    >
                      <div className="truncate text-sm text-white/82">{asset.filename}</div>
                      <div className="mt-1 text-xs text-white/40">{Math.round(asset.sizeBytes / 1024)} KB</div>
                    </button>
                    <button type="button" onClick={() => void deleteAsset(asset.id)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-red-300/20 text-red-100/64 hover:text-red-100">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {!assets.length && (
              <div className="grid min-h-56 place-items-center rounded-2xl border border-white/10 bg-black/20 text-sm text-white/44">
                No uploaded {kind === "VIDEO" ? "videos" : "images"} yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
