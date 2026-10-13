import type { Metadata } from "next"
import Link from "next/link"
import { FileDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { FinalCtaSection } from "@/components/home/final-cta"
import { ConditionsExplorer } from "@/components/condiciones/conditions-explorer"
import { contractDoc, quickFacts } from "@/lib/condiciones-data"

export const metadata: Metadata = {
  title: "Condiciones y restricciones de envío | Boxex",
  description:
    "Límites de peso, valor y medidas, artículos restringidos, impuestos, seguro, tiempos de entrega y costos adicionales de los envíos de Boxex.",
}

export default function CondicionesPage() {
  return (
    <>
      <PageIntro
        kicker="Condiciones y restricciones"
        title="Un buen envío empieza informado."
        description="Revisa las condiciones de utilización de nuestros servicios antes de comprar, empacar o despachar."
        image="/heroes/condiciones.webp"
        actions={[
          { label: "Ver las condiciones", href: "#condiciones" },
          { label: "Cotizar mi envío", href: "/cotizar" },
        ]}
        highlights={["Límites claros", "Búscalas por tema", "Documentos en PDF"]}
        flush
      />

      {/* Datos clave */}
      <section aria-label="Límites del envío courier a Colombia" className="bg-[#04102e]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:py-16">
          <Reveal className="mb-8 max-w-2xl text-white">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Lo esencial en 10 segundos</span>
            <h2 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-[-0.04em] lg:text-[36px]">Límites del envío courier a Colombia.</h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((f, i) => (
              <Reveal key={f.value} delay={i * 70}>
                <li className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 text-white">
                  <strong className="block text-[34px] font-bold leading-none tracking-[-0.04em] text-brand-gold">{f.value}</strong>
                  <span className="mt-3 block text-[15px] font-semibold leading-snug">{f.label}</span>
                  <span className="mt-1 block text-[13px] text-white/60">{f.hint}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Condiciones */}
      <section id="condiciones" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 lg:py-28">
        <ConditionsExplorer />
      </section>

      {/* Documentos */}
      <section className="bg-brand-pale/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Documentos oficiales</span>
            <h2 className="mt-2 text-[26px] font-bold leading-[1.15] tracking-[-0.04em] text-brand-blue lg:text-[32px]">
              El contrato y las normas, a un clic.
            </h2>
            <p className="mt-2 text-[15px] leading-[1.7] text-brand-blue/70">
              Consulta el contrato de prestación de servicios postales y el resto de la documentación legal de Boxex.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
              <a href={contractDoc.href} target="_blank" rel="noopener noreferrer">
                <FileDown />
                Contrato de servicios (PDF)
              </a>
            </Button>
            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="/legal">Aspectos legales</Link>
            </Button>
            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="/ayuda#contacto">
                <MessageCircle />
                ¿Dudas? Escríbenos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  )
}
