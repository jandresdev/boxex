import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/layout/page-intro";
import { FinalCtaSection } from "@/components/home/final-cta";
import { services } from "@/lib/home-data";

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
      />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group flex h-full cursor-pointer flex-col items-start border-t-2 border-brand-blue pt-7 pb-6"
              >
                <div className="mb-7 flex size-12 items-center justify-center rounded-xl bg-brand-soft-gold text-brand-blue">
                  <Icon className="size-[25px]" />
                </div>
                <h2 className="mb-3.5 min-h-[54px] text-[22px] font-semibold text-brand-blue">
                  {service.name}
                </h2>
                <p className="mb-7 text-sm leading-[1.7] text-brand-blue/70">
                  {service.description}
                </p>
                <span className="mt-auto flex items-center gap-5 text-xs font-semibold text-brand-blue transition-[gap] duration-200 group-hover:gap-7">
                  Consultar
                  <ArrowRight className="size-[18px]" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <FinalCtaSection />
    </>
  );
}
