import Link from "next/link"
import { Button } from "@/components/ui/button"
import { homeFaqs } from "@/lib/home-data"
import { Reveal } from "./reveal"

export function FaqSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-6 py-[66px] sm:py-20 lg:grid-cols-2 lg:gap-[100px] lg:py-[110px]">
      <Reveal className="flex flex-col gap-3">
        <span className="text-[13px] font-medium text-brand-blue">
          Antes de enviar
        </span>
        <h2 className="text-[35px] font-bold tracking-[-0.048em] text-brand-blue lg:text-[49px]">
          Menos dudas.
          <br />
          Más tranquilidad.
        </h2>
        <p className="max-w-md text-[15px] text-brand-blue/70">
          Respuestas para dar el primer paso.
        </p>
        <Button asChild variant="outline" className="mt-2 w-fit cursor-pointer">
          <Link href="/ayuda">Ir al centro de ayuda</Link>
        </Button>
      </Reveal>
      <Reveal delay={120} className="flex flex-col divide-y divide-brand-line border-y border-brand-line">
        {homeFaqs.map((item) => (
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
      </Reveal>
    </section>
  )
}
