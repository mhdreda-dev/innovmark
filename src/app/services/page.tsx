import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { buildPageMetadata, localizedSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("fr", "/services", localizedSeo.fr.services);

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 overflow-hidden pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.18), transparent 62%), radial-gradient(ellipse 48% 44% at 14% 80%, rgba(56,189,248,0.14), transparent 66%)",
          }}
        />
        <Services />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
