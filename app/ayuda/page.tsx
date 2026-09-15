import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/layout/page-intro";
import { allFaqs } from "@/lib/pages-data";

export const metadata: Metadata = {
  title: "Centro de ayuda y preguntas frecuentes | Boxex",
  description:
    "Resuelve dudas sobre casillero, destinos, costos, rastreo, recogidas y reclamaciones.",
};

export default function AyudaPage() {
  return (
    <>
      <PageIntro
        kicker="Ayuda"
        title="En cada paso, una respuesta."
        description="Encuentra orientación para preparar y seguir tu envío."
      />
      <section className="mx-auto max-w-4xl px-6 pb-14">
        <div className="flex flex-col divide-y divide-brand-line border-y border-brand-line">
          {allFaqs.map((item) => (
            <details key={item.q} className="group cursor-pointer py-[23px]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] font-semibold leading-[1.5] text-brand-blue marker:content-none">
                {item.q}
                <span className="shrink-0 text-[23px] font-normal text-brand-gold transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 pr-8 text-[15px] text-brand-blue/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mx-auto flex max-w-6xl flex-wrap gap-4 px-6 pb-20">
        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/condiciones">Condiciones y restricciones</Link>
        </Button>
        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/reclamaciones">Quejas y reclamos</Link>
        </Button>
        <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
          <Link href="/contacto">Hablar con Boxex</Link>
        </Button>
      </section>
    </>
  );
}
