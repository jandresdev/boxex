"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Download, ExternalLink, Eye, FileText, Search, X } from "lucide-react"
import { legalCategoryMeta, type LegalCategoryId, type LegalDocument } from "@/lib/legal-documents"

type Doc = LegalDocument & { size: string }

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

/**
 * Filterable legal documents. Search + category chips filter in place; each
 * card can open a PDF preview (native <dialog>, desktop) or the file in a new
 * tab. Sizes are computed on the server so people know what they download.
 */
export function LegalCenter({ docs }: { docs: Doc[] }) {
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState<LegalCategoryId | "all">("all")
  const [preview, setPreview] = useState<Doc | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const q = norm(query.trim())
  const visible = useMemo(
    () =>
      docs.filter(
        (d) =>
          (cat === "all" || d.category === cat) &&
          (!q || norm(`${d.title} ${d.description} ${d.meta} ${d.keywords ?? ""}`).includes(q)),
      ),
    [docs, cat, q],
  )

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (preview && !el.open) el.showModal()
    if (!preview && el.open) el.close()
  }, [preview])

  const counts = (id: LegalCategoryId | "all") => (id === "all" ? docs.length : docs.filter((d) => d.category === id).length)

  return (
    <div>
      <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-blue/45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar un documento: datos personales, contrato, SAGRILAFT…"
            aria-label="Buscar documentos legales"
            className="w-full rounded-full border border-brand-line bg-white py-3.5 pl-11 pr-11 text-[15px] text-brand-blue placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"
          />
          {query && (
            <button
              type="button"
              aria-label="Borrar búsqueda"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-brand-blue/50 hover:bg-brand-pale"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div role="group" aria-label="Filtrar por categoría" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
          {[{ id: "all" as const, title: "Todos" }, ...legalCategoryMeta].map((c) => {
            const on = cat === c.id
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c.id)}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                  on ? "bg-brand-blue text-white" : "bg-brand-pale text-brand-blue/75 hover:bg-brand-soft-gold"
                }`}
              >
                {c.title} <span className={on ? "text-white/70" : "text-brand-blue/45"}>{counts(c.id)}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p role="status" className="mb-6 text-sm text-brand-blue/65">
        {visible.length === 0
          ? "No encontramos documentos con esa búsqueda."
          : `${visible.length} documento${visible.length === 1 ? "" : "s"}${q ? ` para “${query}”` : ""}.`}
      </p>

      <ul className="grid gap-5 md:grid-cols-2">
        {visible.map((d) => {
          const category = legalCategoryMeta.find((c) => c.id === d.category)
          return (
            <li
              key={d.id}
              className="group flex flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_40px_rgba(1,22,137,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(1,22,137,0.12)]"
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft-gold text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <FileText className="size-6" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-gold">{category?.title}</span>
                  <h3 className="mt-1 text-[17px] font-semibold leading-snug text-brand-blue">{d.title}</h3>
                </div>
              </div>
              <p className="mb-3 text-sm leading-[1.7] text-brand-blue/70">{d.description}</p>
              <p className="mb-5 text-[12px] text-brand-blue/50">
                {d.meta} · PDF · {d.size}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPreview(d)}
                  className="hidden cursor-pointer items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-blue/90 md:inline-flex"
                >
                  <Eye className="size-4" />
                  Vista previa
                </button>
                <a
                  href={d.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-blue/90 md:hidden"
                >
                  <ExternalLink className="size-4" />
                  Abrir
                </a>
                <a
                  href={d.file}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-brand-line px-4 py-2 text-[13px] font-semibold text-brand-blue hover:bg-brand-pale"
                >
                  <Download className="size-4" />
                  Descargar
                </a>
              </div>
            </li>
          )
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setPreview(null)}
        aria-label={preview ? `Vista previa: ${preview.title}` : "Vista previa"}
        className="m-auto h-[88vh] w-[min(1000px,94vw)] overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop:bg-[#04102e]/70 backdrop:backdrop-blur-sm"
      >
        {preview && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-brand-line px-5 py-3">
              <strong className="truncate text-sm text-brand-blue">{preview.title}</strong>
              <div className="flex shrink-0 items-center gap-2">
                <a href={preview.file} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 text-[13px] font-semibold text-brand-blue underline sm:inline-flex">
                  Abrir en pestaña nueva <ExternalLink className="size-3.5" />
                </a>
                <button
                  type="button"
                  aria-label="Cerrar vista previa"
                  onClick={() => setPreview(null)}
                  className="grid size-9 cursor-pointer place-items-center rounded-full bg-brand-pale text-brand-blue hover:bg-brand-soft-gold"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>
            <iframe src={`${preview.file}#view=FitH`} title={preview.title} className="w-full flex-1 border-0" />
          </div>
        )}
      </dialog>
    </div>
  )
}
