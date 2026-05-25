import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import { buildPageMetadata, localizedSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("fr", "/processus", localizedSeo.fr.process);

export default function ProcessusPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 overflow-hidden pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 48% at 72% 8%, rgba(139,92,246,0.16), transparent 64%), radial-gradient(ellipse 50% 46% at 16% 80%, rgba(56,189,248,0.14), transparent 66%)",
          }}
        />
        <Process />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
