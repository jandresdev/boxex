import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"

export function FinalCtaSection() {
  return (
    <section className="bg-brand-blue text-white">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:py-[65px]">
        <div>
          <h2 className="mb-3 text-[32px] font-bold text-white lg:text-[42px]">
            Lo que importa, hazlo llegar.
          </h2>
          <p className="max-w-[590px] text-[15px] text-white/80">
            Cuéntanos qué quieres enviar. Te ayudamos a elegir la opción para
            tu destino.
          </p>
        </div>
        <Button
          asChild
          className="shrink-0 cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90"
        >
          <Link href="/cotizar">
            Preparar mi envío
            <ArrowRight />
          </Link>
        </Button>
      </Reveal>
    </section>
  )
}
