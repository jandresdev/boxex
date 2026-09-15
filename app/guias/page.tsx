import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Guías para comprar y enviar | Boxex",
  description: "Aprende a preparar tu envío y a usar el casillero de Boxex.",
};

const guides = [
  {
    title: "Cómo preparar tu primer envío",
    desc: "Una guía antes de entregar tu paquete.",
  },
  {
    title: "Cómo usar tu casillero en Estados Unidos",
    desc: "Del registro a la prealerta de tu compra.",
  },
];

export default function GuiasPage() {
  return (
    <>
      <PageIntro
        kicker="Guías"
        title="Envía con más claridad."
        description="Orientación práctica para tu primer envío y tus compras online."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-2">
        {guides.map((g) => (
          <article
            key={g.title}
            className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-lg"
          >
            <h2 className="mb-2 text-xl font-semibold text-brand-blue">{g.title}</h2>
            <p className="mb-5 text-sm text-brand-blue/70">{g.desc}</p>
            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="/ayuda">Leer guía</Link>
            </Button>
          </article>
        ))}
      </section>
    </>
  );
}
