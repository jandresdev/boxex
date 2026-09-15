import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { TiltCard } from "@/components/home/tilt-card"
import { CountryMap } from "./country-map"
import { countryFlagUrl } from "@/lib/country-flags"

export function DestinationCard({
  country,
  modes,
  href,
}: {
  country: string
  modes: string[]
  href: string
}) {
  const flagUrl = countryFlagUrl(country)

  return (
    <TiltCard restDeg={0} className="h-full">
      <Link
        href={href}
        className="group relative flex h-full cursor-pointer overflow-hidden rounded-2xl border border-white/60 shadow-[0_15px_35px_rgba(1,22,137,0.1)] transition-shadow hover:border-white/80 hover:shadow-[0_20px_45px_rgba(1,22,137,0.2)]"
      >
        {flagUrl && (
          <Image
            src={flagUrl}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0 scale-110 object-cover opacity-45 blur-md"
          />
        )}
        <div className="relative flex h-full w-full items-center gap-4 bg-white/75 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft-gold text-brand-blue">
                <MapPin className="size-5" />
              </span>
              <ArrowRight className="size-[18px] shrink-0 text-brand-blue transition-transform group-hover:translate-x-1" />
            </div>
            <strong className="mb-3 text-lg font-semibold text-brand-blue">
              {country}
            </strong>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {modes.map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-brand-pale px-2.5 py-1 text-[11px] text-brand-blue/70"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden shrink-0 items-center justify-center sm:flex">
            <CountryMap country={country} className="size-24 lg:size-28" />
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
