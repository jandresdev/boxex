/**
 * Solicitud de vinculación a la red de Agentes Autorizados.
 *
 * Los campos replican los del formulario oficial "Hágase nuestro agente"
 * (boxexpress.com/hagase-nuestro-agente, formulario de forms.controlboxexpress.com,
 * consultado el 2026-10-13): todos obligatorios salvo FAX. El formulario
 * original guarda en la plataforma de Boxex; aquí se envía por FormSubmit al
 * correo oficial de contacto, igual que el resto de formularios del sitio.
 */
import { CONTACT_EMAIL } from "@/lib/contact-data"

export const AGENT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

export type AgentField = {
  name: string
  label: string
  placeholder: string
  type?: "text" | "tel" | "email"
  autoComplete?: string
  required?: boolean
  maxLength: number
}

export const agentSections: { title: string; fields: AgentField[] }[] = [
  {
    title: "1 · Datos de tu empresa",
    fields: [
      { name: "Compañía", label: "Compañía", placeholder: "Nombre de tu empresa", autoComplete: "organization", required: true, maxLength: 120 },
      { name: "Nombre", label: "Nombre", placeholder: "Nombre y apellido", autoComplete: "name", required: true, maxLength: 120 },
      { name: "Dirección", label: "Dirección", placeholder: "Calle, número, local", autoComplete: "street-address", required: true, maxLength: 160 },
      { name: "Departamento/Estado", label: "Departamento / Estado", placeholder: "Ej: Antioquia, Florida", autoComplete: "address-level1", required: true, maxLength: 80 },
      { name: "Ciudad", label: "Ciudad", placeholder: "Ej: Medellín, Miami", autoComplete: "address-level2", required: true, maxLength: 80 },
      { name: "Código postal", label: "Código postal", placeholder: "Ej: 050001 / 33172", autoComplete: "postal-code", required: true, maxLength: 20 },
    ],
  },
  {
    title: "2 · Datos de contacto",
    fields: [
      { name: "Teléfono", label: "Teléfono", placeholder: "+57 300 000 0000", type: "tel", autoComplete: "tel", required: true, maxLength: 30 },
      { name: "FAX", label: "FAX", placeholder: "Si tienes", type: "tel", maxLength: 30 },
      { name: "E-Mail", label: "Correo electrónico", placeholder: "correo@empresa.com", type: "email", autoComplete: "email", required: true, maxLength: 120 },
    ],
  },
  {
    title: "3 · Referencia comercial",
    fields: [
      { name: "Compañía (referencia comercial)", label: "Compañía", placeholder: "Empresa que te recomienda", required: true, maxLength: 120 },
      { name: "Nombre (referencia comercial)", label: "Nombre", placeholder: "Persona de contacto", required: true, maxLength: 120 },
      { name: "Teléfono (referencia comercial)", label: "Teléfono", placeholder: "+57 300 000 0000", type: "tel", required: true, maxLength: 30 },
    ],
  },
]

export const agentSteps = [
  { title: "Diligencia el formulario", text: "Cuéntanos de tu empresa, cómo contactarte y una referencia comercial." },
  { title: "Evaluamos tu solicitud", text: "El equipo de Boxex revisa la información de tu empresa y de tu referencia." },
  { title: "Te contactamos", text: "Un asesor se comunica contigo para explicarte las condiciones de vinculación." },
] as const
