/**
 * Approximate capital-city coordinates for each destination country.
 * Used to place the pin on the mini 3D globe map on each destination
 * card — stylized, not for navigation precision.
 */
export const countryCoordinates: Record<string, { lat: number; lng: number }> = {
  Colombia: { lat: 4.71, lng: -74.07 }, // Bogotá
  Venezuela: { lat: 10.48, lng: -66.9 }, // Caracas
  Ecuador: { lat: -0.23, lng: -78.52 }, // Quito
  Perú: { lat: -12.05, lng: -77.04 }, // Lima
  México: { lat: 19.43, lng: -99.13 }, // Ciudad de México
  Guatemala: { lat: 14.63, lng: -90.51 }, // Ciudad de Guatemala
  "El Salvador": { lat: 13.69, lng: -89.22 }, // San Salvador
  Nicaragua: { lat: 12.11, lng: -86.24 }, // Managua
  Honduras: { lat: 14.1, lng: -87.22 }, // Tegucigalpa
  "República Dominicana": { lat: 18.49, lng: -69.89 }, // Santo Domingo
  Haití: { lat: 18.59, lng: -72.31 }, // Puerto Príncipe
}
