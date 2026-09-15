import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/layout/page-intro";
import { QuoteForm } from "@/components/cotizar/quote-form";

export const metadata: Metadata = {
  title: "Solicita una cotización de envío | Boxex",
  description:
    "Prepara origen, destino, contenido, peso y medidas para consultar una cotización con Boxex.",
};

export default function CotizarPage() {
  return (
    <>
      <PageIntro
        kicker="Cotizar"
        title="Empieza con tu próximo envío."
        description="Prepara los datos y continúa con un asesor de Boxex para recibir una cotización."
      />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Suspense fallback={null}>
          <QuoteForm />
        </Suspense>
      </section>
    </>
  );
}
