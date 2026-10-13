/**
 * Centro de aspectos legales de BOXEX.
 *
 * Fuente: boxexpress.com/centroaspectos-legales (consultado el 2026-10-13).
 * Los 9 documentos del centro oficial, almacenados localmente en
 * public/documents. Nota: en el sitio oficial, el "Régimen de Protección al
 * Usuario Postal (Res. 3038 de 2011)" y "Deberes y derechos de nuestros
 * usuarios" apuntan al mismo archivo PDF.
 */

export type LegalCategoryId = "postal" | "usuarios" | "cumplimiento"

export interface LegalDocument {
  id: string
  title: string
  description: string
  category: LegalCategoryId
  /** Ruta pública del PDF. */
  file: string
  meta: string
  /** Palabras adicionales para la búsqueda. */
  keywords?: string
}

export const legalCategoryMeta: { id: LegalCategoryId; title: string; text: string }[] = [
  { id: "postal", title: "Normatividad postal", text: "Leyes, resoluciones y reportes del servicio postal en Colombia." },
  { id: "usuarios", title: "Información para usuarios", text: "Contrato, derechos, datos personales y normas de importación." },
  { id: "cumplimiento", title: "Cumplimiento y ética", text: "Manuales de prevención de riesgos y transparencia empresarial." },
]

export const legalDocuments: LegalDocument[] = [
  {
    id: "ley-1369",
    title: "Régimen de los Servicios Postales · Ley 1369 de 2009",
    description:
      "Establece el régimen general de prestación de los servicios postales en Colombia y las entidades encargadas de su regulación, vigilancia y control.",
    category: "postal",
    file: "/documents/legal/ley-1369-de-2009-regimen-servicios-postales.pdf",
    meta: "El Congreso de Colombia · Ley 1369 de 2009",
    keywords: "ley postal régimen",
  },
  {
    id: "res-2959",
    title: "Reportes de Información · Resolución 2959 de 2010",
    description:
      "Régimen de reporte de información de los operadores de servicios postales ante la Comisión de Regulación de Comunicaciones (CRC).",
    category: "postal",
    file: "/documents/legal/resolucion-2959-de-2010-reportes-informacion.pdf",
    meta: "Comisión de Regulación de Comunicaciones (CRC) · Resolución 2959 de 2010",
    keywords: "crc reportes operadores",
  },
  {
    id: "res-3038",
    title: "Régimen de Protección al Usuario Postal · Resolución 3038 de 2011",
    description:
      "Derechos y obligaciones de los usuarios, procedimientos de PQR, indemnizaciones y demás disposiciones relacionadas con la prestación de los servicios postales.",
    category: "postal",
    file: "/documents/pqr/resolucion-crc-3038-2011.pdf",
    meta: "Comisión de Regulación de Comunicaciones (CRC) · Resolución 3038 de 2011",
    keywords: "pqr reclamación indemnización usuario",
  },
  {
    id: "contrato",
    title: "Contrato Box Express · Prestación de servicios postales",
    description:
      "Obligaciones de Box Express y del usuario, derechos, condiciones de entrega y mecanismos para la presentación de PQR.",
    category: "usuarios",
    file: "/documents/condiciones/contrato-prestacion-servicios-postales.pdf",
    meta: "Box Express Courier S.A.S. · Contrato de prestación de servicios postales",
    keywords: "contrato condiciones entrega",
  },
  {
    id: "deberes-derechos",
    title: "Deberes y derechos de nuestros usuarios",
    description:
      "Información importante sobre los deberes y derechos de los usuarios del servicio postal de Box Express (mismo documento que publica el sitio oficial).",
    category: "usuarios",
    file: "/documents/pqr/resolucion-crc-3038-2011.pdf",
    meta: "Box Express Courier S.A.S. · Información para usuarios",
    keywords: "derechos usuario",
  },
  {
    id: "decreto-2142",
    title: "Decreto 2142 de 2016 · Importación de celulares",
    description:
      "Disposiciones para la importación de teléfonos móviles y celulares, incluyendo condiciones aplicables a tráfico postal y envíos urgentes.",
    category: "usuarios",
    file: "/documents/legal/decreto-2142-de-2016.pdf",
    meta: "Ministerio de Comercio, Industria y Turismo · Decreto 2142 del 23 de diciembre de 2016",
    keywords: "celulares importación aduana",
  },
  {
    id: "datos",
    title: "Política de Tratamiento de Datos Personales",
    description:
      "Derechos de los titulares, consultas y reclamos, y tratamiento y conservación de la información. Incluye expresamente a Box Express Courier S.A.S. dentro de su alcance.",
    category: "usuarios",
    file: "/documents/legal/politica-tratamiento-datos-personales.pdf",
    meta: "Código PG-D-15 · Versión 01 · Vigente desde el 1 de septiembre de 2023",
    keywords: "habeas data privacidad ley 1581",
  },
  {
    id: "ptee",
    title: "Manual PTEE · Políticas de Cumplimiento",
    description:
      "Programa de Transparencia y Ética Empresarial, supervisado por la Superintendencia de Sociedades. Establece los controles de VALLEYGROUP frente a riesgos de soborno transnacional y corrupción.",
    category: "cumplimiento",
    file: "/documents/legal/manual-ptee.pdf",
    meta: "Código PTEE-M-01 · Versión 01 · Vigente desde el 18 de febrero de 2025",
    keywords: "ética soborno corrupción transparencia",
  },
  {
    id: "sagrilaft",
    title: "Manual SAGRILAFT · Versión corporativa",
    description:
      "Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos, Financiamiento del Terrorismo y Financiamiento de la Proliferación de Armas de Destrucción Masiva. Aplica a todas las empresas de Valley Group, incluyendo Box Express.",
    category: "cumplimiento",
    file: "/documents/legal/manual-sagrilaft-corporativo.pdf",
    meta: "Código CU-M-01 C · Versión 1 · Vigente desde el 31 de marzo de 2025",
    keywords: "lavado activos terrorismo riesgo",
  },
]
