import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CasilleroBandSection() {
  return (
    <section className="bg-brand-blue py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
        <div className="rounded-2xl bg-white p-6 text-brand-blue shadow-xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <ShoppingBag className="size-5" />
            Tu dirección en Estados Unidos
          </div>
          <Image src="/logo.png" alt="Boxex" width={160} height={32} />
          <p className="mt-4 text-sm text-neutral-600">Tu IDBOX + nombre y apellido</p>
          <strong className="block text-lg">
            2025 NW 102 Ave.
            <br />
            Suite 109, Doral FL 33172
          </strong>
          <span className="mt-3 block text-xs text-neutral-500">
            Confirma tu IDBOX en tu cuenta antes de comprar.
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
            Casillero virtual
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Tus tiendas favoritas.
            <br />
            Tu dirección en USA.
          </h2>
          <p className="max-w-md text-white/80">
            Crea tu casillero, recibe tu IDBOX y úsalo para identificar tus
            compras. Te acompañamos en el siguiente paso.
          </p>
          <Button
            asChild
            className="mt-2 w-fit bg-brand-gold text-brand-blue hover:bg-brand-gold/90"
          >
            <a href="https://clientes.boxexpress.com/">
              Crear mi casillero gratis
              <ArrowRight />
            </a>
          </Button>
          <small className="text-white/60">
            Registro sin costo. El envío se cotiza por separado.
          </small>
        </div>
      </div>
    </section>
  )
}
