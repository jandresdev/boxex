import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  ["Crea tu cuenta", "Regístrate en el portal oficial y recibe tu IDBOX."],
  ["Compra usando tu dirección", "Incluye tu IDBOX, nombre y la dirección de Boxex en Doral."],
  ["Notifica tu compra", "Prealerta el tracking de la tienda desde tu cuenta."],
  ["Coordina el despacho", "Consulta la recepción, condiciones de envío y pago en tu casillero."],
] as const

export function ServiceDetailBody({ slug }: { slug: string }) {
  switch (slug) {
    case "casillero-virtual":
      return (
        <>
          <ol className="mb-8 flex flex-col divide-y divide-brand-line border-y border-brand-line">
            {steps.map(([title, text], i) => (
              <li key={title} className="flex gap-4 py-5">
                <span className="pt-0.5 text-sm font-semibold text-brand-gold">
                  0{i + 1}
                </span>
                <div>
                  <strong className="block text-brand-blue">{title}</strong>
                  <p className="text-sm text-brand-blue/70">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a href="https://clientes.boxexpress.com/">
              Crear casillero
              <ArrowRight />
            </a>
          </Button>
        </>
      )
    case "recogida-en-casa":
      return (
        <>
          <p className="mb-5 text-[15px] text-brand-blue/70">
            Evita desplazamientos innecesarios. Antes de coordinar la
            recogida, confirma tu ubicación, cantidad de cajas, peso, medidas
            y destino.
          </p>
          <ul className="mb-8 list-disc space-y-2 pl-5 text-sm text-brand-blue/70">
            <li>Ten el paquete listo para su revisión.</li>
            <li>Consulta restricciones de contenido.</li>
            <li>Confirma disponibilidad, costo y fecha con el equipo.</li>
          </ul>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <Link href="/cotizar?servicio=recogida-en-casa">
              Solicitar recogida
              <ArrowRight />
            </Link>
          </Button>
        </>
      )
    case "exportaciones":
      return (
        <>
          <p className="mb-5 text-[15px] text-brand-blue/70">
            Para emprendedores y empresas que necesitan enviar mercancías
            desde Colombia. Comparte origen, destino y descripción del
            producto para recibir orientación.
          </p>
          <ul className="mb-8 list-disc space-y-2 pl-5 text-sm text-brand-blue/70">
            <li>Consulta documentos necesarios.</li>
            <li>Confirma el peso real y las dimensiones.</li>
            <li>
              Revisa responsabilidades, impuestos y condiciones del destino
              con el asesor.
            </li>
          </ul>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <Link href="/cotizar?servicio=exportaciones">
              Consultar exportación
              <ArrowRight />
            </Link>
          </Button>
        </>
      )
    default:
      return (
        <>
          <p className="mb-8 text-[15px] text-brand-blue/70">
            Consulta las alternativas aéreas, marítimas, marítimo express o
            terrestres según tu destino. Las condiciones se confirman para tu
            paquete.
          </p>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/destinos">
              Consultar mi ruta
              <ArrowRight />
            </Link>
          </Button>
        </>
      )
  }
}
