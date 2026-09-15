import { WHATSAPP_URL } from "@/lib/home-data"

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con Boxex por WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-brand-blue px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
    >
      ¿Te ayudamos? <span>↗</span>
    </a>
  )
}
