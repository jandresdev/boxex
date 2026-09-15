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
      <h3 className="mb-6 text-sm text-brand-blue">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs text-brand-blue/70 hover:text-brand-blue hover:underline"
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
    <footer className="bg-white pt-14 pb-6 lg:pt-[75px]">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-brand-line px-6 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:pb-[60px]">
        <div>
          <Image src="/logo.png" alt="Boxex" width={736} height={241} className="h-[47px] w-auto" />
          <p className="mt-6 text-[13px] leading-[1.7] text-brand-blue/70">
            Personas, familias y negocios.
            <br />
            Siempre hay algo que nos une.
          </p>
        </div>
        <FooterColumn title="Tu envío" links={footerLinks.envio} />
        <FooterColumn title="Estamos cerca" links={footerLinks.cerca} />
        <FooterColumn title="Boxex" links={footerLinks.boxex} />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 pt-6 text-[10px] text-brand-blue/60 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Boxex · Unlimited Courier</span>
        <div className="flex gap-5">
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
    </footer>
  )
}
