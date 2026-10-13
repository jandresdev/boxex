import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { OfficesExplorer } from "@/components/oficinas/offices-explorer";

export const metadata: Metadata = {
  title: "Oficinas de Boxex: mapa en Estados Unidos, Colombia y Guatemala",
  description:
    "Mapa interactivo con las oficinas de Boxex en Miami, New York, New Jersey, Boston, Texas, Colombia y Guatemala: direcciones, teléfonos, WhatsApp y cómo llegar.",
};

export default function OficinasPage() {
  return (
    <>
      <PageIntro
        kicker="Oficinas"
        title="Siempre hay alguien cerca."
        description="Explora el mapa y encuentra la dirección, el teléfono y el WhatsApp de cada oficina en Estados Unidos, Colombia y Guatemala."
        image="/heroes/oficinas.webp"
        actions={[
          { label: "Ver el mapa", href: "#mapa" },
          { label: "Hablar con un asesor", href: "/ayuda#contacto" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <OfficesExplorer />
      </section>
    </>
  );
}
