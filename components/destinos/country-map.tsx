import { countryGeoData } from "@/lib/country-geo-data"

function polygonsToPath(polygons: number[][][][]) {
  return polygons
    .map((rings) =>
      rings
        .map(
          (ring) =>
            ring
              .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(3)},${y.toFixed(3)}`)
              .join(" ") + " Z"
        )
        .join(" ")
    )
    .join(" ")
}

// All country geometry in lib/country-geo-data.ts is normalized so its
// longest dimension spans 2 units, centered at the origin — so one
// fixed, slightly padded viewBox frames every country with no cropping.
const VIEWBOX = "-1.18 -1.18 2.36 2.36"

/**
 * A static, real silhouette of the country's own border — not a card,
 * not a frame, just the shape (like a flat PNG) with a soft ambient
 * glow and a pin at the capital. No interaction, no animation.
 */
export function CountryMap({
  country,
  className,
}: {
  country: string
  className?: string
}) {
  const geo = countryGeoData[country]
  if (!geo) return null

  const d = polygonsToPath(geo.polygons)
  const [pinX, pinY] = geo.pin
  const gradId = `map-grad-${country.replace(/[^a-zA-Z0-9]/g, "")}`
  const glowId = `map-glow-${country.replace(/[^a-zA-Z0-9]/g, "")}`

  return (
    <svg
      viewBox={VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Mapa de ${country}`}
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#274bd6" />
          <stop offset="55%" stopColor="#011689" />
          <stop offset="100%" stopColor="#000d5c" />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.05" />
        </filter>
      </defs>

      {/* Soft ambient glow — no hard edges, so it never reads as a box */}
      <path d={d} fill="#011689" opacity="0.4" filter={`url(#${glowId})`} />

      <path
        d={d}
        fill={`url(#${gradId})`}
        stroke="#d6b36a"
        strokeWidth={0.018}
        strokeLinejoin="round"
        strokeOpacity={0.85}
      />

      {/* Capital pin */}
      <circle cx={pinX} cy={pinY} r={0.075} fill="#d6b36a" opacity={0.35} />
      <circle cx={pinX} cy={pinY} r={0.04} fill="#d6b36a" stroke="#ffffff" strokeWidth={0.012} />
    </svg>
  )
}
