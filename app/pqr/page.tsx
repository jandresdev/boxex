import type { Metadata } from "next"
import { Gavel, Hourglass, Mail, MessageCircle, PackageX, Phone, Scale } from "lucide-react"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { FinalCtaSection } from "@/components/home/final-cta"
import { PqrForm } from "@/components/pqr/pqr-form"
import { PqrDocActions } from "@/components/pqr/indicators-button"
import { CONTACT_EMAIL } from "@/lib/contact-data"

export const metadata: Metadata = {
  title: "PQRs: radica tu petición, queja o reclamo | Boxex",
  description:
    "Radica tu petición, queja, reclamo o sugerencia ante Boxex y conoce los plazos para reclamaciones e indemnizaciones del servicio postal (Resoluciones CRC 3038 de 2011, 3985 y 3986 de 2012).",
}

const RESOLUCION_PDF = "/documents/pqr/resolucion-crc-3038-2011.pdf"

const plazos = [
  {
    icon: PackageX,
    big: "10 días",
    unit: "calendario · servicios nacionales\n6 meses · servicios internacionales",
    title: "Pérdida, expoliación o avería: el remitente",
    text: "Las solicitudes de indemnización por la pérdida, expoliación o avería deberán ser presentadas por el remitente dentro de los diez (10) días calendario siguientes a la recepción del objeto postal cuando se trate de servicios nacionales y seis (6) meses cuando se trate de servicios internacionales.",
  },
  {
    icon: Hourglass,
    big: "5 días",
    unit: "hábiles siguientes al recibo",
    title: "Expoliación o avería: el destinatario",
    text: "Las solicitudes de indemnización por expoliación o avería deberán ser presentadas por el usuario destinatario, dentro de los cinco (5) días hábiles siguientes al recibo del objeto postal.",
  },
  {
    icon: Gavel,
    big: "15 días",
    unit: "hábiles para responder",
    title: "Respuesta de BoxExpress",
    text: "BoxExpress tendrá 15 días hábiles para dar respuesta después de presentada la reclamación, de conformidad con el Código Contencioso Administrativo y la Resolución 3038 de 2011 de la CRC, modificada por la Resolución CRC 3985 de 2012 y 3986 DE 2011, para las cuales proceden los recursos de reposición y apelación.",
  },
  {
    icon: Scale,
    big: "30 días",
    unit: "hábiles para el pago",
    title: "Pago si la reclamación procede",
    text: "En caso de que la reclamación sea procedente BoxExpress se compromete a realizar el pago en un término no mayor de treinta (30) días hábiles.",
  },
] as const

const vigilados = [
  {
    name: "Ministerio de Telecomunicaciones (MinTIC)",
    lines: [
      "Edificio Murillo Toro, Cra. 8a entre calles 12 y 13, Bogotá, Colombia",
      "Código postal: 111711",
      "Teléfono conmutador: +57 (1) 344 3460",
      "Línea gratuita: 01-800-0914014",
    ],
    site: { label: "www.mintic.gov.co", href: "https://www.mintic.gov.co" },
  },
  {
    name: "Superintendencia de Industria y Comercio (SIC)",
    lines: [
      "Carrera 13 No. 27 – 00, pisos 3, 4, 5 y 10, Bogotá",
      "Código postal: 110311",
      "Teléfono: 018000910165",
    ],
    site: { label: "www.sic.gov.co", href: "https://www.sic.gov.co" },
  },
] as const

export default function PqrPage() {
  return (
    <>
      <PageIntro
        kicker="PQRs"
        title="Queremos conocer tu caso."
        description="Radica tu petición, queja, reclamo o sugerencia. Ten a mano la guía y los datos del envío para facilitar la atención."
        image="/heroes/pqr.webp"
        actions={[
          { label: "Radicar mi caso", href: "#radicar" },
          { label: "Plazos de reclamación", href: "#reclamacion" },
        ]}
        highlights={["Petición, queja, reclamo o sugerencia", "Seguimiento con tu guía", "Normas CRC"]}
        flush
      />

      {/* Radicar */}
      <section id="radicar" className="scroll-mt-28 bg-[#04102e]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
          <Reveal className="text-white lg:sticky lg:top-40 lg:self-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Radica tu PQR</span>
            <h2 className="mb-4 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[44px]">
              Cuéntanos qué pasó y lo resolvemos.
            </h2>
            <p className="mb-8 text-[15px] leading-[1.75] text-white/70">
              Una vez radicada la reclamación podrás hacer seguimiento con el número de reclamo asignado y tu número de guía.
            </p>
            <ul className="grid gap-3 text-[14px]">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <span>
                  <strong className="block text-white">Línea gratuita en EE. UU.</strong>
                  <a href="tel:+18772698646" className="text-white/75 hover:underline">1 877 269 8646</a> ·{" "}
                  <a href="tel:+13059385658" className="text-white/75 hover:underline">305 938 5658</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <span>
                  <strong className="block text-white">Línea gratuita en Colombia</strong>
                  <a href="tel:018000914043" className="text-white/75 hover:underline">01 8000 914 043</a> ·{" "}
                  <a href="tel:+576024867979" className="text-white/75 hover:underline">(2) 486 7979 Ext. 432</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <a href="https://wa.me/573176410982" target="_blank" rel="noopener noreferrer" className="text-white/75 hover:underline">
                  WhatsApp +57 317 641 0982
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/75 hover:underline">{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </Reveal>
          <PqrForm />
        </div>
      </section>

      {/* Reclamación */}
      <section id="reclamacion" aria-labelledby="reclamacion-titulo" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 lg:py-28">
        <Reveal className="mb-12 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Servicio postal · Resolución 3038 del 2011 / Resolución 3985 de 2012 / Resolución 3986 de 2012
          </span>
          <h2 id="reclamacion-titulo" className="mb-3 mt-3 text-[30px] font-bold leading-[1.1] tracking-[-0.04em] text-brand-blue lg:text-[42px]">
            Reclamación y solicitudes de indemnización
          </h2>
          <p className="text-[15px] leading-[1.75] text-brand-blue/70">
            Estos son los plazos que aplican a las reclamaciones por pérdida, expoliación o avería de un objeto postal.
          </p>
        </Reveal>

        <ol className="grid gap-5 md:grid-cols-2">
          {plazos.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80}>
              <li className="group h-full rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_40px_rgba(1,22,137,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(1,22,137,0.12)] sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft-gold text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <p.icon className="size-6" />
                  </span>
                  <div>
                    <strong className="block text-[32px] font-bold leading-none tracking-[-0.04em] text-brand-blue">{p.big}</strong>
                    <span className="mt-1 block whitespace-pre-line text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-gold">{p.unit}</span>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-brand-blue">{p.title}</h3>
                <p className="text-sm leading-[1.75] text-brand-blue/70">{p.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Reveal>
            <p className="h-full rounded-2xl border border-brand-line bg-brand-pale/60 p-6 text-sm leading-[1.75] text-brand-blue/80">
              Una vez radicada la reclamación el cliente podrá realizar seguimiento con el número de reclamo asignado, con su número de guía, comunicándose al departamento de servicio al cliente: línea gratuita en USA 1 877 2698646 / 305 938 5658 – línea gratuita en Colombia 01 8000 914 043 / (2) 4867979 Ext. 432.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="h-full rounded-2xl border border-brand-gold/40 bg-brand-soft-gold p-6 text-sm leading-[1.75] text-brand-blue/85">
              BoxExpress no está obligado a cancelar indemnizaciones por reclamaciones que hayan sido radicadas fuera de los términos establecidos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Documento, indicadores y vigilancia */}
      <section aria-labelledby="vigilado-titulo" className="bg-[#04102e]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <Reveal className="mb-8 max-w-2xl text-white">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Documento e indicadores</span>
            <h2 className="mb-3 mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.04em] lg:text-[38px]">
              Consulta la resolución completa.
            </h2>
            <p className="text-[15px] leading-[1.75] text-white/70">
              Descarga el régimen de protección al usuario postal y revisa los indicadores cuando estén disponibles.
            </p>
          </Reveal>
          <PqrDocActions pdf={RESOLUCION_PDF} />

          <div className="mt-14 border-t border-white/15 pt-10">
            <h3 id="vigilado-titulo" className="mb-6 text-[13px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Vigilado
            </h3>
            <div className="grid gap-5 md:grid-cols-2">
              {vigilados.map((v) => (
                <div key={v.name} className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white">
                  <strong className="mb-3 block text-[17px]">{v.name}</strong>
                  <ul className="mb-4 grid gap-1.5 text-[14px] leading-[1.6] text-white/70">
                    {v.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <a href={v.site.href} target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-brand-gold underline underline-offset-2">
                    {v.site.label} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  )
}
