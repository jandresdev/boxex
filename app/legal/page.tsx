import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Información legal de Boxex",
  description: "Accede a las políticas, condiciones y documentos oficiales de Boxex.",
};

export default function LegalPage() {
  return (
    <>
      <PageIntro
        kicker="Información legal"
        title="Información para una relación clara."
        description="Consulta las políticas y documentos publicados por Boxex."
      />
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg">
          <h2 className="mb-3 text-xl font-semibold text-brand-blue">
            Documentos oficiales
          </h2>
          <p className="mb-6 text-sm text-brand-blue/70">
            El centro legal reúne el contrato de prestación de servicios,
            derechos y deberes, política de datos y documentos de
            cumplimiento de Boxex.
          </p>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a
              href="https://boxexpress.com/centroaspectos-legales/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir centro legal de Boxex
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
