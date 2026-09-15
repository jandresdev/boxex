import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pagos de envíos Boxex",
  description: "Continúa al sistema oficial de pagos de Boxex con tu número de orden.",
};

export default function PagosPage() {
  return (
    <>
      <PageIntro
        kicker="Pagos"
        title="Tu orden, en el canal correcto."
        description="Ten a mano el número de orden asignado a tu envío."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-2">
        <div className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg">
          <h2 className="mb-3 text-xl font-semibold text-brand-blue">
            Continúa al portal oficial
          </h2>
          <p className="mb-6 text-sm text-brand-blue/70">
            Consulta los medios disponibles en Boxex y sigue las
            instrucciones de tu orden. El despacho depende de la
            confirmación del pago según las condiciones del servicio.
          </p>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a href="https://boxexpress.com/pagos/" target="_blank" rel="noopener noreferrer">
              Ir a pagos Boxex
            </a>
          </Button>
        </div>
        <aside className="rounded-xl border border-brand-line p-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-blue">
            ¿Necesitas ayuda con un pago?
          </h2>
          <p className="mb-4 text-sm text-brand-blue/70">
            Conserva tu número de orden y comprobante para consultar al
            equipo.
          </p>
          <Link href="/contacto" className="text-sm font-semibold text-brand-blue underline">
            Contactar a Boxex
          </Link>
        </aside>
      </section>
    </>
  );
}
