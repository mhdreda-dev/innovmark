import { CmsCard, CmsHeader } from "@/components/cms/CmsShell";
import { MediaLibrary } from "@/components/cms/MediaLibrary";
import { getPrisma } from "@/lib/cms/prisma";
import type { CmsMediaAsset } from "@/lib/cms/types";

export default async function MediaContentPage() {
  const prisma = getPrisma();
  const assets: CmsMediaAsset[] = prisma
    ? (await prisma.mediaAsset.findMany({ where: { isActive: true, kind: "IMAGE" }, orderBy: { createdAt: "desc" }, take: 100 })).map((asset) => ({
        id: asset.id,
        kind: asset.kind,
        provider: asset.provider,
        url: asset.url,
        filename: asset.filename,
        alt: asset.alt,
        mimeType: asset.mimeType,
        width: asset.width,
        height: asset.height,
        duration: asset.duration,
        sizeBytes: asset.sizeBytes,
        createdAt: asset.createdAt.toISOString(),
      }))
    : [];

  return (
    <>
      <CmsHeader eyebrow="Assets" title="Media library" description="Upload images and videos, preview them, and reuse the resulting URLs in hero and SEO fields." />
      <div className="grid gap-6">
        <CmsCard title="Image media library" description="Drag images in, choose from your computer, copy URLs, or delete unused assets.">
          <MediaLibrary initialAssets={assets} />
        </CmsCard>
      </div>
    </>
  );
}
