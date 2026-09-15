import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Condiciones y restricciones de envío | Boxex",
  description:
    "Consulta las condiciones oficiales de Boxex y confirma los requisitos de tu mercancía antes de enviar.",
};

export default function CondicionesPage() {
  return (
    <>
      <PageIntro
        kicker="Ayuda / Condiciones"
        title="Un buen envío empieza informado."
        description="Revisa las condiciones antes de comprar, empacar o despachar."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-2">
        <div className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg">
          <h2 className="mb-3 text-xl font-semibold text-brand-blue">
            Consulta tu contenido y destino
          </h2>
          <p className="mb-6 text-sm text-brand-blue/70">
            Las restricciones y requisitos dependen de la mercancía, del país
            y de la modalidad. Confirma con Boxex si tu paquete puede viajar y
            qué documentos requiere.
          </p>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a
              href="https://boxexpress.com/condiciones-restricciones/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leer condiciones oficiales
            </a>
          </Button>
        </div>
        <aside className="rounded-xl border border-brand-line p-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-blue">
            Prepara tu consulta
          </h2>
          <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-brand-blue/70">
            <li>Descripción exacta del producto</li>
            <li>Cantidad y valor declarado</li>
            <li>Peso y dimensiones</li>
            <li>País y ciudad de destino</li>
          </ul>
          <Link href="/cotizar" className="text-sm font-semibold text-brand-blue underline">
            Consultar con un asesor
          </Link>
        </aside>
      </section>
    </>
  );
}
