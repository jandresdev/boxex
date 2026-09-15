// ISO 3166-1 alpha-2 codes for the 11 Boxex destination countries, used to
// fetch each country's real flag from flagcdn.com (a free, public flag CDN:
// https://flagcdn.com/ — URL pattern https://flagcdn.com/w{width}/{code}.png).
const countryIsoCodes: Record<string, string> = {
  Colombia: "co",
  Venezuela: "ve",
  Ecuador: "ec",
  Perú: "pe",
  México: "mx",
  Guatemala: "gt",
  "El Salvador": "sv",
  Nicaragua: "ni",
  Honduras: "hn",
  "República Dominicana": "do",
  Haití: "ht",
}

export function countryFlagUrl(country: string, width: 320 | 640 = 320) {
  const code = countryIsoCodes[country]
  return code ? `https://flagcdn.com/w${width}/${code}.png` : undefined
}
