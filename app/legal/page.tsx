import type { Metadata } from "next"
import { statSync } from "node:fs"
import path from "node:path"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { FinalCtaSection } from "@/components/home/final-cta"
import { LegalCenter } from "@/components/legal/legal-center"
import { legalCategoryMeta, legalDocuments } from "@/lib/legal-documents"

export const metadata: Metadata = {
  title: "Aspectos legales: normas, contrato y políticas | Boxex",
  description:
    "Centro de aspectos legales de Boxex: régimen de servicios postales, contrato, derechos del usuario, tratamiento de datos y manuales de cumplimiento, en PDF.",
}

function fileSize(publicPath: string) {
  try {
    const bytes = statSync(path.join(process.cwd(), "public", publicPath)).size
    return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.round(bytes / 1024)} KB`
  } catch {
    return "PDF"
  }
}

export default function LegalPage() {
  const docs = legalDocuments.map((d) => ({ ...d, size: fileSize(d.file) }))
  return (
    <>
      <PageIntro
        kicker="Aspectos legales"
        title="Información para una relación clara."
        description="Encuentra aquí importante normatividad relacionada con los servicios y operaciones del correo postal en Colombia, y la información importante para nuestros usuarios."
        image="/heroes/legal.webp"
        actions={[
          { label: "Ver documentos", href: "#documentos" },
          { label: "Condiciones y restricciones", href: "/condiciones" },
        ]}
        highlights={[`${docs.length} documentos oficiales`, "Vista previa y descarga", "Búsqueda por tema"]}
        flush
      />

      <section aria-label="Categorías" className="bg-[#04102e]">
        <ul className="mx-auto grid max-w-6xl gap-4 px-6 py-12 md:grid-cols-3">
          {legalCategoryMeta.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <li className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 text-white">
                <strong className="text-[18px]">{c.title}</strong>
                <p className="mt-1.5 text-[14px] leading-[1.6] text-white/65">{c.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="documentos" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 lg:py-28">
        <Reveal className="mb-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Documentos</span>
          <h2 className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]">
            Todo en un solo lugar.
          </h2>
          <p className="text-[15px] leading-[1.75] text-brand-blue/70">
            Busca por tema, previsualiza el PDF sin salir de la página o descárgalo.
          </p>
        </Reveal>
        <LegalCenter docs={docs} />
      </section>

      <FinalCtaSection />
    </>
  )
}
