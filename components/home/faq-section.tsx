import Link from "next/link"
import { Button } from "@/components/ui/button"
import { homeFaqs } from "@/lib/home-data"
import { Reveal } from "./reveal"

export function FaqSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
      <Reveal className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
          Antes de enviar
        </span>
        <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
          Menos dudas.
          <br />
          Más tranquilidad.
        </h2>
        <p className="max-w-md text-neutral-600">
          Respuestas para dar el primer paso.
        </p>
        <Button asChild variant="outline" className="mt-2 w-fit cursor-pointer">
          <Link href="/ayuda">Ir al centro de ayuda</Link>
        </Button>
      </Reveal>
      <Reveal delay={120} className="flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
        {homeFaqs.map((item) => (
          <details key={item.q} className="group cursor-pointer py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-brand-blue marker:content-none">
              {item.q}
              <span className="shrink-0 text-brand-gold transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-neutral-600">{item.a}</p>
          </details>
        ))}
      </Reveal>
    </section>
  )
}
