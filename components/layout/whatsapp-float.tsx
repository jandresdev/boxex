import { WHATSAPP_URL } from "@/lib/home-data"

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con Boxex por WhatsApp"
      className="fixed bottom-5 right-6 z-40 flex min-h-[45px] cursor-pointer items-center gap-5 rounded-full border border-brand-line bg-white px-[18px] py-[13px] text-xs text-brand-blue shadow-[0_5px_25px_rgba(1,22,137,0.09)] transition-transform hover:-translate-y-0.5"
    >
      ¿Te ayudamos? <span className="text-lg">↗</span>
    </a>
  )
}
