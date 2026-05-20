"use client";

import { useState } from "react";
import { Link2, Trash2, Video } from "lucide-react";
import type { CmsMediaAsset } from "@/lib/cms/types";
import { MediaPicker } from "./MediaPicker";
import { UploadDropzone } from "./UploadDropzone";

type VideoUploadProps = {
  value: string;
  onChange: (url: string) => void;
  onMessage?: (message: string, ok?: boolean) => void;
};

export function VideoUpload({ value, onChange, onMessage }: VideoUploadProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showRemote, setShowRemote] = useState(!value || /^https?:\/\//.test(value));

  function select(asset: CmsMediaAsset) {
    onChange(asset.url);
    onMessage?.("Video selected from media library.", true);
  }

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        {value ? (
          <video src={value} controls className="h-56 w-full bg-black object-cover" preload="metadata" />
        ) : (
          <div className="grid h-56 place-items-center text-center text-sm text-white/42">
            <span>
              <Video className="mx-auto mb-2 h-7 w-7 text-white/34" />
              No hero video selected
            </span>
          </div>
        )}
      </div>

      <UploadDropzone
        mediaKind="video"
        onMessage={onMessage}
        onUploaded={(asset) => {
          onChange(asset.url);
          onMessage?.("Hero video uploaded and attached.", true);
        }}
      />

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setPickerOpen(true)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/78 hover:border-cyan-100/40 hover:text-white">
          <Video className="h-4 w-4" />
          Choose from library
        </button>
        <button type="button" onClick={() => setShowRemote((current) => !current)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/70 hover:text-white">
          <Link2 className="h-4 w-4" />
          Remote URL
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-red-300/20 px-4 text-sm text-red-100/70 hover:text-red-100">
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        )}
      </div>

      {showRemote && (
        <input
          type="text"
          value={value}
          placeholder="Paste a remote MP4/WebM URL or use the uploader above"
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-cyan-100/40"
        />
      )}

      <MediaPicker
        open={pickerOpen}
        kind="VIDEO"
        onClose={() => setPickerOpen(false)}
        onSelect={select}
        onMessage={onMessage}
      />
    </div>
  );
}
