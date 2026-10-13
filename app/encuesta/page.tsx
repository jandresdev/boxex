import type { Metadata } from "next"
import { Clock, HeartHandshake, ShieldCheck } from "lucide-react"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { Survey } from "@/components/encuesta/survey"

export const metadata: Metadata = {
  title: "Encuesta de satisfacción: cuéntanos tu experiencia | Boxex",
  description:
    "Tu opinión es muy importante para nosotros. Responde la encuesta de satisfacción de Boxex en menos de dos minutos.",
}

const perks = [
  { icon: Clock, title: "Menos de 2 minutos", text: "8 preguntas cortas, una a la vez." },
  { icon: HeartHandshake, title: "Tu voz cuenta", text: "Usamos tus respuestas para mejorar cada envío." },
  { icon: ShieldCheck, title: "Tus datos, protegidos", text: "El contacto con un asesor es opcional." },
] as const

export default function EncuestaPage() {
  return (
    <>
      <PageIntro
        kicker="Encuesta de satisfacción"
        title="Cuéntanos cómo fue tu experiencia."
        description="Su opinión es muy importante para nosotros: gracias por tomarse el tiempo para diligenciar esta encuesta."
        image="/heroes/encuesta.webp"
        actions={[{ label: "Empezar la encuesta", href: "#encuesta" }]}
        highlights={["Menos de 2 minutos", "Una pregunta a la vez", "Contacto opcional"]}
        flush
      />

      <section id="encuesta" className="scroll-mt-28 bg-[#04102e]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:py-28">
          <Reveal className="text-white lg:sticky lg:top-40 lg:self-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Tu opinión nos ayuda</span>
            <h2 className="mb-4 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[44px]">
              Tu opinión nos ayuda a mejorar.
            </h2>
            <p className="mb-8 text-[15px] leading-[1.75] text-white/70">
              Cuéntanos cómo fue tu experiencia con nuestros servicios de envíos y recogidas desde Estados Unidos hacia Latinoamérica.
            </p>
            <ul className="grid gap-5">
              {perks.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-gold">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <strong className="block text-[15px]">{title}</strong>
                    <span className="text-[13px] text-white/65">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Survey />
        </div>
      </section>
    </>
  )
}
