import type { Metadata } from "next"
import { Handshake, Mail, MessageCircle, Phone, SearchCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { FinalCtaSection } from "@/components/home/final-cta"
import { AgentForm } from "@/components/aliados/agent-form"
import { agentSteps } from "@/lib/aliados-data"
import { CONTACT_EMAIL, phoneChannels } from "@/lib/contact-data"

export const metadata: Metadata = {
  title: "Hágase nuestro agente: red de aliados autorizados | Boxex",
  description:
    "Diligencia el formulario para formalizar tu solicitud de aliarte a la red de Agentes Autorizados de Boxex.",
}

const stepIcons = [Handshake, SearchCheck, Phone] as const
const usa = phoneChannels.find((c) => c.id === "usa")
const whatsapp = phoneChannels.find((c) => c.id === "co-whatsapp")

export default function AliadosPage() {
  return (
    <>
      <PageIntro
        kicker="Aliados"
        title="Hágase nuestro agente."
        description="Diligencie este formulario para formalizar su solicitud de aliarse a nuestra red de Agentes Autorizados de Boxex."
        image="/heroes/aliados.webp"
        actions={[{ label: "Diligenciar solicitud", href: "#formulario" }]}
        highlights={["Red de agentes autorizados", "Evaluación por el equipo", "Respuesta de un asesor"]}
        flush
      />

      {/* Proceso */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Así funciona la vinculación
          </span>
          <h2 className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]">
            Tres pasos para unirte a la red.
          </h2>
          <p className="text-[15px] leading-[1.75] text-brand-blue/70">
            La solicitud es el primer paso: el equipo de Boxex te explica las
            condiciones de vinculación una vez revise tu información.
          </p>
        </Reveal>
        <ol className="grid gap-5 md:grid-cols-3">
          {agentSteps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <Reveal key={step.title} delay={i * 80}>
                <li className="group h-full rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_40px_rgba(1,22,137,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(1,22,137,0.12)]">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-brand-soft-gold text-brand-blue">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-[44px] font-bold leading-none tracking-[-0.05em] text-brand-blue/10">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-brand-blue">{step.title}</h3>
                  <p className="text-sm leading-[1.7] text-brand-blue/70">{step.text}</p>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </section>

      {/* Formulario */}
      <section id="formulario" className="scroll-mt-28 bg-[#04102e]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
          <Reveal className="text-white lg:sticky lg:top-40 lg:self-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Solicitud de agente
            </span>
            <h2 className="mb-4 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[44px]">
              Cuéntanos de tu empresa y te contactamos.
            </h2>
            <p className="mb-8 text-[15px] leading-[1.75] text-white/70">
              Todos los campos son obligatorios, salvo el FAX. Necesitamos una
              referencia comercial para evaluar tu solicitud.
            </p>
            <div className="grid gap-3">
              {whatsapp?.whatsapp && (
                <Button asChild variant="outline" className="w-fit cursor-pointer border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <a href={`https://wa.me/${whatsapp.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle />
                    WhatsApp: {whatsapp.telLabel}
                  </a>
                </Button>
              )}
              {usa?.tel && (
                <Button asChild variant="outline" className="w-fit cursor-pointer border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <a href={`tel:${usa.tel}`}>
                    <Phone />
                    Llama al {usa.telLabel}
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" className="w-fit cursor-pointer border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail />
                  {CONTACT_EMAIL}
                </a>
              </Button>
            </div>
          </Reveal>
          <AgentForm />
        </div>
      </section>

      <FinalCtaSection />
    </>
  )
}
