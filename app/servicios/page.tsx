import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { FinalCtaSection } from "@/components/home/final-cta";
import { ServiceStack } from "@/components/servicios/service-stack";

export const metadata: Metadata = {
  title: "Servicios de envíos y logística | Boxex",
  description:
    "Conoce las soluciones de Boxex para paquetes, compras online y exportaciones.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageIntro
        kicker="Servicios"
        title="¿Qué quieres hacer llegar?"
        description="Elige la solución para tu paquete, tus compras o tu negocio."
        image="/heroes/servicios.webp"
      />
      <ServiceStack />
      <FinalCtaSection />
    </>
  );
}
