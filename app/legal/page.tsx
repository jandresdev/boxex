import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { DocumentCategoryList } from "@/components/legal/document-category-list";
import { legalCategories } from "@/lib/legal-documents";

export const metadata: Metadata = {
  title: "Aspectos legales | Boxex",
  description:
    "Documentación legal, normativa y de cumplimiento de Boxex, organizada por categorías.",
};

export default function LegalPage() {
  return (
    <>
      <PageIntro
        kicker="Aspectos legales"
        title="Información para una relación clara."
        description="Consulta la documentación legal, normativa y de cumplimiento de Boxex, organizada por categorías."
      />
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <DocumentCategoryList categories={legalCategories} />
      </section>
    </>
  );
}
