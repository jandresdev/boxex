import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { OficinasSearch } from "@/components/oficinas/oficinas-search";

export const metadata: Metadata = {
  title: "Oficinas de Boxex en Estados Unidos y Colombia",
  description:
    "Encuentra direcciones y teléfonos de las oficinas Boxex en Miami, New York, New Jersey, Boston, Texas y Colombia.",
};

export default function OficinasPage() {
  return (
    <>
      <PageIntro
        kicker="Oficinas"
        title="Siempre hay alguien cerca."
        description="Encuentra las direcciones y teléfonos de atención en Estados Unidos y Colombia."
      />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <OficinasSearch />
      </section>
    </>
  );
}
