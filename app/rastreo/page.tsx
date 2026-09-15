import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rastrea tu envío | Boxex",
  description: "Accede al seguimiento oficial de Boxex con tu número de guía.",
};

export default function RastreoPage() {
  return (
    <>
      <PageIntro
        kicker="Rastreo"
        title="Tu paquete tiene un recorrido."
        description="Consulta su estado con tu número de guía Boxex."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-2">
        <form
          action="https://boxexpress.com/rastreo"
          method="get"
          className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg"
        >
          <label className="block text-sm font-semibold text-brand-blue" htmlFor="nrogui">
            Número de guía Boxex
            <input
              id="nrogui"
              name="nrogui"
              required
              pattern="[A-Za-z0-9-]{3,40}"
              minLength={3}
              maxLength={40}
              placeholder="Escribe tu guía"
              aria-describedby="tracking-help"
              className="mt-2 block w-full rounded-md border border-brand-line bg-white/80 px-4 py-3 text-[15px] text-brand-blue placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"
            />
          </label>
          <p id="tracking-help" className="mb-6 mt-2 text-xs text-brand-blue/60">
            Encontrarás la guía en la información de tu envío. No es
            necesariamente el tracking de la tienda.
          </p>
          <Button type="submit" className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            Consultar en Boxex →
          </Button>
          <p className="mt-3 text-xs text-brand-blue/50">
            Continuarás al sistema oficial de seguimiento de Boxex.
          </p>
        </form>
        <aside className="rounded-xl border border-brand-line p-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-blue">
            ¿No encuentras tu guía?
          </h2>
          <p className="mb-5 text-sm text-brand-blue/70">
            Revisa la confirmación de tu envío o accede a tu casillero. El
            equipo puede orientarte si necesitas ayuda.
          </p>
          <Button asChild variant="outline" className="mb-4 cursor-pointer">
            <a href="https://clientes.boxexpress.com/app/">Entrar a mi casillero</a>
          </Button>
          <Link href="/contacto" className="block text-sm font-semibold text-brand-blue underline">
            Contactar al equipo
          </Link>
        </aside>
      </section>
    </>
  );
}
