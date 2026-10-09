import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { JourneySection } from "@/components/home/journey";
import { ProcessMotion } from "@/components/como-funciona/process-motion";
import { CasilleroExplainer } from "@/components/como-funciona/casillero-explainer";

export const metadata: Metadata = {
  title: "Cómo enviar con Boxex",
  description:
    "Prepara, cotiza y sigue tu envío con Boxex. Conoce el recorrido del paquete y del casillero virtual.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <PageIntro
        kicker="Cómo funciona"
        title="Tu envío, paso a paso."
        description="Elige tu ruta y ten claro qué sucede después."
        image="/heroes/como-funciona.webp"
      />
      <ProcessMotion />
      <CasilleroExplainer showSteps={false} />
      <JourneySection />
    </>
  );
}
