/**
 * Datos del servicio de recogidas. Fuente: página oficial de recogidas de
 * BOXEX (boxexpress.com/wp-content/uploads/2026/06/boxex_recogidas.html),
 * consultada el 2026-10-13.
 */

// Mismo destino que el formulario oficial (FormSubmit → recogidas@boxex.us),
// usando su variante AJAX para no sacar al visitante de la página.
export const PICKUP_FORM_ENDPOINT = "https://formsubmit.co/ajax/recogidas@boxex.us"

// Línea de WhatsApp de recogidas publicada en la página oficial.
export const PICKUP_WHATSAPP_URL = "https://wa.me/19292154027"
export const PICKUP_PHONE = "+18772698646"
export const PICKUP_PHONE_LABEL = "1 877 269 8646"

export const pickupZones = [
  "New York",
  "New Jersey",
  "Boston",
  "Miami",
  "Texas",
] as const

export const pickupModes = [
  {
    name: "Driver BOXEX",
    badge: "Recogida directa",
    text: "Un conductor de BOXEX pasa por tu paquete en nuestras zonas de cobertura.",
    points: [
      `Zonas: ${pickupZones.join(", ")}.`,
      "Peso mínimo: 30 libras.",
      "Un asesor confirma la cobertura y agenda la recogida.",
    ],
  },
  {
    name: "UPS",
    badge: "Otros estados",
    text: "Si estás fuera de nuestras rutas o muy lejos, revisamos la recogida por medio de UPS.",
    points: [
      "Cobertura en otros estados de EE. UU.",
      "Peso mínimo: 20 libras.",
      "Un asesor revisa la opción y las condiciones contigo.",
    ],
  },
] as const

export const pickupSteps = [
  {
    title: "Solicita tu recogida",
    text: "Déjanos tus datos básicos, tu ubicación y el destino de tu envío.",
  },
  {
    title: "Confirmamos cobertura",
    text: "Un asesor de BOXEX se comunica contigo para confirmar cobertura y condiciones.",
  },
  {
    title: "Recogemos tu paquete",
    text: "Pasamos por él con un driver BOXEX o por UPS, según tu ubicación.",
  },
  {
    title: "Lo enviamos a tu familia",
    text: "Tu paquete viaja de forma segura a 11 países de Latinoamérica.",
  },
] as const
