export type OfficeCountry = "Colombia" | "Estados Unidos" | "Guatemala"

export interface Office {
  id: string
  country: OfficeCountry
  city: string
  address: string
  /** Teléfono principal en formato E.164 (para enlaces tel:). */
  tel: string
  /** WhatsApp de la oficina en formato E.164 (para enlaces wa.me). */
  whatsapp?: string
  email?: string
  lat: number
  lng: number
  /**
   * "exacta": la dirección se resolvió al número de puerta o edificio.
   * "aproximada": solo se pudo ubicar la calle o un punto de referencia.
   */
  precision: "exacta" | "aproximada"
}

/**
 * Oficinas de Boxex. Direcciones, teléfonos, WhatsApp y correos tomados de
 * https://boxexpress.com/consultas-y-asesor-de-envios/ (consultado el
 * 2026-10-13). Coordenadas:
 *  - Estados Unidos: U.S. Census Geocoder (Public_AR_Current), coincidencia
 *    exacta de dirección.
 *  - Medellín: OpenStreetMap (edificio Forum, Calle 7 Sur 42-70).
 *  - Cali, Bogotá, Cartagena y Guatemala: OpenStreetMap a nivel de calle o
 *    punto de referencia (aproximadas; confirmar con la oficina).
 */
export const offices: Office[] = [
  { id: "cali", country: "Colombia", city: "Cali", address: "Calle 28 Norte #2 Bis N - 75", tel: "+576024867979", lat: 3.46987, lng: -76.52535, precision: "aproximada" },
  { id: "bogota", country: "Colombia", city: "Bogotá", address: "Carrera 97 #24c - 75 Bodega 47", tel: "+576017457979", lat: 4.67668, lng: -74.13736, precision: "aproximada" },
  { id: "cartagena", country: "Colombia", city: "Cartagena", address: "Carrera 25 #25a-40", tel: "+576056932740", lat: 10.40884, lng: -75.53659, precision: "aproximada" },
  { id: "medellin", country: "Colombia", city: "Medellín", address: "Calle 7S #42-70 Ofi 1513", tel: "+576046045927", lat: 6.19778, lng: -75.57343, precision: "exacta" },
  { id: "miami-doral", country: "Estados Unidos", city: "Miami · Bodega central", address: "2025 NW 102 Ave. #109, Doral FL 33172", tel: "+13055932152", lat: 25.79263, lng: -80.36085, precision: "exacta" },
  { id: "miami-aeropuerto", country: "Estados Unidos", city: "Miami · Aeropuerto", address: "2509B NW 72 Ave., Miami FL 33122", tel: "+13054363000", whatsapp: "+17868511185", email: "aeropuerto@boxexpress.com", lat: 25.80762, lng: -80.31316, precision: "exacta" },
  { id: "ny-jackson-heights", country: "Estados Unidos", city: "New York · Jackson Heights", address: "88-23 37 Ave., Jackson Heights NY 11372", tel: "+17186515500", whatsapp: "+16466964627", email: "box.ny@boxexpress.com", lat: 40.75042, lng: -73.87849, precision: "exacta" },
  { id: "ny-woodside", country: "Estados Unidos", city: "New York · Woodside", address: "57-19 Roosevelt Ave., Woodside NY 11377", tel: "+17184762099", whatsapp: "+16466965427", email: "boxny2@boxexpress.com", lat: 40.74541, lng: -73.90733, precision: "exacta" },
  { id: "nj-morris", country: "Estados Unidos", city: "New Jersey · Morris Ave.", address: "260 Morris Ave., Elizabeth NJ 07208", tel: "+19083557020", whatsapp: "+12018840206", email: "boxnj@boxexpress.com", lat: 40.66749, lng: -74.21596, precision: "exacta" },
  { id: "nj-bayway", country: "Estados Unidos", city: "New Jersey · Bayway Ave.", address: "725 Bayway Ave., Elizabeth NJ 07202", tel: "+19089629024", whatsapp: "+12018870063", email: "boxnj2@boxexpress.com", lat: 40.64892, lng: -74.21855, precision: "exacta" },
  { id: "boston", country: "Estados Unidos", city: "Boston", address: "52 Bennington St., East Boston MA 02128", tel: "+16175692037", whatsapp: "+16177776691", email: "boxboston@boxexpress.com", lat: 42.37566, lng: -71.03699, precision: "exacta" },
  { id: "houston", country: "Estados Unidos", city: "Texas · Houston", address: "5013 Hwy 6 North, Houston TX 77084", tel: "+12813454610", whatsapp: "+18328302282", email: "boxtx@boxexpress.com", lat: 29.85061, lng: -95.64565, precision: "exacta" },
  { id: "katy", country: "Estados Unidos", city: "Texas · Katy", address: "21414 Julie Marie Ln., Suite 501, Katy TX 77449", tel: "+13463224160", whatsapp: "+17134743032", email: "boxtx2@boxexpress.com", lat: 29.78722, lng: -95.73953, precision: "exacta" },
  { id: "guatemala", country: "Guatemala", city: "Ciudad de Guatemala", address: "Km 18.5 Carretera a El Salvador, atrás de Portal Solé", tel: "+50266707500", lat: 14.52959, lng: -90.46502, precision: "aproximada" },
]

export const allFaqs = [
  {
    q: "¿A qué países puedo enviar desde Estados Unidos?",
    a: "Boxex atiende Colombia, Venezuela, Ecuador, Perú, México, Guatemala, El Salvador, Nicaragua, Honduras, República Dominicana y Haití. Las modalidades cambian según el país. Consulta Destinos para elegir tu ruta.",
  },
  {
    q: "¿Cómo conozco el costo de mi envío?",
    a: "Prepara el país y ciudad de destino, contenido, peso y medidas de tu paquete. Solicita una cotización al equipo de Boxex para confirmar flete, cargos, cobertura y condiciones antes de enviar.",
  },
  {
    q: "¿Qué es un casillero virtual?",
    a: "Es una dirección en Estados Unidos para recibir tus compras online. Boxex identifica los paquetes con tu IDBOX y te acompaña en el proceso de despacho. El registro del casillero se ofrece sin costo; el transporte se cotiza por separado.",
  },
  {
    q: "¿Cómo rastreo un paquete?",
    a: "Usa el número de guía que recibiste de Boxex. La opción Rastrea tu envío te lleva al sistema oficial de seguimiento. El tracking de la tienda en Estados Unidos puede ser distinto de tu guía Boxex.",
  },
  {
    q: "¿Pueden recoger mi caja en casa?",
    a: "Boxex ofrece recogida en casa. Consulta con el equipo la disponibilidad en tu ubicación, el tamaño y contenido de tu caja y las condiciones de recogida.",
  },
  {
    q: "¿Cuánto tarda en llegar?",
    a: "El plazo depende del origen, destino, modalidad y proceso aduanero. Pide el tiempo estimado para tu envío específico al cotizar. No todas las rutas tienen los mismos plazos.",
  },
  {
    q: "¿Qué puedo enviar?",
    a: "Antes de comprar o empacar, consulta las condiciones y restricciones de Boxex y confirma tu tipo de mercancía con el equipo. Las reglas varían por producto y destino.",
  },
  {
    q: "¿Cómo hago una reclamación?",
    a: "Accede a Quejas y reclamos desde Ayuda. Ten a mano tu número de guía y la información del caso para diligenciar el formulario oficial.",
  },
]

export const journeyStepsFull = [
  {
    title: "Elige a dónde llegará",
    text: "Consulta las modalidades disponibles para tu país y cuéntanos qué quieres enviar.",
  },
  {
    title: "Prepara tu paquete",
    text: "Confirma la cotización, el contenido y las condiciones. Solicita recogida o visita una oficina.",
  },
  {
    title: "Déjalo en nuestras manos",
    text: "El equipo te acompaña en el proceso de recepción y despacho de tu envío.",
  },
  {
    title: "Sigue su recorrido",
    text: "Consulta el estado con tu guía Boxex y encuentra ayuda cuando la necesites.",
  },
]
