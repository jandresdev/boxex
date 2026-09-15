import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { DestinosFilter } from "@/components/destinos/destinos-filter";
import { FinalCtaSection } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Destinos y modalidades desde Estados Unidos | Boxex",
  description: "Consulta los 11 destinos de Boxex y las modalidades disponibles por país.",
};

export default function DestinosPage() {
  return (
    <>
      <PageIntro
        kicker="Destinos"
        title="Más cerca, país por país."
        description="Desde Estados Unidos hacia Latinoamérica. Elige tu destino para preparar el envío."
      />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <DestinosFilter />
      </section>
      <FinalCtaSection />
    </>
  );
}
