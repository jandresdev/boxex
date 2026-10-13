"use client"

import { useId, useState } from "react"
import { BarChart3, FileDown } from "lucide-react"

/**
 * Acciones de la sección de reclamaciones: descarga de la Resolución CRC 3038
 * de 2011 y botón de indicadores, que por ahora no tiene datos publicados.
 */
export function PqrDocActions({ pdf }: { pdf: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <a
          href={pdf}
          download
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-gold/90"
        >
          <FileDown className="size-4" />
          Descargar PDF · Resolución CRC 3038 de 2011
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          <BarChart3 className="size-4" />
          Indicadores
        </button>
      </div>
      <div
        id={panelId}
        role="region"
        aria-label="Indicadores"
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="rounded-2xl border border-white/20 bg-white/5 p-5 text-[14px] leading-[1.7] text-white/80">
            <strong className="text-white">Aún no hay indicadores publicados.</strong> Esta sección se actualizará cuando Boxex publique la información.
          </p>
        </div>
      </div>
    </div>
  )
}
