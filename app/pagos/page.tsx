import type { Metadata } from "next"
import Image from "next/image"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/layout/page-intro"
import { Reveal } from "@/components/home/reveal"
import { FinalCtaSection } from "@/components/home/final-cta"
import { PaymentMethods } from "@/components/pagos/payment-methods"
import { CONTACT_EMAIL, phoneChannels } from "@/lib/contact-data"
import { colombiaMethods, PAY_PBX_CO } from "@/lib/pagos-data"

export const metadata: Metadata = {
  title: "Pagos: paga tu orden con PayPal o tarjeta | Boxex",
  description:
    "Paga tu orden de Boxex con PayPal (Colombia y Estados Unidos) o con tarjeta (Estados Unidos). Formularios oficiales, pasos claros y atención si tienes algún inconveniente.",
}

const usa = phoneChannels.find((c) => c.id === "usa")
const co = phoneChannels.find((c) => c.id === "co-whatsapp")

export default function PagosPage() {
  return (
    <>
      <PageIntro
        kicker="Pagos"
        title="Paga tu orden. Rápido y seguro."
        description="Ten a mano el número de orden asignado a tu envío y elige el medio de pago que corresponde a tu país."
        image="/heroes/pagos.webp"
        actions={[
          { label: "Pagar mi orden", href: "#pagar" },
          { label: "Necesito ayuda", href: "#ayuda" },
        ]}
        highlights={["PayPal y tarjeta", "Formularios oficiales", "Servicio prepago"]}
        flush
      />

      {/* Formularios */}
      <section id="pagar" className="scroll-mt-28 bg-[#04102e]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal className="mb-10 max-w-2xl text-white">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Formas de pago</span>
            <h2 className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[46px]">
              Elige cómo quieres pagar.
            </h2>
            <p className="text-[15px] leading-[1.75] text-white/70">
              Digita el número de orden que se te asignó y sigue los pasos. Estos son los mismos formularios oficiales de Boxex.
            </p>
          </Reveal>
          <PaymentMethods />
        </div>
      </section>

      {/* Colombia */}
      <section aria-labelledby="co-titulo" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal className="mb-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Pagos en Colombia</span>
          <h2 id="co-titulo" className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]">
            También puedes pagar con estos medios.
          </h2>
          <p className="text-[15px] leading-[1.75] text-brand-blue/70">
            Consulta con el equipo cómo pagar tu orden por estos medios en Colombia.
          </p>
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-3">
          {colombiaMethods.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <li className="flex h-40 items-center justify-center rounded-2xl border border-brand-line bg-white p-6 shadow-[0_15px_40px_rgba(1,22,137,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(1,22,137,0.12)]">
                <Image src={m.logo} alt={m.name} width={m.width} height={m.height} className="max-h-24 w-auto max-w-[80%] object-contain" />
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Ayuda */}
      <section id="ayuda" className="scroll-mt-28 bg-brand-pale/60">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal className="mb-10 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">¿Algún inconveniente?</span>
            <h2 className="mb-3 mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-brand-blue lg:text-[46px]">
              Tu satisfacción es nuestro objetivo.
            </h2>
            <p className="text-[15px] leading-[1.75] text-brand-blue/70">
              Si tienes algún inconveniente con una transacción, infórmanos y trabajaremos contigo para resolverlo. Ten a mano tu número de orden y tu comprobante.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {usa?.tel && (
              <Button asChild className="cursor-pointer bg-brand-blue text-white hover:bg-brand-blue/90">
                <a href={`tel:${usa.tel}`}>
                  <Phone />
                  Línea gratuita EE. UU. {usa.telLabel}
                </a>
              </Button>
            )}
            <Button asChild variant="outline" className="cursor-pointer">
              <a href={`tel:${PAY_PBX_CO.tel}`}>
                <Phone />
                PBX Colombia {PAY_PBX_CO.label}
              </a>
            </Button>
            {co?.whatsapp && (
              <Button asChild className="cursor-pointer bg-[#1fb45b] text-white hover:bg-[#1fb45b]/90">
                <a href={`https://wa.me/${co.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  WhatsApp {co.telLabel}
                </a>
              </Button>
            )}
            <Button asChild variant="outline" className="cursor-pointer">
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Mail />
                {CONTACT_EMAIL}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  )
}
