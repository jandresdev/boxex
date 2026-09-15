export interface Office {
  country: string
  city: string
  address: string
  tel: string
}

export const offices: Office[] = [
  { country: "Colombia", city: "Cali", address: "Calle 28 Norte #2 Bis N - 75", tel: "+576024867979" },
  { country: "Colombia", city: "Bogotá", address: "Carrera 97 #24c - 75 Bodega 47", tel: "+576017457979" },
  { country: "Colombia", city: "Cartagena", address: "Carrera 25 #25a-40", tel: "+576056932740" },
  { country: "Colombia", city: "Medellín", address: "Calle 7S #42-70 Ofi 1513", tel: "+576046045927" },
  { country: "Estados Unidos", city: "Miami · Bodega central", address: "2025 NW 102 Ave. #109, Doral FL 33172", tel: "+13055932152" },
  { country: "Estados Unidos", city: "Miami · Aeropuerto", address: "2509B NW 72 Ave., Miami FL 33122", tel: "+13054363000" },
  { country: "Estados Unidos", city: "New York · Jackson Heights", address: "88-23 37 Ave., Jackson Heights NY 11372", tel: "+17186515500" },
  { country: "Estados Unidos", city: "New York · Woodside", address: "57-19 Roosevelt Ave., Woodside NY 11377", tel: "+17184762099" },
  { country: "Estados Unidos", city: "New Jersey · Morris Ave.", address: "260 Morris Ave., Elizabeth NJ 07208", tel: "+19083557020" },
  { country: "Estados Unidos", city: "New Jersey · Bayway Ave.", address: "725 Bayway Ave., Elizabeth NJ 07202", tel: "+19089629024" },
  { country: "Estados Unidos", city: "Boston", address: "52 Bennington St., East Boston MA 02128", tel: "+16175692037" },
  { country: "Estados Unidos", city: "Texas · Houston", address: "5013 Hwy 6 North, Houston TX 77084", tel: "+12813454610" },
  { country: "Estados Unidos", city: "Texas · Katy", address: "21414 Julie Marie Ln., Suite 501, Katy TX 77449", tel: "+13463224160" },
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
