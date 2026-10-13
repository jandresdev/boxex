/**
 * Canales de contacto de BOXEX.
 *
 * Fuente: encabezado y páginas "Contáctenos" y "Servicios" de
 * boxexpress.com, y los textos de las landings de casillero y recogidas
 * (consultado el 2026-10-13). Los teléfonos de cada oficina viven en
 * lib/pages-data.ts. No se publican horarios porque la web oficial no los
 * indica.
 */

export const CONTACT_EMAIL = "info@boxexpress.com"

/** Destino del formulario de contacto (mismo servicio que usa el de recogidas). */
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

export type PhoneChannel = {
  id: string
  region: "Estados Unidos" | "Colombia" | "Guatemala"
  title: string
  detail: string
  /** E.164; se usa en enlaces tel: */
  tel?: string
  telLabel?: string
  /** Solo dígitos; se usa en enlaces wa.me */
  whatsapp?: string
  whatsappLabel?: string
}

export const phoneChannels: PhoneChannel[] = [
  {
    id: "usa",
    region: "Estados Unidos",
    title: "Línea gratuita en EE. UU.",
    detail: "Atención general y recogidas.",
    tel: "+18772698646",
    telLabel: "1 877 269 8646",
  },
  {
    id: "co-whatsapp",
    region: "Colombia",
    title: "WhatsApp Colombia",
    detail: "Consultas generales sobre envíos y servicios.",
    tel: "+573176410982",
    telLabel: "+57 317 641 0982",
    whatsapp: "573176410982",
    whatsappLabel: "Escribir por WhatsApp",
  },
  {
    id: "co-nacional",
    region: "Colombia",
    title: "Línea nacional Colombia",
    detail: "Llamada sin costo desde Colombia.",
    tel: "018000914043",
    telLabel: "01 8000 914 043",
  },
  {
    id: "casillero",
    region: "Colombia",
    title: "WhatsApp casillero virtual",
    detail: "Registro, IDBOX y compras en Estados Unidos.",
    tel: "+573186609888",
    telLabel: "+57 318 660 9888",
    whatsapp: "573186609888",
    whatsappLabel: "Escribir por WhatsApp",
  },
  {
    id: "recogidas",
    region: "Estados Unidos",
    title: "WhatsApp recogidas",
    detail: "Recogida en casa en EE. UU.",
    tel: "+19292154027",
    telLabel: "+1 929 215 4027",
    whatsapp: "19292154027",
    whatsappLabel: "Escribir por WhatsApp",
  },
  {
    id: "guatemala",
    region: "Guatemala",
    title: "Oficina Guatemala",
    detail: "Atención en Ciudad de Guatemala.",
    tel: "+50266707500",
    telLabel: "+502 6670 7500",
  },
]

export type TopicId =
  | "cotizar"
  | "casillero"
  | "rastreo"
  | "pagos"
  | "recogida"
  | "comercio"
  | "oficinas"
  | "reclamo"
  | "otro"

export type TopicField = {
  name: string
  label: string
  placeholder?: string
  type?: "text" | "select"
  options?: string[]
  required?: boolean
  maxLength?: number
}

export type Topic = {
  id: TopicId
  label: string
  /** Frase corta que ve el cliente en la tarjeta. */
  hint: string
  /** Campos extra que aparecen al elegir el tema. */
  fields: TopicField[]
  /** Canal recomendado y mensaje de respaldo por WhatsApp. */
  whatsapp: string
  /** Palabras que buscan preguntas frecuentes relacionadas. */
  faqKeywords: string[]
  /** Si el tema se atiende mejor en otra página, se ofrece en lugar del formulario. */
  redirect?: { href: string; label: string; text: string }
}

export const topics: Topic[] = [
  {
    id: "cotizar",
    label: "Cotizar un envío",
    hint: "Precio y tiempos para tu paquete",
    whatsapp: "573176410982",
    faqKeywords: ["costo", "cuánto", "cotiz"],
    fields: [
      { name: "Destino", label: "País de destino", placeholder: "Ej: Colombia", required: true, maxLength: 60 },
      { name: "Ciudad de origen", label: "Ciudad de origen en EE. UU.", placeholder: "Ej: Miami, FL", maxLength: 60 },
      { name: "Contenido", label: "¿Qué vas a enviar?", placeholder: "Ej: ropa, medicamentos, electrónicos", required: true, maxLength: 120 },
      { name: "Peso aproximado", label: "Peso aproximado", placeholder: "Ej: 40 lb", maxLength: 30 },
    ],
  },
  {
    id: "casillero",
    label: "Casillero virtual",
    hint: "Registro, IDBOX y compras en USA",
    whatsapp: "573186609888",
    faqKeywords: ["casillero", "idbox", "compr"],
    fields: [
      {
        name: "¿Ya tienes casillero?",
        label: "¿Ya tienes casillero?",
        type: "select",
        options: ["Aún no, quiero crearlo", "Sí, ya tengo casillero"],
        required: true,
      },
      { name: "IDBOX", label: "Tu IDBOX (si lo tienes)", placeholder: "Ej: BX123456", maxLength: 30 },
    ],
  },
  {
    id: "rastreo",
    label: "Estado de mi envío",
    hint: "Dónde está mi paquete",
    whatsapp: "573176410982",
    faqKeywords: ["rastre", "guía", "paquete"],
    fields: [
      { name: "Número de guía", label: "Número de guía Boxex", placeholder: "Ej: la que recibiste de Boxex", required: true, maxLength: 40 },
      { name: "Tienda o tracking", label: "Tracking de la tienda (opcional)", placeholder: "Si compraste online", maxLength: 60 },
    ],
  },
  {
    id: "pagos",
    label: "Pagos",
    hint: "Pagar una orden o reajuste",
    whatsapp: "573176410982",
    faqKeywords: ["pago", "pagar", "orden"],
    fields: [
      { name: "Número de orden o guía", label: "Número de orden o guía", placeholder: "Ej: orden asignada a tu envío", required: true, maxLength: 40 },
      {
        name: "Medio de pago",
        label: "Medio de pago",
        type: "select",
        options: ["PSE", "PayPal", "Zelle", "Otro / no estoy seguro"],
      },
    ],
  },
  {
    id: "recogida",
    label: "Recogida en casa",
    hint: "Que recojan mi paquete",
    whatsapp: "19292154027",
    faqKeywords: ["recog"],
    fields: [],
    redirect: {
      href: "/recogida-en-casa#formulario",
      label: "Solicitar mi recogida",
      text: "Las recogidas tienen su propio formulario: pide cobertura, destino y datos de la caja para que un asesor te confirme la ruta.",
    },
  },
  {
    id: "comercio",
    label: "Exportar o importar",
    hint: "Mercancía para tu negocio",
    whatsapp: "573176410982",
    faqKeywords: ["export", "import", "mercanc"],
    fields: [
      {
        name: "Tipo de operación",
        label: "¿Qué necesitas?",
        type: "select",
        options: ["Exportar desde Colombia", "Importar desde Estados Unidos", "No estoy seguro"],
        required: true,
      },
      { name: "Producto", label: "Producto o mercancía", placeholder: "Ej: café, textiles, repuestos", required: true, maxLength: 120 },
      { name: "País de origen o destino", label: "País de origen o destino", placeholder: "Ej: Estados Unidos", maxLength: 60 },
    ],
  },
  {
    id: "oficinas",
    label: "Oficinas o ser aliado",
    hint: "Sedes, agentes y alianzas",
    whatsapp: "573176410982",
    faqKeywords: ["oficina", "aliad", "agente"],
    fields: [
      { name: "Ciudad de interés", label: "Ciudad de interés", placeholder: "Ej: Houston, Cali, Boston", maxLength: 60 },
      {
        name: "Interés",
        label: "¿Qué te interesa?",
        type: "select",
        options: ["Encontrar una oficina", "Ser agente o aliado de Boxex"],
      },
    ],
  },
  {
    id: "reclamo",
    label: "Queja o reclamo",
    hint: "Radicar una PQR formal",
    whatsapp: "573176410982",
    faqKeywords: ["reclam", "queja"],
    fields: [],
    redirect: {
      href: "/pqr",
      label: "Radicar mi PQR",
      text: "Las peticiones, quejas, reclamos y sugerencias se radican por el formulario oficial de PQRs, para que queden con trazabilidad.",
    },
  },
  {
    id: "otro",
    label: "Otro tema",
    hint: "Cualquier otra pregunta",
    whatsapp: "573176410982",
    faqKeywords: [],
    fields: [],
  },
]

export const contactMethods = ["WhatsApp", "Llamada", "Correo"] as const
