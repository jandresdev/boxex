import {
  Package,
  Home as HomeIcon,
  ShoppingBag,
  Globe,
  Search,
  MapPin,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface Service {
  slug: string
  name: string
  tag: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    slug: "envios-internacionales",
    name: "Envíos internacionales",
    tag: "Para eso que quieres hacer llegar.",
    description:
      "Envía paquetes, cajas y mercancías desde Estados Unidos a los destinos de Boxex. Elige la modalidad disponible para tu país con asesoría del equipo.",
    icon: Package,
  },
  {
    slug: "recogida-en-casa",
    name: "Recogida en casa",
    tag: "El viaje empieza en tu puerta.",
    description:
      "Solicita la recogida de tus paquetes en tu casa o ubicación. El equipo confirma la disponibilidad, los detalles del paquete y las condiciones antes de coordinarla.",
    icon: HomeIcon,
  },
  {
    slug: "casillero-virtual",
    name: "Casillero virtual",
    tag: "Tus compras en USA, más cerca.",
    description:
      "Recibe tus compras online en la dirección de Boxex en Estados Unidos y coordina su envío. Crea tu cuenta para obtener tu identificación de casillero.",
    icon: ShoppingBag,
  },
  {
    slug: "exportaciones",
    name: "Exportaciones",
    tag: "Tu negocio puede llegar más lejos.",
    description:
      "Recibe acompañamiento del equipo de comercio exterior para enviar mercancías desde Colombia hacia destinos internacionales.",
    icon: Globe,
  },
]

export const journeySteps = [
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

export const countries: Record<string, string[]> = {
  Colombia: ["Aéreo", "Marítimo", "Marítimo express"],
  Venezuela: ["Aéreo", "Marítimo"],
  Ecuador: ["Aéreo"],
  Perú: ["Aéreo"],
  México: ["Terrestre"],
  Guatemala: ["Aéreo", "Marítimo", "Marítimo express"],
  "El Salvador": ["Aéreo", "Marítimo"],
  Nicaragua: ["Aéreo", "Marítimo"],
  Honduras: ["Aéreo", "Marítimo"],
  "República Dominicana": ["Aéreo", "Marítimo"],
  Haití: ["Marítimo"],
}

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/ /g, "-")
}

export const homeFaqs = [
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
]

export const quickActions = [
  {
    href: "/rastreo",
    icon: Search,
    title: "¿Dónde está mi envío?",
    subtitle: "Rastrea con tu número de guía",
  },
  {
    href: "/servicios/recogida-en-casa",
    icon: HomeIcon,
    title: "Recógelo en mi casa",
    subtitle: "Consulta disponibilidad de recogida",
  },
  {
    href: "/oficinas",
    icon: MapPin,
    title: "Encuentra tu oficina",
    subtitle: "Direcciones y atención cercana",
  },
]

export const footerLinks = {
  envio: [
    { href: "/servicios", label: "Servicios" },
    { href: "/destinos", label: "Destinos y modalidades" },
    { href: "/rastreo", label: "Rastrear envío" },
    { href: "/pagos", label: "Pagar una orden" },
  ],
  cerca: [
    { href: "/oficinas", label: "Encuentra una oficina" },
    { href: "/contacto", label: "Contacto" },
    { href: "/ayuda", label: "Preguntas frecuentes" },
    { href: "/guias", label: "Guías para enviar" },
    { href: "/aliados", label: "Sé nuestro aliado" },
  ],
  boxex: [
    { href: "/nosotros", label: "Sobre nosotros" },
    { href: "/legal", label: "Información legal" },
    { href: "/reclamaciones", label: "Quejas y reclamos" },
    {
      href: "https://controlboxexpress.com/app/login",
      label: "Acceso agentes ↗",
      external: true,
    },
    {
      href: "https://www.instagram.com/boxexusa/",
      label: "Instagram ↗",
      external: true,
    },
  ],
}

export const WHATSAPP_NUMBER = "573176410982"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
