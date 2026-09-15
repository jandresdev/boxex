import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quejas y reclamos | Boxex",
  description: "Accede al formulario oficial de quejas y reclamos de Boxex.",
};

export default function ReclamacionesPage() {
  return (
    <>
      <PageIntro
        kicker="Ayuda / Reclamaciones"
        title="Queremos conocer tu caso."
        description="Ten a mano la guía y los datos del envío para facilitar la atención."
      />
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg">
          <h2 className="mb-3 text-xl font-semibold text-brand-blue">
            Registra tu reclamación
          </h2>
          <p className="mb-6 text-sm text-brand-blue/70">
            Continúa al formulario oficial de Boxex. Describe lo ocurrido y
            conserva la constancia que entregue el sistema.
          </p>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a
              href="https://boxexpress.com/quejas-y-reclamos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir formulario oficial
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
