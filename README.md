# Boxex — propuesta de rediseño

Esta versión es una propuesta privada y navegable basada en la información visible de `https://boxexpress.com/`, el cuestionario entregado por Boxex y el manual de marca recibido.

## Contenido

- 33 rutas estáticas: inicio, servicios, cada servicio, destinos, cada destino, cómo funciona, cotizar, rastreo, oficinas, ayuda, contacto, pagos, reclamaciones, condiciones, legal, aliados, nosotros y guías.
- Hero 3D con Three.js y logo público de Boxex.
- Recorrido de scroll con GSAP ScrollTrigger, pausa manual y compatibilidad con `prefers-reduced-motion`.
- Cotizador que prepara una consulta y la pasa a WhatsApp sin enviarla automáticamente.
- Rastreo enlazado al destino oficial de Boxex.
- Filtro por modalidad y buscador de oficinas.
- JSON-LD de organización, servicios, breadcrumbs y FAQ.

## Fuentes comprobadas

- Sitio actual: `https://boxexpress.com/`
- Servicios: `https://boxexpress.com/servicios-y-condiciones/`
- Oficinas y teléfonos: `https://boxexpress.com/consultas-y-asesor-de-envios/`
- Pagos: `https://boxexpress.com/pagos/`
- Centro legal: `https://boxexpress.com/centroaspectos-legales/`
- Cuestionario local y manual de marca local entregados por el cliente.

## Límites de contenido

Next Day/Second Day e importaciones aparecen como pendientes de revisión en el cuestionario y se mantienen fuera del portafolio principal. La propuesta no inventa tarifas, tiempos garantizados, reseñas ni cobertura adicional. El rastreo y pagos continúan en los sistemas oficiales.

## Validación local

- 33 archivos `index.html` responden con HTTP 200 en el servidor local.
- `app.js`, `scene.js`, GSAP y ScrollTrigger pasan `node --check`.
- Hero 3D carga un canvas y no muestra errores de consola.
- Cotización prepara URL de WhatsApp con origen, destino y contenido.
- Filtro `Terrestre` muestra México y oculta Colombia.

## Publicación

La versión 1 quedó publicada en modo privado en:

`https://boxex-courier-redesign.jdeveloper2025.chatgpt.site`

El sitio solicita iniciar sesión con ChatGPT para proteger la vista de revisión. La documentación puede abrirse desde el repositorio local sin iniciar sesión.
