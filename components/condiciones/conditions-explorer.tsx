"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ChevronDown, FileDown, Search, X } from "lucide-react"
import { conditionCategories, type ConditionCategory, type ConditionItem } from "@/lib/condiciones-data"

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

function itemText(item: ConditionItem) {
  return norm([item.title, ...(item.paragraphs ?? []), ...(item.lists ?? []).flat(), item.note ?? ""].join(" "))
}

function Item({ item, open, onToggle }: { item: ConditionItem; open: boolean; onToggle: () => void }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-[0_15px_40px_rgba(1,22,137,0.05)] transition-shadow hover:shadow-[0_20px_50px_rgba(1,22,137,0.1)]">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`cond-${item.id}`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left sm:p-6"
        >
          <span className="text-[16px] font-semibold leading-snug text-brand-blue sm:text-[18px]">{item.title}</span>
          <ChevronDown className={`size-5 shrink-0 text-brand-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </h3>
      <div
        id={`cond-${item.id}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-4 px-5 pb-6 sm:px-6" inert={!open}>
            {item.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)} className="text-[15px] leading-[1.75] text-brand-blue/75">
                {p}
              </p>
            ))}
            {item.lists?.map((list, i) => (
              <ul key={i} className="grid gap-2.5">
                {list.map((li) => (
                  <li key={li.slice(0, 50)} className="flex gap-3 text-[15px] leading-[1.7] text-brand-blue/80">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand-gold" />
                    {li}
                  </li>
                ))}
              </ul>
            ))}
            {item.note && (
              <p className="rounded-xl border border-brand-gold/40 bg-brand-soft-gold p-4 text-[13px] leading-[1.65] text-brand-blue/85">{item.note}</p>
            )}
            {(item.docs || item.link) && (
              <div className="flex flex-wrap gap-3">
                {item.docs?.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-blue/90"
                  >
                    <FileDown className="size-4" />
                    {d.label}
                  </a>
                ))}
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="inline-flex items-center rounded-full border border-brand-line px-4 py-2 text-[13px] font-semibold text-brand-blue hover:bg-brand-pale"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Searchable, categorised conditions. Items are accordions (animated with a
 * grid-rows transition, honouring reduced motion); searching expands every
 * match. A sticky index tracks the category in view (IntersectionObserver).
 */
export function ConditionsExplorer() {
  const [query, setQuery] = useState("")
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(["condiciones-courier"]))
  const [active, setActive] = useState(conditionCategories[0].id)

  const q = norm(query.trim())
  const categories: ConditionCategory[] = useMemo(() => {
    if (!q) return conditionCategories
    return conditionCategories
      .map((c) => ({ ...c, items: c.items.filter((i) => itemText(i).includes(q)) }))
      .filter((c) => c.items.length > 0)
  }, [q])
  const total = categories.reduce((n, c) => n + c.items.length, 0)

  useEffect(() => {
    const sections = conditionCategories
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => !!el)
    if (sections.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id.replace("cat-", ""))
      },
      { rootMargin: "-160px 0px -60% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [categories])

  const isOpen = (id: string) => (q ? true : openIds.has(id))
  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const allIds = conditionCategories.flatMap((c) => c.items.map((i) => i.id))
  const allOpen = allIds.every((id) => openIds.has(id))

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
      <aside className="min-w-0 lg:sticky lg:top-36 lg:self-start">
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-blue/45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar: seguro, peso, impuestos…"
            aria-label="Buscar en las condiciones"
            className="w-full rounded-full border border-brand-line bg-white py-3 pl-10 pr-10 text-sm text-brand-blue placeholder:text-brand-blue/40 focus:border-brand-blue focus:outline-none"
          />
          {query && (
            <button
              type="button"
              aria-label="Borrar búsqueda"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-brand-blue/50 hover:bg-brand-pale"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <nav aria-label="Categorías" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {conditionCategories.map((c) => {
            const on = active === c.id
            return (
              <a
                key={c.id}
                href={`#cat-${c.id}`}
                aria-current={on ? "true" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors lg:rounded-xl lg:py-2.5 ${
                  on ? "bg-brand-blue text-white" : "bg-brand-pale text-brand-blue/75 hover:bg-brand-soft-gold"
                }`}
              >
                {c.title}
              </a>
            )
          })}
        </nav>
        {!q && (
          <button
            type="button"
            onClick={() => setOpenIds(allOpen ? new Set() : new Set(allIds))}
            className="mt-4 hidden cursor-pointer text-[13px] font-semibold text-brand-blue underline underline-offset-2 lg:block"
          >
            {allOpen ? "Contraer todo" : "Expandir todo"}
          </button>
        )}
      </aside>

      <div className="grid gap-14">
        {q && (
          <p role="status" className="text-sm text-brand-blue/70">
            {total === 0 ? "No encontramos coincidencias. Prueba con otra palabra o escríbenos desde Ayuda y contacto." : `${total} resultado${total === 1 ? "" : "s"} para “${query}”.`}
          </p>
        )}
        {categories.map((c) => (
          <section key={c.id} id={`cat-${c.id}`} aria-labelledby={`h-${c.id}`} className="scroll-mt-40">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">{c.summary}</span>
            <h2 id={`h-${c.id}`} className="mb-6 mt-2 text-[28px] font-bold leading-[1.1] tracking-[-0.04em] text-brand-blue lg:text-[36px]">
              {c.title}
            </h2>
            <div className="grid gap-3">
              {c.items.map((item) => (
                <Item key={item.id} item={item} open={isOpen(item.id)} onToggle={() => toggle(item.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
