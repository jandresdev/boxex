import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { TiltCard } from "@/components/home/tilt-card"
import { CountryMap3D } from "./country-map-3d"

export function DestinationCard({
  country,
  modes,
  href,
}: {
  country: string
  modes: string[]
  href: string
}) {
  return (
    <TiltCard restDeg={0} className="h-full">
      <Link
        href={href}
        className="group relative flex h-full cursor-pointer items-center gap-4 rounded-2xl border border-white/60 bg-white/75 p-5 shadow-[0_15px_35px_rgba(1,22,137,0.1)] backdrop-blur-xl transition-shadow hover:border-white/80 hover:shadow-[0_20px_45px_rgba(1,22,137,0.2)] sm:p-6"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-5 flex items-center justify-between">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft-gold text-brand-blue">
              <MapPin className="size-5" />
            </span>
            <ArrowRight className="size-[18px] shrink-0 text-brand-blue transition-transform group-hover:translate-x-1 sm:hidden" />
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

        <div className="relative hidden shrink-0 items-center justify-center sm:flex">
          <div className="absolute inset-0 -m-3 rounded-2xl bg-brand-blue/15 blur-xl" />
          <CountryMap3D
            country={country}
            className="relative size-24 rounded-2xl border border-white/50 bg-gradient-to-br from-brand-blue/10 to-brand-soft-gold/20 shadow-[inset_0_0_18px_rgba(1,22,137,0.25)] lg:size-28"
          />
          <ArrowRight className="absolute -bottom-2 -right-2 hidden size-[18px] rounded-full bg-white p-[3px] text-brand-blue shadow-md transition-transform group-hover:translate-x-1 sm:block" />
        </div>
      </Link>
    </TiltCard>
  )
}
