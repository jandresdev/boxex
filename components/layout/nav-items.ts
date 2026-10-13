import type { LucideIcon } from "lucide-react"
import { Home, Package, ShoppingBag, MapPin, Building2, HelpCircle } from "lucide-react"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/servicios", label: "Servicios", icon: Package },
  { href: "/mi-casillero", label: "Casillero virtual", icon: ShoppingBag },
  { href: "/destinos", label: "Destinos", icon: MapPin },
  { href: "/oficinas", label: "Oficinas", icon: Building2 },
  { href: "/ayuda", label: "Ayuda y contacto", icon: HelpCircle },
]

export const quoteCta = {
  href: "/cotizar",
  label: "Cotizar envío",
}
