import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sobre Boxex",
  description:
    "Boxex conecta personas, familias y empresas mediante soluciones de courier y envíos internacionales.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageIntro
        kicker="Sobre Boxex"
        title="Conectar es lo que nos mueve."
        description="Más de 35 años de experiencia en logística, courier y envíos internacionales."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-brand-blue">
            Personas detrás de cada paquete.
          </h2>
          <p className="mb-4 text-[15px] text-brand-blue/70">
            Boxex facilita el envío de paquetes, documentos y mercancías
            entre Estados Unidos, Colombia y otros destinos de
            Latinoamérica.
          </p>
          <p className="text-[15px] text-brand-blue/70">
            Casillero virtual, envíos internacionales, recogida en casa y
            acompañamiento en exportaciones forman parte de las soluciones
            de la compañía.
          </p>
        </div>
        <aside className="rounded-xl border border-brand-line p-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-blue">
            Familias y negocios
          </h2>
          <p className="mb-5 text-sm text-brand-blue/70">
            Un regalo para alguien cercano. Una compra online. Productos
            para un emprendimiento. El equipo te orienta para preparar tu
            envío.
          </p>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/servicios">Conoce nuestros servicios</Link>
          </Button>
        </aside>
      </section>
    </>
  );
}
