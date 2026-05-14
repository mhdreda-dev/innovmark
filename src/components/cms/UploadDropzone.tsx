"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, UploadCloud } from "lucide-react";
import type { CmsMediaAsset } from "@/lib/cms/types";

type UploadDropzoneProps = {
  alt?: string;
  mediaKind?: "image" | "video";
  onUploaded: (asset: CmsMediaAsset) => void;
  onMessage?: (message: string, ok?: boolean) => void;
};

const maxImageBytes = 8 * 1024 * 1024;
const maxVideoBytes = 120 * 1024 * 1024;
const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const acceptedVideoTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);

async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif" || file.size < 900_000) return file;

  const bitmap = await createImageBitmap(file);
  const maxSide = 1800;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));
  bitmap.close();
  if (!blob || blob.size >= file.size) return file;

  const basename = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${basename}.webp`, { type: "image/webp" });
}

export function UploadDropzone({ alt, mediaKind = "image", onUploaded, onMessage }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    const accepts = mediaKind === "video" ? acceptedVideoTypes : acceptedTypes;
    const maxBytes = mediaKind === "video" ? maxVideoBytes : maxImageBytes;
    if (!accepts.has(file.type)) {
      onMessage?.(mediaKind === "video" ? "Please choose an MP4, WebM or MOV video." : "Please choose a JPG, PNG, WebP or GIF image.", false);
      return;
    }

    if (file.size > maxBytes) {
      onMessage?.(mediaKind === "video" ? "Video is too large. Maximum size is 120 MB." : "Image is too large. Maximum size is 8 MB.", false);
      return;
    }

    setIsUploading(true);
    setProgress(18);

    try {
      const optimized = mediaKind === "image" ? await compressImage(file) : file;
      setProgress(48);

      const formData = new FormData();
      formData.set("file", optimized);
      formData.set("alt", alt ?? "");
      formData.set("mediaType", mediaKind);

      const response = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });
      setProgress(86);

      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Upload failed");

      setProgress(100);
      onUploaded(json.asset);
      onMessage?.(`${mediaKind === "video" ? "Video" : "Image"} uploaded and selected.`, true);
    } catch (error) {
      onMessage?.(error instanceof Error ? error.message : "Upload failed.", false);
    } finally {
      window.setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 450);
    }
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        void handleFile(event.dataTransfer.files[0]);
      }}
      className={`relative rounded-2xl border border-dashed p-4 transition ${
        isDragging ? "border-cyan-200/60 bg-cyan-200/10" : "border-white/14 bg-white/[0.035]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={mediaKind === "video" ? "video/mp4,video/webm,video/quicktime" : "image/jpeg,image/png,image/webp,image/gif"}
        className="sr-only"
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />
      <div className="flex flex-col items-center justify-center gap-3 py-5 text-center">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/20 text-cyan-100">
          {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
        </span>
        <div>
          <div className="text-sm text-white/82">Drop {mediaKind === "video" ? "a video" : "an image"} here</div>
          <div className="mt-1 text-xs text-white/42">
            {mediaKind === "video" ? "MP4, WebM or MOV up to 120 MB" : "JPG, PNG, WebP or GIF up to 8 MB"}
          </div>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-cyan-100 disabled:opacity-50"
        >
          <ImagePlus className="h-4 w-4" />
          Choose {mediaKind === "video" ? "video" : "image"}
        </button>
      </div>
      {isUploading && (
        <div className="absolute inset-x-4 bottom-4 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-cyan-200 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
