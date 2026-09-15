import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageIntro } from "@/components/layout/page-intro";
import { FinalCtaSection } from "@/components/home/final-cta";
import { Button } from "@/components/ui/button";
import { countries, slugify } from "@/lib/home-data";

export function generateStaticParams() {
  return Object.keys(countries).map((c) => ({ slug: slugify(c) }));
}

function findCountry(slug: string) {
  return Object.keys(countries).find((c) => slugify(c) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = findCountry(slug);
  if (!country) return {};
  return {
    title: `Envíos de Estados Unidos a ${country} | Boxex`,
    description: `Consulta envíos de Estados Unidos a ${country} con Boxex. Modalidades: ${countries[country].join(", ")}.`,
  };
}

export default async function DestinoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = findCountry(slug);
  if (!country) notFound();
  const modes = countries[country];

  return (
    <>
      <PageIntro
        kicker={`Destinos / ${country}`}
        title={`Estados Unidos → ${country}`}
        description="Tu siguiente conexión empieza aquí."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-2">
        <div className="rounded-xl bg-brand-pale p-8">
          <h2 className="mb-5 text-2xl font-semibold text-brand-blue">
            Opciones para {country}
          </h2>
          <div className="mb-6 flex flex-wrap gap-3">
            {modes.map((m) => (
              <div
                key={m}
                className="flex items-center gap-2 rounded-md bg-white px-3 py-3 text-sm text-brand-blue"
              >
                <Check className="size-4 text-brand-gold" />
                {m}
              </div>
            ))}
          </div>
          <p className="mb-6 text-sm text-brand-blue/70">
            Prepara la ciudad de entrega, el contenido, el peso y las
            dimensiones. El equipo de Boxex te orienta sobre la opción para tu
            paquete.
          </p>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <Link href={`/cotizar?destino=${slug}`}>Cotizar a {country}</Link>
          </Button>
        </div>
        <aside className="rounded-xl border border-brand-line p-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-blue">
            Confirma antes de enviar
          </h2>
          <ul className="mb-5 list-disc space-y-2 pl-5 text-sm text-brand-blue/70">
            <li>Cobertura en la ciudad de destino</li>
            <li>Tarifa y cargos aplicables</li>
            <li>Documentos y restricciones</li>
            <li>Tiempo estimado de entrega</li>
          </ul>
          <Link
            href="/condiciones"
            className="text-sm font-semibold text-brand-blue underline"
          >
            Consultar condiciones
          </Link>
        </aside>
      </section>
      <FinalCtaSection />
    </>
  );
}
