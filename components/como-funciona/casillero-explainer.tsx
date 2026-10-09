import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/home/reveal"
import {
  CASILLERO_REGISTER_URL,
  casilleroBenefits,
  casilleroSteps,
  paymentMethods,
} from "@/lib/home-data"

export function CasilleroExplainer({ showSteps = true }: { showSteps?: boolean }) {
  return (
    <section id="casillero-virtual" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-5 flex items-center gap-2 text-[13px] font-medium text-brand-blue">
              <ShoppingBag className="size-4" />
              Casillero virtual
            </span>
            <h2 className="text-[32px] font-bold tracking-[-0.04em] text-brand-blue lg:text-[44px]">
              Tu puerta de entrada
              <br />a miles de tiendas.
            </h2>
          </div>
          <p className="max-w-[460px] text-[15px] leading-[1.7] text-brand-blue/70">
            Recibe una dirección en Estados Unidos para comprar en tiendas
            online. Cuando tus paquetes lleguen, Boxex los procesa y los
            lleva hasta tu destino.
          </p>
        </Reveal>

        <Reveal
          delay={60}
          className="mb-16 grid gap-6 border-t border-brand-line pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {casilleroBenefits.map((b) => (
            <div key={b.title}>
              <h3 className="mb-2 text-[17px] font-semibold text-brand-blue">
                {b.title}
              </h3>
              <p className="text-sm leading-[1.7] text-brand-blue/70">
                {b.text}
              </p>
            </div>
          ))}
        </Reveal>

        {showSteps && (
        <Reveal delay={100}>
          <h3 className="mb-8 text-[22px] font-semibold text-brand-blue">
            De tu carrito a tu puerta, paso a paso.
          </h3>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {casilleroSteps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-brand-line bg-brand-pale/40 p-5"
              >
                <div className="relative mb-4 h-28 w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 23vw, 50vw"
                    className="object-contain p-3"
                  />
                </div>
                <span className="text-xs font-semibold text-brand-gold">
                  0{i + 1}
                </span>
                <h4 className="mb-1 mt-1 text-sm font-semibold text-brand-blue">
                  {step.title}
                </h4>
                <p className="text-xs leading-[1.6] text-brand-blue/70">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
        )}

        <Reveal
          delay={140}
          className="mt-16 flex flex-col items-start gap-8 rounded-2xl border border-brand-line bg-brand-pale/40 p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="mb-2 text-lg font-semibold text-brand-blue">
              Medios de pago disponibles
            </h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-brand-line bg-white px-4 py-1.5 text-sm font-medium text-brand-blue"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a href={CASILLERO_REGISTER_URL} target="_blank" rel="noopener noreferrer">
              Crear mi casillero gratis
              <ArrowRight />
            </a>
          </Button>
        </Reveal>

        <p className="mt-6 text-xs text-brand-blue/50">
          <Link href="/ayuda" className="underline hover:text-brand-blue">
            Ver más preguntas frecuentes
          </Link>
        </p>
      </div>
    </section>
  )
}
