import Link from "next/link"

const utilityLinks = [
  { href: "/pqr", label: "PQRs" },
  { href: "/aliados", label: "¿Quieres ser nuestro aliado?" },
  { href: "/rastreo", label: "Rastrea tu envío" },
  { href: "/pagos", label: "Pagos" },
  { href: "https://clientes.boxexpress.com/app/", label: "Mi casillero ↗" },
]

export function AppTopbar() {
  return (
    <div className="sticky top-0 z-50 flex h-10 items-center bg-brand-blue px-3 text-xs text-white md:px-4">
      <nav
        aria-label="Enlaces de utilidad"
        className="ml-auto flex items-center gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {utilityLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 hover:underline"
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
