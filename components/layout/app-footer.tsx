import Link from "next/link"
import Image from "next/image"
import { footerLinks } from "@/lib/home-data"

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string; external?: boolean }[]
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-brand-blue">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-neutral-600 hover:text-brand-blue hover:underline"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AppFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="Boxex" width={180} height={36} />
          <p className="mt-3 text-sm text-neutral-600">
            Personas, familias y negocios.
            <br />
            Siempre hay algo que nos une.
          </p>
        </div>
        <FooterColumn title="Tu envío" links={footerLinks.envio} />
        <FooterColumn title="Estamos cerca" links={footerLinks.cerca} />
        <FooterColumn title="Boxex" links={footerLinks.boxex} />
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Boxex · Unlimited Courier</span>
          <div className="flex gap-4">
            <Link href="/condiciones" className="hover:text-brand-blue hover:underline">
              Condiciones y restricciones
            </Link>
            <a
              href="https://boxexpress.com/centroaspectos-legales/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue hover:underline"
            >
              Protección de datos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
