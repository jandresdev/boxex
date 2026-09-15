import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { FinalCtaSection } from "@/components/home/final-cta";
import { ServiceDetailBody } from "@/components/servicios/service-detail-body";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/home-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | Boxex`,
    description: service.description,
  };
}

export default async function ServicioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const Icon = service.icon;

  return (
    <>
      <PageIntro
        kicker={`Servicios / ${service.name}`}
        title={service.tag}
        description={service.description}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-2">
        <div className="rounded-xl bg-brand-pale p-8">
          <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand-soft-gold text-brand-blue">
            <Icon className="size-6" />
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-brand-blue">
            {service.name}
          </h2>
          <ServiceDetailBody slug={service.slug} />
        </div>
        <aside className="rounded-xl border border-brand-line p-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-blue">
            Antes de cotizar
          </h2>
          <p className="mb-3 text-sm text-brand-blue/70">
            Ten a mano estos datos:
          </p>
          <ul className="mb-5 list-disc space-y-2 pl-5 text-sm text-brand-blue/70">
            <li>Ciudad de origen y destino</li>
            <li>Contenido del envío</li>
            <li>Peso y medidas</li>
            <li>Cantidad de cajas o paquetes</li>
          </ul>
          <p className="mb-5 text-sm text-brand-blue/70">
            El equipo confirma el costo y el tiempo estimado según tu caso.
          </p>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/cotizar">Preparar cotización</Link>
          </Button>
        </aside>
      </section>
      <FinalCtaSection />
    </>
  );
}
