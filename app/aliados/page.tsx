import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Red de aliados y agentes Boxex",
  description:
    "Conoce el canal oficial para solicitar vinculación a la red de agentes Boxex.",
};

export default function AliadosPage() {
  return (
    <>
      <PageIntro
        kicker="Aliados"
        title="Conectemos más oportunidades."
        description="Consulta cómo solicitar tu vinculación a la red de agentes autorizados Boxex."
      />
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg">
          <h2 className="mb-3 text-xl font-semibold text-brand-blue">
            Presenta tu solicitud
          </h2>
          <p className="mb-6 text-sm text-brand-blue/70">
            Completa el formulario oficial para que el equipo evalúe tu
            solicitud y te explique las condiciones de vinculación.
          </p>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a
              href="https://boxexpress.com/hagase-nuestro-agente/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar información para ser aliado
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
