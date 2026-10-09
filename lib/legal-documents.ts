export interface LegalDocument {
  title: string
  description: string
  file?: string
  meta?: string
}

export interface LegalCategory {
  title: string
  documents: LegalDocument[]
}

export const legalCategories: LegalCategory[] = [
  {
    title: "Cumplimiento y prevención",
    documents: [
      {
        title: "Manual SAGRILAFT Corporativo",
        description:
          "Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos, Financiamiento del Terrorismo y Financiamiento de la Proliferación de Armas de Destrucción Masiva. Aplica a todas las empresas de Valley Group, incluyendo Box Express.",
        file: "/documents/legal/manual-sagrilaft-corporativo.pdf",
        meta: "Código CU-M-01 C · Versión 1 · Vigente desde 31 mar 2025",
      },
      {
        title: "Políticas de Cumplimiento y Manual PTEE",
        description:
          "Programa de Transparencia y Ética Empresarial de Boxex.",
      },
    ],
  },
  {
    title: "Protección de datos personales",
    documents: [
      {
        title: "Política de Tratamiento de Datos Personales",
        description:
          "Derechos de los titulares, consultas y reclamos, y tratamiento y conservación de la información. Incluye expresamente a Box Express Courier S.A.S. dentro de su alcance.",
        file: "/documents/legal/politica-tratamiento-datos-personales.pdf",
        meta: "Código PG-D-15 · Versión 01 · Vigente desde 1 sep 2023",
      },
    ],
  },
  {
    title: "Régimen de servicios postales",
    documents: [
      {
        title: "Decreto 2142 de 2016",
        description:
          "Disposiciones para la importación y exportación de teléfonos móviles y celulares, incluyendo condiciones aplicables a tráfico postal y envíos urgentes.",
      },
    ],
  },
  {
    title: "Reportes y operación normativa",
    documents: [
      { title: "Reportes de información y/o reportes postales", description: "" },
      { title: "Documentos de operación normativa", description: "" },
      {
        title: "Información importante relacionada con nuestros usuarios",
        description: "",
      },
    ],
  },
]

export const condicionesCategories: LegalCategory[] = [
  {
    title: "Contrato de prestación de servicios",
    documents: [
      {
        title: "Contrato de Prestación de Servicios Postales de Box Express",
        description:
          "Obligaciones de Box Express y del usuario, derechos, condiciones de entrega y mecanismos para la presentación de PQR.",
        file: "/documents/condiciones/contrato-prestacion-servicios-postales.pdf",
        meta: "Box Express S.A.S. · NIT 805.012.493-1",
      },
    ],
  },
  {
    title: "Condiciones de envío",
    documents: [
      { title: "Condiciones de envío", description: "" },
      { title: "Condiciones del servicio Courier", description: "" },
      { title: "Artículos restringidos o prohibidos", description: "" },
    ],
  },
  {
    title: "Políticas y tarifas",
    documents: [
      { title: "Políticas y condiciones aplicables al servicio", description: "" },
      { title: "Reajustes y/o propuestas de valor", description: "" },
    ],
  },
]

export const resolucionesDocuments: LegalDocument[] = [
  {
    title:
      "Resolución CRC 3038 de 2011 — Régimen de Protección de los Derechos de los Usuarios de los Servicios Postales",
    description:
      "Derechos y obligaciones de los usuarios, procedimientos de PQR, indemnizaciones y demás disposiciones relacionadas con la prestación de los servicios postales.",
    file: "/documents/pqr/resolucion-crc-3038-2011.pdf",
    meta: "Comisión de Regulación de Comunicaciones (CRC) · Resolución No. 3038 de 2011",
  },
]
