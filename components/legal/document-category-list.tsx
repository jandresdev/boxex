import { Download, FileText, Clock } from "lucide-react"
import type { LegalCategory } from "@/lib/legal-documents"

export function DocumentCategoryList({
  categories,
}: {
  categories: LegalCategory[]
}) {
  return (
    <div className="flex flex-col gap-12">
      {categories.map((category) => (
        <section key={category.title}>
          <h2 className="mb-5 text-lg font-semibold text-brand-blue">
            {category.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {category.documents.map((doc) => (
              <div
                key={doc.title}
                className="flex flex-col rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-lg"
              >
                <div className="mb-3 flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft-gold text-brand-blue">
                    <FileText className="size-[18px]" />
                  </span>
                  <strong className="text-sm font-semibold leading-snug text-brand-blue">
                    {doc.title}
                  </strong>
                </div>
                {doc.description && (
                  <p className="mb-3 text-xs leading-[1.6] text-brand-blue/70">
                    {doc.description}
                  </p>
                )}
                {doc.meta && (
                  <p className="mb-4 text-[11px] text-brand-blue/50">
                    {doc.meta}
                  </p>
                )}
                {doc.file ? (
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-brand-blue underline underline-offset-2"
                  >
                    <Download className="size-3.5" />
                    Ver documento (PDF)
                  </a>
                ) : (
                  <span className="mt-auto flex items-center gap-1.5 text-xs font-medium text-brand-blue/40">
                    <Clock className="size-3.5" />
                    Próximamente
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
