import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"

export function FinalCtaSection() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue sm:text-3xl">
            Lo que importa, hazlo llegar.
          </h2>
          <p className="mt-1 max-w-md text-neutral-600">
            Cuéntanos qué quieres enviar. Te ayudamos a elegir la opción para
            tu destino.
          </p>
        </div>
        <Button
          asChild
          className="cursor-pointer bg-brand-gold text-brand-blue hover:bg-brand-gold/90"
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
