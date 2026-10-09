import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { DocumentCategoryList } from "@/components/legal/document-category-list";
import { condicionesCategories } from "@/lib/legal-documents";

export const metadata: Metadata = {
  title: "Condiciones y restricciones | Boxex",
  description:
    "Condiciones de utilización de los servicios de Boxex: contrato, envío, artículos restringidos y tarifas.",
};

export default function CondicionesPage() {
  return (
    <>
      <PageIntro
        kicker="Condiciones y restricciones"
        title="Un buen envío empieza informado."
        description="Revisa las condiciones de utilización de nuestros servicios antes de comprar, empacar o despachar."
        image="/heroes/condiciones.webp"
      />
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <DocumentCategoryList categories={condicionesCategories} />
      </section>
    </>
  );
}
