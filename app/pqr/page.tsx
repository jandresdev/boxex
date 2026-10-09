import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { PqrForm } from "@/components/pqr/pqr-form";
import { DocumentCategoryList } from "@/components/legal/document-category-list";
import { resolucionesDocuments } from "@/lib/legal-documents";

export const metadata: Metadata = {
  title: "PQRs | Boxex",
  description:
    "Radica tu petición, queja, reclamo o sugerencia ante Boxex, y consulta resoluciones e indicadores regulatorios.",
};

export default function PqrPage() {
  return (
    <>
      <PageIntro
        kicker="PQRs"
        title="Queremos conocer tu caso."
        description="Radica tu petición, queja, reclamo o sugerencia. Ten a mano la guía y los datos del envío para facilitar la atención."
        image="/heroes/pqr.webp"
      />
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <PqrForm />
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <DocumentCategoryList
          categories={[
            { title: "Resoluciones e Indicadores", documents: resolucionesDocuments },
          ]}
        />
      </section>
    </>
  );
}
