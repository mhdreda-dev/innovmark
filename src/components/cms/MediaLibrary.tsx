"use client";

import { useState } from "react";
import { Copy, RefreshCw, Trash2 } from "lucide-react";
import type { CmsMediaAsset } from "@/lib/cms/types";
import { UploadDropzone } from "./UploadDropzone";

export function MediaLibrary({ initialAssets }: { initialAssets: CmsMediaAsset[] }) {
  const [assets, setAssets] = useState(initialAssets);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  function showMessage(text: string, ok = true) {
    setMessage({ text, ok });
    window.setTimeout(() => setMessage(null), 3600);
  }

  async function refresh() {
    setLoading(true);
    try {
      const response = await fetch("/api/cms/upload?kind=IMAGE&take=100", { cache: "no-store" });
      const json = await response.json();
      setAssets(json.assets ?? []);
      showMessage("Media library refreshed.", true);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAsset(id: string) {
    if (!window.confirm("Delete this image from the media library?")) return;
    const response = await fetch(`/api/cms/upload?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!response.ok) {
      const json = await response.json();
      showMessage(json.error ?? "Could not delete image.", false);
      return;
    }
    setAssets((current) => current.filter((asset) => asset.id !== id));
    showMessage("Image deleted.", true);
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    showMessage("Image URL copied.", true);
  }

  return (
    <div className="grid gap-6">
      {message && (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${
          message.ok ? "border-emerald-200/20 bg-emerald-400/10 text-emerald-100" : "border-red-200/20 bg-red-500/10 text-red-100"
        }`}>
          {message.text}
        </div>
      )}

      <UploadDropzone
        onMessage={showMessage}
        onUploaded={(asset) => {
          setAssets((current) => [asset, ...current]);
          showMessage("Image uploaded to media library.", true);
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-white/58">{assets.length} image{assets.length === 1 ? "" : "s"}</div>
        <button type="button" onClick={refresh} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/78 hover:border-cyan-100/40 hover:text-white">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => (
          <article key={asset.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <img src={asset.url} alt={asset.alt ?? ""} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="truncate text-sm text-white">{asset.filename}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/42">
                {asset.provider} · {Math.round(asset.sizeBytes / 1024)} KB
              </div>
              <code className="mt-3 block break-all rounded-xl bg-white/[0.06] p-3 text-xs text-cyan-100/80">{asset.url}</code>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => void copyUrl(asset.url)} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/12 px-3 text-xs text-white/70 hover:text-white">
                  <Copy className="h-3.5 w-3.5" />
                  Copy URL
                </button>
                <button type="button" onClick={() => void deleteAsset(asset.id)} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-red-300/20 px-3 text-xs text-red-100/70 hover:text-red-100">
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!assets.length && (
        <div className="grid min-h-56 place-items-center rounded-2xl border border-white/10 bg-black/20 text-sm text-white/44">
          Upload your first CMS image.
        </div>
      )}
    </div>
  );
}
