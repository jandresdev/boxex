/**
 * Condiciones y restricciones de BOXEX.
 *
 * Fuente: boxexpress.com/condiciones-restricciones (consultado el 2026-10-13).
 * El texto conserva el sentido y los valores de la página oficial; solo se
 * reorganiza en categorías para facilitar la lectura. Confirmar vigencia con
 * Boxex antes de modificar cifras o plazos.
 */

export type DocLink = { label: string; href: string }

export type ConditionItem = {
  id: string
  title: string
  /** Párrafos de texto corrido. */
  paragraphs?: string[]
  /** Listas con viñetas (cada grupo es una lista). */
  lists?: string[][]
  /** Aviso destacado al final. */
  note?: string
  docs?: DocLink[]
  /** Enlace interno de apoyo. */
  link?: DocLink
}

export type ConditionCategory = {
  id: string
  title: string
  summary: string
  items: ConditionItem[]
}

export const quickFacts = [
  { value: "6", label: "unidades máximo de un mismo artículo", hint: "Sin importar color, talla o referencia" },
  { value: "USD 2.000", label: "valor declarado máximo por envío", hint: "No puede exceder este valor" },
  { value: "110 lb", label: "peso máximo por envío (50 kg)", hint: "Pregunta a tu agente" },
  { value: "118″", label: "suma máxima de medidas (3 m)", hint: "Ningún lado puede superar 59″ (1,50 m)" },
] as const

export const conditionCategories: ConditionCategory[] = [
  {
    id: "envio",
    title: "Condiciones de envío",
    summary: "Límites de peso, valor y medidas para el servicio courier a Colombia.",
    items: [
      {
        id: "condiciones-courier",
        title: "Condiciones de envío courier – Colombia",
        lists: [
          [
            "No está permitido enviar más de seis (6) unidades de un mismo artículo, indiferente de su color, talla o referencia.",
            "El valor declarado de su envío no puede exceder los USD $2.000.",
            "El peso no puede superar las 110 libras o 50 kilogramos. Pregunte a su agente.",
            "La sumatoria de todas las medidas no puede exceder las 118″ o 3 metros, o que uno de sus lados supere las 59″ o 1,50 metros.",
            "Que no incluya publicaciones que atenten contra la moral y/o buenas costumbres, narcóticos, drogas no autorizadas o mercancía cuya importación esté prohibida. Que no incluya mercancías sobre las cuales existan restricciones legales o administrativas para su importación.",
          ],
        ],
      },
      {
        id: "recomendaciones",
        title: "Recomendaciones especiales",
        lists: [
          [
            "Todo el contenido de su envío, sin excepción, debe estar declarado; no se puede omitir información, ya que sería causal de decomiso o aprehensión de su carga por parte de la DIAN (artículo 232, Decreto 2685 de 1999).",
            "El envío de TV y/o monitores es bajo la responsabilidad y autorización escrita del cliente; Box Express y su compañía de seguros no se hacen responsables por el daño físico que en el transporte internacional pueda experimentar.",
            "La consolidación de paquetes debe cumplir con las restricciones de peso, cantidad, valor declarado y medidas autorizadas para envíos courier.",
          ],
        ],
        docs: [{ label: "Condiciones para el envío de televisores y monitores (PDF)", href: "/documents/condiciones/condiciones-envio-televisores.pdf" }],
      },
      {
        id: "tiempos",
        title: "Frecuencia y tiempos de entrega",
        lists: [
          [
            "Vuelos diarios desde Estados Unidos (Miami) hacia Colombia (Bogotá).",
            "Servicio Next Day: 24 horas a Bogotá y 48 horas a ciudades principales.",
            "Servicio Second Day: 48 horas a Bogotá y 72 horas a ciudades principales.",
            "Servicio courier regular: de 4 a 6 días hábiles desde Miami.",
          ],
        ],
        note: "Nota: los destinos de re-expedición o rutas especiales dependen de la frecuencia de salida del re-expedidor; el tiempo de entrega después de su llegada a Colombia es de 4 a 6 días hábiles.",
      },
      {
        id: "cobertura",
        title: "Cobertura nacional e internacional",
        paragraphs: [
          "Cobertura a nivel nacional: abarca las principales capitales y municipios de los departamentos colombianos.",
          "Cobertura a nivel internacional: para las exportaciones de tráfico postal se extiende a más de 20 países a nivel mundial, a través de un aliado estratégico.",
        ],
      },
      {
        id: "rastreo",
        title: "Seguimiento o rastreo",
        paragraphs: [
          "BoxEx dispone de medios tecnológicos que permiten actualizar el estado de la carga en su tránsito a través del portal. El cliente podrá realizar el seguimiento o rastreo de sus envíos con el número de guía asignado, el cual se encuentra debajo del código de barras de su recibo.",
        ],
        link: { label: "Rastrear mi envío", href: "/rastreo" },
      },
    ],
  },
  {
    id: "restricciones",
    title: "Artículos restringidos",
    summary: "Qué no puedes enviar, en general y por país de destino.",
    items: [
      {
        id: "restringidos",
        title: "Artículos restringidos (Colombia)",
        lists: [
          [
            "Cargas peligrosas, inflamables, corrosivas, aerosoles, radioactivas, armas de cualquier clase, vestimenta o artículos de uso oficial o militar, videos o literatura pornográfica, medicinas, alimentos, animales vivos o muertos, artículos de seguridad, desechos orgánicos, hospitalarios, licores y otros que contemple la autoridad aeroportuaria, policial y/o aduanera.",
          ],
          [
            "Joyas, piedras finas, metales preciosos, monedas, títulos valores, tarjetas de crédito/débito, dinero en efectivo, artículos considerados patrimonio histórico o cultural, antigüedades, obras de arte, objetos artísticos.",
          ],
          ["Alucinógenos o cualquier otro tipo de sustancias prohibidas."],
        ],
        note: "Consulta el documento con restricciones internacionales.",
        docs: [{ label: "Artículos restringidos, todos los países (PDF)", href: "/documents/condiciones/articulos-restringidos-todos-los-paises.pdf" }],
      },
      {
        id: "venezuela",
        title: "Restricciones generales para Venezuela",
        lists: [
          [
            "Cargas peligrosas, inflamables, corrosivas, aerosoles, radioactivas, armas de cualquier clase, vestimenta o artículos de uso oficial o militar, videos o literatura pornográfica, alimentos, animales vivos o muertos, artículos de seguridad, desechos orgánicos, hospitalarios, licores y otros que contemple la autoridad aeroportuaria, policial y/o aduanera.",
          ],
          [
            "Joyas, piedras finas, metales preciosos, monedas, títulos valores, tarjetas de crédito/débito, dinero en efectivo, artículos considerados patrimonio histórico o cultural, antigüedades, obras de arte, objetos artísticos.",
          ],
          ["Alucinógenos o cualquier otro tipo de sustancias prohibidas."],
        ],
      },
      {
        id: "mexico",
        title: "Restricciones generales para México",
        lists: [
          [
            "Cargas peligrosas, inflamables, corrosivas, aerosoles, radioactivas, armas de cualquier clase, vestimenta o artículos de uso oficial o militar, videos o literatura pornográfica, alimentos, animales vivos o muertos, artículos de seguridad, desechos orgánicos, hospitalarios, licores y otros que contemple la autoridad aeroportuaria, policial y/o aduanera.",
          ],
          [
            "Joyas, piedras finas, metales preciosos, monedas, títulos valores, tarjetas de crédito/débito, dinero en efectivo, artículos considerados patrimonio histórico o cultural, antigüedades, obras de arte, objetos artísticos.",
          ],
          ["Alucinógenos o cualquier otro tipo de sustancias prohibidas."],
        ],
      },
      {
        id: "guatemala",
        title: "Restricciones generales para Guatemala",
        lists: [
          [
            "Cualquier material inflamable, corrosivo o explosivo, producto con alcohol como su primer ingrediente, productos de limpieza, fuegos artificiales y pólvora, gas, gas lacrimógeno o de pimienta, encendedores.",
          ],
          [
            "Armas de fuego y municiones, veneno, envases a presión, herramientas que funcionen con gas, productos perecederos, drogas, máquinas para tatuajes, animales vivos o disecados.",
          ],
          ["Mercancías con un valor de $1000.00 o más: se realiza un proceso formal de aduanas (costo adicional por trámites y almacenaje)."],
        ],
      },
    ],
  },
  {
    id: "costos",
    title: "Impuestos, pagos y costos",
    summary: "Impuestos de importación, reajustes de valor, formas de pago y costos adicionales.",
    items: [
      {
        id: "impuestos",
        title: "Impuestos",
        paragraphs: [
          "La importación de bienes mediante envíos o entregas urgentes está exenta de impuestos cuando su valor declarado es hasta USD $50; si el valor se encuentra entre USD $50,01 y USD $200, se aplica el 19 % de IVA; y cuando supera los USD $200, se causa el 19 % de IVA junto con un 10 % de arancel.",
          "Todos los envíos quedan sujetos a verificación de aduana.",
        ],
        docs: [{ label: "Decreto Legislativo 1474: medidas tributarias (PDF)", href: "/documents/condiciones/decreto-legislativo-1474-medidas-tributarias.pdf" }],
      },
      {
        id: "pagos",
        title: "Formas de pago",
        lists: [
          [
            "Consignación en Banco de Occidente (Colombia)",
            "Botón PSE (Colombia)",
            "Punto vía Baloto (Colombia)",
            "PayPal",
            "Zelle Transfer",
            "Blackstone",
          ],
        ],
        link: { label: "Ir a pagos", href: "/pagos" },
      },
      {
        id: "reajuste",
        title: "Reajuste o propuesta de valor",
        paragraphs: [
          "Según el artículo 128 del Decreto 2685/99 se dará lugar a un reajuste de su valor cuando el inspector de aduana considere que el valor declarado es inferior al valor real de la mercancía. Dentro de los cinco (5) días siguientes a la práctica de dicha diligencia, el cliente puede presentar los documentos que acrediten que el valor declarado se ajusta a las normas de valoración o corregir la declaración en la forma prevista en el acta de inspección. Si no está de acuerdo, puede realizar un derecho de petición, en el cual deberá presentar los siguientes documentos:",
        ],
        lists: [["Fotocopia de la cédula del destinatario.", "Copia de la factura del artículo.", "Recibo de pago."]],
        note: "Importante: el derecho de petición no procederá si no cumple con los requisitos exigidos para la modalidad de tráfico postal o envíos urgentes.",
      },
      {
        id: "pago-reajuste",
        title: "Pago del reajuste o propuesta de valor",
        paragraphs: [
          "Después de notificado el reajuste al cliente, y para poder finalizar el trámite de importación de su envío según el Estatuto Aduanero Colombiano (Decreto 2685 de 1999) por concepto de IVA y arancel, se deberá cancelar dicho valor dentro del mismo mes que diera lugar al reajuste. Después de vencida la primera fecha contará con 30 días adicionales para legalizar su envío mediante el pago del 15 % adicional por concepto de rescate de la mercancía, además de los gastos de almacenamiento que se hayan causado (artículo 231, Decreto 2685 de 1999). Transcurridos los términos establecidos en la ley sin que la mercancía se hubiere legalizado, esta será procesada como abandono y la Dirección de Impuestos y Aduanas Nacionales podrá disponer de la misma por ser de propiedad de la Nación.",
        ],
      },
      {
        id: "adicionales",
        title: "Costos adicionales",
        lists: [
          [
            "Bodegaje: los paquetes que ingresen a la bodega de Miami tendrán los primeros 20 días gratis de almacenamiento; posterior a este tiempo se cobrará $20,00 por mes.",
            "Devolución de paquetes IN/OUT: en caso de que la carga no cumpla con los requisitos exigidos por la DIAN o que el cliente decida retirar su paquete, tendrá un costo de USD $20,00.",
            "Reempaque: la consolidación de hasta tres (3) paquetes es gratis; después del tercer paquete se cobra USD $1 por paquete reempacado.",
            "División: se cobra USD $1 por cada paquete dividido.",
          ],
        ],
      },
    ],
  },
  {
    id: "seguro",
    title: "Seguro y mercancía",
    summary: "Cobertura del seguro, mercancía en abandono y autorización publicitaria.",
    items: [
      {
        id: "seguro",
        title: "Seguro",
        lists: [
          [
            "BoxEx será responsable por el pago del seguro en caso de pérdida total de la caja de acuerdo al valor asegurado por el cliente, con un monto máximo hasta USD $500.",
            "El seguro solo ampara el valor asegurado de la carga y no el valor declarado, excluyendo el valor del flete.",
            "El seguro no cubre averías o pérdidas parciales; solo cubre falta de entrega total de la caja.",
            "El reclamo solo se puede presentar dentro de los 3 días hábiles siguientes al recibo del envío.",
            "El seguro no cubre mercancía no declarada o manifestada por el remitente.",
            "El cliente da fe de que lo declarado en la guía de transporte es lo correcto y no habrá lugar a un reclamo por mercancía no manifestada o asegurada.",
            "El seguro no cubre daños o averías en artículos clasificados como delicados, tales como vidrio, porcelana y productos similares. Estos elementos deben contar con un embalaje adecuado y viajan exclusivamente bajo la responsabilidad del cliente.",
          ],
        ],
      },
      {
        id: "abandono",
        title: "Mercancía en abandono",
        paragraphs: [
          "El cliente deberá notificar la llegada de su carga a BoxEx para su instrucción de despacho; si pasados sesenta (60) días calendario no se ha recibido dicha notificación ni el pago del valor del envío previamente informado, BoxEx declarará la carga en abandono.",
          "Debido a que los paquetes cumplieron el tiempo máximo de permanencia en bodega, una vez cumplido el tiempo la carga será entregada al área correspondiente para el control y abandono de los mismos, y no se encontrará disponible para despacharse en un futuro.",
        ],
      },
      {
        id: "publicidad",
        title: "Información publicitaria y/o promocional",
        paragraphs: [
          "El cliente autoriza a Box Express el envío de publicidad y/o promociones a través de mensajes de texto, correo electrónico, llamada telefónica, impresos o información en la guía.",
        ],
      },
    ],
  },
  {
    id: "datos",
    title: "Protección de datos personales",
    summary: "Cómo trata Boxex tu información personal.",
    items: [
      {
        id: "datos",
        title: "Política de protección y privacidad de datos personales",
        paragraphs: [
          "BOXEXPRESS COURIER S.A.S., en cumplimiento de lo dispuesto por la Ley 1581 de 2012, que regula la recolección y tratamiento de los datos de carácter personal y establece las garantías legales que deben cumplir todas las personas en Colombia para el debido tratamiento de dicha información, expide las siguientes políticas y procedimientos que desarrollan la seguridad de la información para el tratamiento de datos personales dentro de la organización.",
        ],
        docs: [{ label: "Política de tratamiento de datos personales (PDF)", href: "/documents/legal/politica-tratamiento-datos-personales.pdf" }],
      },
    ],
  },
]

export const contractDoc: DocLink = {
  label: "Contrato de prestación de servicios postales (PDF)",
  href: "/documents/condiciones/contrato-prestacion-servicios-postales.pdf",
}
