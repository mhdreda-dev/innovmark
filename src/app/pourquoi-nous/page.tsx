import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhyInnovmark from "@/components/WhyInnovmark";
import { buildPageMetadata, localizedSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("fr", "/pourquoi-nous", localizedSeo.fr.why);

export default function PourquoiNousPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 overflow-hidden pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 58% 48% at 80% 12%, rgba(37,99,235,0.18), transparent 64%), radial-gradient(ellipse 50% 46% at 16% 80%, rgba(139,92,246,0.14), transparent 66%)",
          }}
        />
        <WhyInnovmark />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
