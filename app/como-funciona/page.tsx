import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/layout/page-intro";
import { JourneySection } from "@/components/home/journey";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cómo enviar con Boxex",
  description:
    "Prepara, cotiza y sigue tu envío con Boxex. Conoce el recorrido del paquete y del casillero.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <PageIntro
        kicker="Cómo funciona"
        title="Tu envío, paso a paso."
        description="Elige tu ruta y ten claro qué sucede después."
      />
      <JourneySection />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-3 text-[28px] font-bold text-brand-blue">
          ¿Tu envío es una compra online?
        </h2>
        <p className="mb-6 max-w-xl text-[15px] text-brand-blue/70">
          El casillero tiene su propio recorrido: registro, compra, prealerta
          y despacho.
        </p>
        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/cotizar?servicio=casillero-virtual">
            Ver cómo usar mi casillero
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
