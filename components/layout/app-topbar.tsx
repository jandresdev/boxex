import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

const utilityLinks = [
  { href: "/rastreo", label: "Rastrea tu envío" },
  { href: "/pagos", label: "Pagos" },
  { href: "https://clientes.boxexpress.com/app/", label: "Mi casillero ↗" },
]

export function AppTopbar() {
  return (
    <div className="sticky top-0 z-50 flex h-10 items-center gap-4 bg-brand-blue px-3 text-xs text-white md:px-4">
      <SidebarTrigger
        className="text-white hover:bg-white/10 hover:text-white lg:hidden"
        aria-label="Abrir menú de navegación"
      />
      <nav
        aria-label="Enlaces de utilidad"
        className="ml-auto flex items-center gap-4"
      >
        {utilityLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:underline"
            {...(link.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
