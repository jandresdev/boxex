import { CASILLERO_REGISTER_URL, CASILLERO_WHATSAPP_URL } from "@/lib/home-data"

/**
 * Slides del carrusel del home.
 *
 * - "brand": video o imagen detrás del titular fijo del hero (hero.tsx).
 * - "promo": banner publicitario ya terminado (trae su propio texto).
 * - "campaign": escena de campaña con su propio titular, tarifas y botones
 *   como texto real (editable, indexable, accesible).
 *
 * `until` (YYYY-MM-DD, inclusivo) oculta la diapositiva automáticamente
 * después de esa fecha, sin tener que volver a publicar.
 */
export type BrandSlide = {
  id: string
  kind: "brand"
  type: "image" | "video"
  src: string
  poster?: string
  duration: number
}

export type PromoSlide = {
  id: string
  kind: "promo"
  src: string
  alt: string
  href: string
  label: string
  duration: number
  until?: string
}

export type CampaignAction = { label: string; href: string }

export type CampaignSlide = {
  id: string
  kind: "campaign"
  src: string
  /** Descripción de la escena para lectores de pantalla. */
  alt: string
  /** Ajuste de la imagen en pantallas angostas (mantiene al muñeco visible). */
  objectPosition?: string
  duration: number
  until?: string
  kicker: string
  title: string
  /** Última parte del titular, resaltada en dorado. */
  accent: string
  description?: string
  steps?: { title: string; text: string }[]
  rates?: {
    lead: string
    rows: { origin: string; price: string }[]
    /** Destino de la tarifa; se muestra con la bandera de Colombia. */
    footnote: string
    /** Sello corto junto al destino. */
    badge?: string
    legal: string
  }
  actions: CampaignAction[]
}

export type HeroSlide = BrandSlide | PromoSlide | CampaignSlide

// Tarifas "La magia de Halloween" publicadas en boxexpress.com (paquetería
// aérea hacia Colombia). Confirmar vigencia con Boxex antes de cada campaña.
const HALLOWEEN_UNTIL = "2026-11-01"
const HALLOWEEN_ACTIONS: CampaignAction[] = [
  { label: "Cotizar mi envío", href: "/cotizar?destino=colombia" },
  { label: "Hablar por WhatsApp", href: CASILLERO_WHATSAPP_URL },
]

const halloweenRates = (
  pounds: number,
  alt: string,
  src: string,
  prices: { nyNjBos: string; miami: string; texas: string },
): CampaignSlide => ({
  id: `halloween-${pounds}`,
  kind: "campaign",
  src,
  alt,
  objectPosition: "85% center",
  duration: 7000,
  until: HALLOWEEN_UNTIL,
  kicker: "La magia de Halloween · Viaja con Boxex",
  title: "Envía tus cajas de",
  accent: `${pounds} libras.`,
  rates: {
    lead: "Desde nuestras oficinas en",
    rows: [
      { origin: "New York · New Jersey · Boston", price: prices.nyNjBos },
      { origin: "Miami", price: prices.miami },
      { origin: "Texas", price: prices.texas },
    ],
    footnote: "Paquetería aérea hacia Colombia",
    badge: "Más seguro",
    legal: "*Aplican cargos y condiciones.",
  },
  actions: HALLOWEEN_ACTIONS,
})

/**
 * Diapositiva de marca (video + titular fijo del hero). No forma parte de la
 * rotación de campaña: solo se muestra cuando ninguna campaña está vigente,
 * para que el home nunca quede sin hero al terminar Halloween.
 */
export const fallbackSlide: BrandSlide = {
  id: "video-personajes-mundo",
  kind: "brand",
  type: "video",
  src: "/assets/hero-video.mp4",
  poster: "/assets/boxex-characters-hero.png",
  duration: 9000,
}

// Para agregar una diapositiva: guarda la imagen en /public/promos y añade
// una entrada aquí. El orden de la lista es el orden del carrusel.
export const heroSlides: HeroSlide[] = [
  {
    id: "halloween-casillero",
    kind: "campaign",
    src: "/promos/halloween-casillero.webp",
    alt: "Boxy vestido de vampiro, Boxyta de bruja y Boxella de calabaza caminan juntos por un sendero mágico de Halloween.",
    objectPosition: "88% center",
    duration: 8000,
    until: HALLOWEEN_UNTIL,
    kicker: "Magia de Halloween · Casillero virtual",
    title: "Este Halloween, tus compras",
    accent: "también llegan.",
    steps: [
      { title: "Compra", text: "en tiendas de USA o de cualquier país" },
      { title: "Envía", text: "a nuestro casillero en Miami" },
      { title: "Recibe", text: "en la puerta de tu casa" },
    ],
    actions: [
      { label: "Abrir el mío", href: CASILLERO_REGISTER_URL },
      { label: "WhatsApp +57 318 660 9888", href: CASILLERO_WHATSAPP_URL },
    ],
  },
  halloweenRates(
    30,
    "Boxella disfrazada de calabaza sostiene su canasta llena de paquetes en un porche de Halloween.",
    "/promos/halloween-30.webp",
    { nyNjBos: "USD 55.20", miami: "USD 52.20", texas: "USD 62.70" },
  ),
  halloweenRates(
    40,
    "Boxyta disfrazada de bruja con su varita mágica frente a una luna llena, mientras un paquete flota.",
    "/promos/halloween-40.webp",
    { nyNjBos: "USD 73.60", miami: "USD 69.60", texas: "USD 83.60" },
  ),
  halloweenRates(
    50,
    "Boxy disfrazado de vampiro señala el camino frente a una casona de Halloween, con paquetes a sus pies.",
    "/promos/halloween-50.webp",
    { nyNjBos: "USD 92.00", miami: "USD 87.00", texas: "USD 104.50" },
  ),
]
