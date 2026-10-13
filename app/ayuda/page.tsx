import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { ContactForm } from "@/components/ayuda/contact-form"
import { allFaqs } from "@/lib/pages-data"
import { CONTACT_EMAIL, phoneChannels } from "@/lib/contact-data"

export const metadata: Metadata = {
  title: "Ayuda y contacto: escríbenos, llámanos o resuelve tus dudas | Boxex",
  description:
    "Formulario de contacto, teléfonos y WhatsApp de Boxex en Estados Unidos, Colombia y Guatemala, y respuestas a las preguntas frecuentes sobre casillero, destinos, costos, rastreo y recogidas.",
}

const regionStyles: Record<string, string> = {
  "Estados Unidos": "bg-brand-blue text-white",
  Colombia: "bg-brand-gold text-brand-blue",
  Guatemala: "bg-[#04102e] text-white",
}

export default function AyudaPage() {
  return (
    <>
      <PageIntro
        kicker="Ayuda y contacto"
        title="Pregunta lo que quieras. Te respondemos."
        description="Escríbenos, llámanos o encuentra la respuesta al instante en las preguntas frecuentes."
        image="/heroes/ayuda.webp"
        actions={[
          { label: "Escribir a Boxex", href: "#contacto" },
          { label: "Ver preguntas frecuentes", href: "#preguntas" },
        ]}
        highlights={["Formulario por tema", "Líneas en 3 países", "WhatsApp directo"]}
        flush
      />

      {/* Teléfonos y canales */}
      <section aria-labelledby="canales-titulo" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Canales de atención
          </span>
          <h2
            id="canales-titulo"
            className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]"
          >
            Elige cómo quieres hablar con nosotros.
          </h2>
          <p className="text-[15px] leading-[1.75] text-brand-blue/70">
            Llama o escribe a la línea que corresponda a tu consulta. Si no
            estás seguro de cuál, usa el formulario y lo dirigimos por ti.
          </p>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {phoneChannels.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 70}>
              <li className="flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_40px_rgba(1,22,137,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(1,22,137,0.12)]">
                <span
                  className={`mb-4 w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${regionStyles[c.region]}`}
                >
                  {c.region}
                </span>
                <h3 className="mb-1 text-lg font-semibold text-brand-blue">{c.title}</h3>
                <p className="mb-5 text-sm leading-[1.6] text-brand-blue/65">{c.detail}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {c.tel && (
                    <a
                      href={`tel:${c.tel}`}
                      className="inline-flex items-center gap-2 rounded-full border border-brand-line px-4 py-2 text-[13px] font-semibold text-brand-blue transition-colors hover:border-brand-blue hover:bg-brand-pale"
                    >
                      <Phone className="size-3.5" />
                      {c.telLabel}
                    </a>
                  )}
                  {c.whatsapp && (
                    <a
                      href={`https://wa.me/${c.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1fb45b] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="size-3.5" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Reveal>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-brand-line bg-brand-pale/60 p-6 transition-colors hover:bg-brand-pale"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-brand-blue">
                <Mail className="size-6" />
              </span>
              <span>
                <small className="block text-xs text-brand-blue/55">Correo electrónico</small>
                <strong className="text-brand-blue underline-offset-2 group-hover:underline">
                  {CONTACT_EMAIL}
                </strong>
              </span>
            </a>
          </Reveal>
          <Reveal delay={70}>
            <Link
              href="/oficinas"
              className="group flex items-center gap-4 rounded-2xl border border-brand-line bg-brand-pale/60 p-6 transition-colors hover:bg-brand-pale"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-brand-blue">
                <MapPin className="size-6" />
              </span>
              <span>
                <small className="block text-xs text-brand-blue/55">Teléfonos de cada oficina</small>
                <strong className="text-brand-blue underline-offset-2 group-hover:underline">
                  Ver las 14 oficinas en el mapa
                </strong>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Formulario dinámico */}
      <section id="contacto" aria-labelledby="contacto-titulo" className="scroll-mt-28 bg-[#04102e]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal className="mb-12 max-w-2xl text-white">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Escríbenos
            </span>
            <h2
              id="contacto-titulo"
              className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[46px]"
            >
              Cuéntanos qué necesitas.
            </h2>
            <p className="text-[15px] leading-[1.75] text-white/70">
              Elige el tema y el formulario se adapta: te pide solo lo
              necesario y te muestra el canal más rápido para ese caso.
            </p>
          </Reveal>
          <Suspense fallback={<div className="h-96 rounded-3xl bg-white/5" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" aria-labelledby="faq-titulo" className="mx-auto max-w-4xl scroll-mt-28 px-6 py-20 lg:py-28">
        <Reveal className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Preguntas frecuentes
          </span>
          <h2
            id="faq-titulo"
            className="mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]"
          >
            En cada paso, una respuesta.
          </h2>
        </Reveal>
        <div className="flex flex-col divide-y divide-brand-line border-y border-brand-line">
          {allFaqs.map((item) => (
            <details key={item.q} className="group cursor-pointer py-[23px]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] font-semibold leading-[1.5] text-brand-blue marker:content-none">
                {item.q}
                <span className="shrink-0 text-[23px] font-normal text-brand-gold transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 pr-8 text-[15px] leading-[1.7] text-brand-blue/70">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/condiciones">Condiciones y restricciones</Link>
          </Button>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/pqr">PQRs</Link>
          </Button>
          <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
            <a href="#contacto">¿No encontraste tu respuesta? Escríbenos</a>
          </Button>
        </div>
      </section>
    </>
  )
}
