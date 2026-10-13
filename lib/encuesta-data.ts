/**
 * Encuesta de satisfacción de BOXEX.
 *
 * Preguntas, opciones y reglas condicionales tomadas del formulario oficial
 * (boxexpress.com/encuesta-de-satisfaccion → wp-content/uploads/formclientes.html,
 * consultado el 2026-10-13), que envía las respuestas a mercadeo@boxex.us con
 * FormSubmit.
 */

export const SURVEY_ENDPOINT = "https://formsubmit.co/ajax/mercadeo@boxex.us"

export const serviceOptions = ["Envío de paquete o caja", "Recogida a domicilio", "Casillero virtual", "Otro"] as const

export const originOptions = ["New York", "New Jersey", "Boston", "Miami", "Texas", "San Antonio", "Austin", "Otra ciudad"] as const

export const officesByOrigin: Record<string, string[]> = {
  "New York": ["Jackson Heights", "Woodside"],
  "New Jersey": ["Morris", "Bayway"],
  Texas: ["Houston", "Katy"],
  Miami: ["Aeropuerto", "Oficina central"],
}

export const countryOptions = [
  "Colombia",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Haití",
  "Honduras",
  "México",
  "Nicaragua",
  "Perú",
  "República Dominicana",
  "Venezuela",
] as const

export const sourceOptions = ["Referido", "Facebook", "Instagram", "Página web", "Otro"] as const

export const differenceOptions = [
  "Confianza y seguridad en el proceso",
  "Buenas tarifas",
  "Rapidez y cumplimiento en la entrega",
  "Cobertura de oficinas y puntos de atención",
  "Facilidad para enviar y comunicarse",
  "Acompañamiento durante el envío",
  "Variedad de destinos",
  "Promociones o descuentos",
  "Experiencia previa positiva o recomendación",
  "Otro",
] as const

export const ratingLabels: Record<number, string> = {
  1: "Muy mala",
  2: "Mala",
  3: "Regular",
  4: "Buena",
  5: "Excelente",
}

export type StepId = "service" | "origin" | "country" | "source" | "difference" | "recommend" | "rating" | "contact"

export const steps: { id: StepId; question: string; bubble: string }[] = [
  { id: "service", question: "¿Qué servicio utilizaste con Boxex?", bubble: "¡Hola! Cuéntanos tu experiencia." },
  { id: "origin", question: "¿Desde qué ciudad u oficina realizaste el envío?", bubble: "Vamos muy bien." },
  { id: "country", question: "¿Hacia qué país se realizó el envío?", bubble: "¡Qué lindo destino!" },
  { id: "source", question: "¿Cómo te enteraste de nuestros servicios?", bubble: "Nos encanta saberlo." },
  { id: "difference", question: "¿Qué crees que hace diferente a Boxex frente a otras empresas de envío?", bubble: "Puedes elegir varias." },
  { id: "recommend", question: "¿Recomendarías nuestros servicios a otras personas?", bubble: "Sé sincero, nos ayuda a mejorar." },
  { id: "rating", question: "¿Cómo calificarías tu experiencia general con Boxex?", bubble: "¡Ya casi terminamos!" },
  { id: "contact", question: "¿Deseas ser contactado por uno de nuestros asesores?", bubble: "Último paso, ¡gracias!" },
]

export type Answers = {
  service: string
  otherService: string
  origin: string
  office: string
  otherCity: string
  country: string
  source: string
  otherSource: string
  difference: string[]
  otherDifference: string
  recommend: "" | "Sí" | "No"
  recommendWhy: string
  rating: number
  contact: "" | "Sí" | "No"
  fullName: string
  phone: string
  email: string
  privacy: boolean
}

export const emptyAnswers: Answers = {
  service: "",
  otherService: "",
  origin: "",
  office: "",
  otherCity: "",
  country: "",
  source: "",
  otherSource: "",
  difference: [],
  otherDifference: "",
  recommend: "",
  recommendWhy: "",
  rating: 0,
  contact: "",
  fullName: "",
  phone: "",
  email: "",
  privacy: false,
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** ¿Está completa la pregunta? (mismas obligatoriedades del formulario oficial) */
export function isStepValid(id: StepId, a: Answers): boolean {
  switch (id) {
    case "service":
      return !!a.service && (a.service !== "Otro" || a.otherService.trim() !== "")
    case "origin":
      if (!a.origin) return false
      if (a.origin === "Otra ciudad") return a.otherCity.trim() !== ""
      return !officesByOrigin[a.origin] || !!a.office
    case "country":
      return !!a.country
    case "source":
      return !!a.source && (a.source !== "Otro" || a.otherSource.trim() !== "")
    case "difference":
      return a.difference.length > 0 && (!a.difference.includes("Otro") || a.otherDifference.trim() !== "")
    case "recommend":
      return !!a.recommend && (a.recommend !== "No" || a.recommendWhy.trim() !== "")
    case "rating":
      return a.rating >= 1
    case "contact":
      // Pregunta opcional en el formulario oficial.
      if (!a.contact || a.contact === "No") return true
      return a.fullName.trim() !== "" && a.phone.trim() !== "" && emailRe.test(a.email.trim()) && a.privacy
  }
}

/** Respuestas con los mismos nombres de campo del formulario oficial. */
export function toPayload(a: Answers): Record<string, string> {
  const p: Record<string, string> = {
    "Servicio utilizado": a.service,
    "Ciudad o estado de origen": a.origin,
    "País de destino": a.country,
    "Cómo se enteró": a.source,
    "Diferencial de Boxex": a.difference.join(", "),
    "Recomendaría el servicio": a.recommend,
    Calificación: `${a.rating} (${ratingLabels[a.rating]})`,
  }
  if (a.contact) p["Desea ser contactado"] = a.contact
  if (a.service === "Otro") p["Otro servicio"] = a.otherService.trim()
  if (a.office) p["Oficina específica"] = a.office
  if (a.origin === "Otra ciudad") p["Otra ciudad"] = a.otherCity.trim()
  if (a.source === "Otro") p["Otro canal"] = a.otherSource.trim()
  if (a.difference.includes("Otro")) p["Otro diferencial de Boxex"] = a.otherDifference.trim()
  if (a.recommend === "No") p["Por qué no recomendaría"] = a.recommendWhy.trim()
  if (a.contact === "Sí") {
    p["Nombre completo"] = a.fullName.trim()
    p["Teléfono de contacto"] = a.phone.trim()
    p["Correo electrónico"] = a.email.trim()
    p["Acepta política de tratamiento de datos"] = "Sí"
  }
  return p
}
