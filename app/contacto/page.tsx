import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/home-data";

export const metadata: Metadata = {
  title: "Contacto y atención al cliente | Boxex",
  description: "Encuentra los canales de Boxex para consultar un envío o recibir atención.",
};

export default function ContactoPage() {
  return (
    <>
      <PageIntro
        kicker="Contacto"
        title="Hablemos de lo que necesitas."
        description="Elige un canal de atención para tu consulta."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 sm:grid-cols-3">
        <article className="rounded-xl border border-white/60 bg-white/70 p-7 backdrop-blur-lg">
          <h2 className="mb-2 text-lg font-semibold text-brand-blue">WhatsApp</h2>
          <p className="mb-5 text-sm text-brand-blue/70">
            Consulta servicios y recibe orientación.
          </p>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Hablar con un asesor
            </a>
          </Button>
        </article>
        <article className="rounded-xl border border-white/60 bg-white/70 p-7 backdrop-blur-lg">
          <h2 className="mb-2 text-lg font-semibold text-brand-blue">Correo electrónico</h2>
          <p className="mb-5 text-sm text-brand-blue/70">Canal indicado por Boxex.</p>
          <a href="mailto:info@boxex.us" className="font-medium text-brand-blue underline">
            info@boxex.us
          </a>
        </article>
        <article className="rounded-xl border border-white/60 bg-white/70 p-7 backdrop-blur-lg">
          <h2 className="mb-2 text-lg font-semibold text-brand-blue">Atención en oficina</h2>
          <p className="mb-5 text-sm text-brand-blue/70">Encuentra la sede más conveniente para ti.</p>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/oficinas">Buscar oficina</Link>
          </Button>
        </article>
      </section>
    </>
  );
}
