import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { getPrisma } from "@/lib/cms/prisma";
import { cleanText } from "@/lib/cms/sanitize";

export const runtime = "nodejs";

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const videoTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const maxImageBytes = 8 * 1024 * 1024;
const maxVideoBytes = 120 * 1024 * 1024;
const storageNotConfiguredMessage = "Upload storage is not configured. Add BLOB_READ_WRITE_TOKEN or Cloudinary env variables.";

type UploadedAsset = {
  provider: string;
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  duration?: number;
};

function serializeAsset(asset: {
  id: string;
  kind: "IMAGE" | "VIDEO" | "DOCUMENT";
  provider: string;
  url: string;
  filename: string;
  alt: string | null;
  mimeType: string;
  width: number | null;
  height: number | null;
  duration: number | null;
  sizeBytes: number;
  createdAt: Date;
}) {
  return {
    ...asset,
    createdAt: asset.createdAt.toISOString(),
  };
}

function extension(filename: string, mime: string) {
  const ext = path.extname(filename).replace(/[^a-z0-9.]/gi, "").toLowerCase();
  if (ext) return ext;
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  if (mime === "video/webm") return ".webm";
  if (mime === "video/quicktime") return ".mov";
  return mime.startsWith("video/") ? ".mp4" : ".jpg";
}

async function uploadToLocal(file: File, filename: string) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "cms");
  await mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);
  return { provider: "local", url: `/uploads/cms/${filename}`, publicId: filename };
}

async function uploadToCloudinary(file: File, filename: string, kind: "IMAGE" | "VIDEO") {
  if (!process.env.CLOUDINARY_URL && !(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)) {
    return null;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const result = await new Promise<{ secure_url: string; public_id: string; width?: number; height?: number; duration?: number }>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "innovmark/cms",
        public_id: path.basename(filename, path.extname(filename)),
        resource_type: kind === "VIDEO" ? "video" : "image",
        overwrite: false,
      },
      (error, response) => {
        if (error || !response) reject(error ?? new Error("Cloudinary upload failed"));
        else resolve(response);
      },
    );
    upload.end(bytes);
  });

  return {
    provider: "cloudinary",
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    duration: result.duration,
  };
}

async function uploadToBlob(file: File, filename: string) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const blob = await put(filename, file, { access: "public" });
    return { provider: "vercel-blob", url: blob.url, publicId: blob.pathname };
  } catch (error) {
    console.error("Blob upload failed, trying next CMS media provider:", error);
    return null;
  }
}

async function uploadFile(file: File, filename: string, kind: "IMAGE" | "VIDEO"): Promise<UploadedAsset | null> {
  const uploaded = (await uploadToBlob(file, filename)) ?? (await uploadToCloudinary(file, filename, kind));
  if (uploaded) return uploaded;

  if (process.env.NODE_ENV === "production") return null;

  return uploadToLocal(file, filename);
}

export async function GET(request: Request) {
  await requireAdmin();
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ assets: [] });

  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  const take = Math.min(Number(url.searchParams.get("take") ?? 80), 100);

  const assets = await prisma.mediaAsset.findMany({
    where: {
      isActive: true,
      ...(kind === "IMAGE" || kind === "VIDEO" ? { kind } : {}),
    },
    orderBy: { createdAt: "desc" },
    take,
  });

  return NextResponse.json({ assets: assets.map(serializeAsset) });
}

export async function POST(request: Request) {
  await requireAdmin();
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "DATABASE_URL is required before uploading media." }, { status: 500 });

  const formData = await request.formData();
  const file = formData.get("file");
  const alt = cleanText(formData.get("alt"), 180);
  const imageOnly = formData.get("mediaType") === "image";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  const isImage = imageTypes.has(file.type);
  const isVideo = videoTypes.has(file.type);
  if (imageOnly && !isImage) {
    return NextResponse.json({ error: "Only image uploads are allowed here." }, { status: 400 });
  }

  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }

  if ((isImage && file.size > maxImageBytes) || (isVideo && file.size > maxVideoBytes)) {
    return NextResponse.json({ error: "File is too large." }, { status: 400 });
  }

  const kind = isVideo ? "VIDEO" : "IMAGE";
  const filename = `${Date.now()}-${randomUUID()}${extension(file.name, file.type)}`;
  const uploaded = await uploadFile(file, filename, kind);

  if (!uploaded) {
    return NextResponse.json({ error: storageNotConfiguredMessage }, { status: 500 });
  }

  const asset = await prisma.mediaAsset.create({
    data: {
      kind,
      provider: uploaded.provider,
      url: uploaded.url,
      secureUrl: uploaded.url,
      publicId: uploaded.publicId,
      filename: file.name,
      alt,
      mimeType: file.type,
      sizeBytes: file.size,
      width: uploaded.width,
      height: uploaded.height,
      duration: uploaded.duration,
      metadata: { originalName: file.name },
    },
  });

  return NextResponse.json({ asset });
}

export async function DELETE(request: Request) {
  await requireAdmin();
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "DATABASE_URL is required before deleting media." }, { status: 500 });

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing media asset id." }, { status: 400 });

  await prisma.mediaAsset.update({
    where: { id },
    data: { isActive: false },
  });

  return NextResponse.json({ ok: true });
}
