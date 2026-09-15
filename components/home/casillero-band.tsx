import Image from "next/image"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"
import { TiltCard } from "./tilt-card"

export function CasilleroBandSection() {
  return (
    <section className="bg-brand-soft-gold py-14 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <TiltCard className="max-w-[450px] rounded-xl border border-white/60 bg-white/80 p-9 shadow-[0_25px_60px_rgba(1,22,137,0.12)] backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-2.5 border-b border-dashed border-brand-line pb-6 text-xs text-brand-blue">
              <ShoppingBag className="size-5" />
              Tu dirección en Estados Unidos
            </div>
            <Image
              src="/logo.png"
              alt="Boxex"
              width={736}
              height={241}
              className="mb-7 h-8 w-auto"
            />
            <p className="mb-4 text-[13px] text-brand-blue/70">
              Tu IDBOX + nombre y apellido
            </p>
            <strong className="mb-5 block text-[25px] leading-[1.4] tracking-[-0.03em] text-brand-blue">
              2025 NW 102 Ave.
              <br />
              Suite 109, Doral FL 33172
            </strong>
            <span className="block text-[11px] leading-[1.5] text-brand-blue/60">
              Confirma tu IDBOX en tu cuenta antes de comprar.
            </span>
          </TiltCard>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3">
          <span className="text-[13px] font-medium text-brand-blue">
            Casillero virtual
          </span>
          <h2 className="text-[35px] font-bold tracking-[-0.048em] text-brand-blue lg:text-[44px]">
            Tus tiendas favoritas.
            <br />
            Tu dirección en USA.
          </h2>
          <p className="max-w-md text-[15px] text-brand-blue/70">
            Crea tu casillero, recibe tu IDBOX y úsalo para identificar tus
            compras. Te acompañamos en el siguiente paso.
          </p>
          <Button
            asChild
            className="mt-2 w-fit cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90"
          >
            <a href="https://clientes.boxexpress.com/">
              Crear mi casillero gratis
              <ArrowRight />
            </a>
          </Button>
          <small className="mt-1 text-[11px] text-brand-blue/60">
            Registro sin costo. El envío se cotiza por separado.
          </small>
        </Reveal>
      </div>
    </section>
  )
}
