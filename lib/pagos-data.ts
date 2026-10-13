/**
 * Medios de pago de BOXEX.
 *
 * Fuente: boxexpress.com/pagos (consultado el 2026-10-13). Los formularios de
 * pago son los oficiales de Boxex y se cargan tal cual desde
 * forms.controlboxexpress.com (mismo origen que usa la página oficial).
 */

export type PayMethod = {
  id: "paypal" | "tarjeta"
  label: string
  coverage: string
  /** Formulario oficial de pago. */
  src: string
  /** Alto del formulario en px (el de la página oficial). */
  height: number
  steps: string[]
}

export const payMethods: PayMethod[] = [
  {
    id: "paypal",
    label: "PayPal",
    coverage: "Colombia y Estados Unidos",
    src: "https://forms.controlboxexpress.com/app/pagoPaypal",
    height: 190,
    steps: [
      "Digita el número de orden que se te ha asignado.",
      "Haz clic en el botón PAGAR AHORA.",
      "Si no tienes una cuenta, haz clic en la opción Abrir una cuenta y diligencia el formulario.",
      "Una vez tengas tu cuenta de PayPal, disfruta de los beneficios de realizar pagos seguros por internet.",
    ],
  },
  {
    id: "tarjeta",
    label: "Tarjeta",
    coverage: "Estados Unidos",
    src: "https://forms.controlboxexpress.com/app/pagoBlackstone",
    height: 350,
    steps: [
      "Digita el número de orden que se te ha asignado.",
      "Haz clic en el botón CONTINUAR.",
      "Selecciona el método de pago.",
      "Ingresa la información de tu tarjeta en el formulario.",
    ],
  },
]

/** Logos de los medios de pago en Colombia que muestra la página oficial. */
export const colombiaMethods = [
  { name: "Banco de Occidente", logo: "/pagos/occidente.webp", width: 1155, height: 243 },
  { name: "PSE", logo: "/pagos/pse.webp", width: 240, height: 240 },
  { name: "Baloto", logo: "/pagos/baloto.webp", width: 877, height: 311 },
] as const

export const PAY_PBX_CO = { tel: "+576024867979", label: "(2) 486 79 79" } as const
