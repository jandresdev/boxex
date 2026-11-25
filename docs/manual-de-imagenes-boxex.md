---
title: "Manual de imágenes del sitio web Boxex"
subtitle: "Tamaños, formatos y zonas seguras para crear o reemplazar cada imagen"
lang: es-CO
---

# 1. Cómo usar este manual

Este manual lista **todas las imágenes que usa el sitio**, con el tamaño exacto en que se muestran y el tamaño con el que debe entregarse cada una.

**Regla de oro:** si la nueva imagen conserva **el mismo nombre de archivo y la misma proporción**, se reemplaza sin tocar el código. Si cambia la proporción, avisar para ajustar el diseño.

| Concepto | Qué significa |
|---|---|
| **Tamaño recomendado** | Medida en píxeles con la que se debe entregar. Es el doble (2x) de lo que se ve en pantalla, para que se vea nítida en pantallas de alta resolución (Retina). |
| **Mínimo aceptable** | Por debajo de esto la imagen se verá borrosa en pantallas grandes. |
| **Proporción** | Relación ancho:alto. Ejemplo: 16:9 es una imagen horizontal de cine. |
| **Zona segura** | Parte de la imagen que nunca se recorta. El sitio recorta automáticamente los bordes según el dispositivo; lo importante (personajes, caras, logos) debe quedar dentro de la zona segura. |
| **Fondo transparente** | La imagen no lleva fondo (formato WebP o PNG con canal alfa). Se usa en personajes y logos. |

## Reglas generales de entrega

1. **Formato:** WebP (calidad 78–82) para fotos e ilustraciones; PNG/WebP con transparencia para personajes y pasos; SVG para el logo si existe.
2. **Peso:** hero ≤ 250 KB, ilustraciones de servicios ≤ 150 KB, personajes ≤ 80 KB, logos ≤ 40 KB.
3. **Espacio de color:** sRGB. Sin marcas de agua ni texto incrustado (el texto lo pone el sitio, así se traduce y se actualiza sin rehacer la imagen).
4. **Logo de Boxex:** debe aparecer **una sola vez y sin deformar** en el pecho de cada personaje. Las cajas se dibujan únicamente con el logo de Boxex, sin franjas.
5. **Nombre del archivo:** en minúsculas, sin tildes ni espacios, exactamente como figura en este manual.

# 2. Resumen de medidas

| # | Grupo | Archivos | Entregar a | Proporción | Formato |
|---|---|---|---|---|---|
| 1 | Hero de cada página | 16 | **2560 × 1440 px** | 16:9 | WebP |
| 2 | Promociones del carrusel del inicio | 4 (por campaña) | **2560 × 1440 px** | 16:9 | WebP |
| 3 | Video y portada del inicio | 2 | **1920 × 1080 px** (video) / **1920 × 1080 px** (portada) | 16:9 | MP4 / WebP |
| 4 | Ilustraciones de servicios | 6 | **1600 × 1200 px** | 4:3 | WebP |
| 5 | Ilustración "De tus manos. A su puerta." | 1 | **1200 × 900 px** | 4:3 | WebP |
| 6 | Casillero: imagen principal | 1 | **900 × 1125 px** | 4:5 | WebP |
| 7 | Casillero: 8 pasos | 8 | **600 × 490 px** | ≈ 1,22:1 | WebP/PNG transparente |
| 8 | Personajes con disfraz (cortina y encuesta) | 4 | ver sección 3.8 | libre | WebP transparente |
| 9 | Personaje que sigue el cursor | 1 | **224 × 199 px** | ≈ 1,13:1 | WebP transparente |
| 10 | Logos de Boxex | 2 | SVG o PNG ≥ 760 px de ancho | 3,05:1 | SVG / PNG transparente |
| 11 | Logos de medios de pago | 3 | alto ≥ 200 px | libre | WebP |
| 12 | Ícono del sitio (favicon) | 1 | 16, 32 y 48 px | 1:1 | ICO |

# 3. Detalle por grupo

## 3.1 Hero de cada página (16 imágenes)

Es la imagen de fondo de la cabecera de cada página interna. Ocupa **todo el ancho de la pantalla** y se ve detrás del título, que va a la izquierda sobre un degradado azul oscuro.

| Archivo (`/public/heroes/`) | Página donde se muestra | Tema sugerido |
|---|---|---|
| `servicios.webp` | Servicios y fichas de cada servicio | Personajes con servicios de envío |
| `mi-casillero.webp` | Casillero virtual | Casillero / compras en EE. UU. |
| `recogida.webp` | Recogida en casa | Recogida en la puerta de la casa |
| `destinos.webp` | Destinos y cada país | Mapa / Latinoamérica |
| `oficinas.webp` | Oficinas | Oficina Boxex |
| `ayuda.webp` | Ayuda y contacto | Atención al cliente |
| `aliados.webp` | Aliados (hágase nuestro agente) | Apretón de manos / alianza |
| `pagos.webp` | Pagos | Pago seguro |
| `condiciones.webp` | Condiciones y restricciones | Documentos / cajas |
| `legal.webp` | Aspectos legales | Balanza / documentos |
| `pqr.webp` | PQRs | Atención de reclamos |
| `encuesta.webp` | Encuesta de satisfacción | Estrellas / calificación |
| `rastreo.webp` | Rastreo | Seguimiento de paquete |
| `cotizar.webp` | Cotizar envío | Calculadora / cajas |
| `guias.webp` | Guías para enviar | Empaque y cajas |
| `nosotros.webp` | Nosotros | Familia Boxex |

**Medidas**

- **Tamaño recomendado:** 2560 × 1440 px (16:9). **Mínimo:** 1920 × 1080 px. Hoy están en 1344 × 752 px: se ven bien en computadores pequeños, pero pierden nitidez en pantallas grandes.
- **Cómo se muestra:** ancho completo; alto = 76 % de la altura de la pantalla en computador y 68 % en celular. En un monitor de 1920 × 1080 px la imagen se ve a ≈ 1920 × 820 px, es decir, **se recorta ≈ 11 % arriba y abajo**.

**Zona segura y composición**

- **Computador:** dejar el **55 % izquierdo tranquilo y oscuro** (ahí va el texto). Personajes y objeto principal en el **tercio derecho** y dentro del **80 % central de la altura**.
- **Celular:** el sitio muestra solo ≈ 38 % del ancho de la imagen, tomado entre el **45 % y el 83 % del ancho**. Los personajes deben quedar dentro de esa franja o se cortarán.
- Sin texto incrustado.

## 3.2 Promociones del carrusel del inicio (4 imágenes por campaña)

Cada diapositiva del carrusel del inicio es una imagen de fondo a pantalla completa; el sitio escribe encima el título, las tarifas y los botones.

| Archivo (`/public/promos/`) | Uso actual |
|---|---|
| `halloween-casillero.webp` | Casillero virtual |
| `halloween-30.webp` | Cajas de 30 libras |
| `halloween-40.webp` | Cajas de 40 libras |
| `halloween-50.webp` | Cajas de 50 libras |

**Medidas**

- **Tamaño recomendado:** 2560 × 1440 px (16:9). **Mínimo:** 1920 × 1080 px. Hoy: 1344 × 752 px.
- **Cómo se muestra:** en computador cubre toda la cabecera (≈ 1,9:1 a 2,1:1; recorte vertical ≈ 15 %). En celular ocupa la **mitad superior (≈ 390 × 400 px, casi cuadrada)** y se recorta mostrando solo ≈ 54 % del ancho, anclado a la derecha (entre ≈ 39 % y 93 % del ancho).

**Zona segura:** personajes en el **40 % derecho** de la imagen, verticalmente centrados; lado izquierdo despejado (ahí van el texto y la tarjeta de tarifas). Sin texto ni precios dentro de la imagen.

> **Nota importante:** las 4 promociones de Halloween están programadas **hasta el 1 de noviembre de 2026**. Pasada esa fecha, el inicio muestra automáticamente el video de marca. Para publicar una campaña nueva se entregan 1 a 4 imágenes con estas medidas y la fecha de vigencia.

## 3.3 Video y portada del inicio

| Archivo | Medidas y formato | Notas |
|---|---|---|
| `/public/assets/hero-video.mp4` | **1920 × 1080 px**, MP4 (H.264), 24 fps, ≈ 10 s, sin audio, **≤ 8 MB** | Hoy pesa ≈ 7 MB. Debe verse bien recortado como el hero (zona segura de la sección 3.1). |
| `/public/assets/boxex-characters-hero.png` | **1920 × 1080 px**, convertir a **WebP ≤ 250 KB** | Es la portada del video y la imagen de respaldo de cualquier página sin hero. Hoy es un PNG de 1,8 MB (1672 × 941 px): conviene convertirlo. |

## 3.4 Ilustraciones de servicios (6 imágenes)

Se muestran en las tarjetas grandes de la página **Servicios**, una por servicio.

| Archivo (`/public/servicios/`) | Servicio |
|---|---|
| `envios-internacionales.webp` | Envíos internacionales |
| `recogida-en-casa.webp` | Recogida en casa |
| `casillero-virtual.webp` | Casillero virtual |
| `next-day-second-day.webp` | Next Day / Second Day |
| `exportaciones.webp` | Exportaciones |
| `importaciones.webp` | Importaciones |

**Medidas**

- **Tamaño recomendado:** 1600 × 1200 px (4:3). **Mínimo:** 1168 × 880 px (el tamaño actual).
- **Cómo se muestra:** la imagen llena la mitad derecha de la tarjeta (≈ 590 × 560 px en computador, casi cuadrada), 4:3 en tableta y 16:9 en celular. Además se agranda un 12 % mientras se desplaza la página (efecto de profundidad).

**Zona segura:** todo lo importante dentro del **70 % central** (horizontal y vertical). Personaje principal centrado, con aire alrededor.

## 3.5 Ilustración "De tus manos. A su puerta." (inicio)

| Archivo | Medidas | Cómo se muestra |
|---|---|---|
| `/public/servicios/de-tus-manos-a-su-puerta.webp` | **1200 × 900 px** (4:3), mínimo 1040 × 780 px | Tarjeta de hasta 520 px de ancho, esquinas redondeadas; se recorta apenas por los bordes. Zona segura: 90 % central. |

## 3.6 Casillero virtual: imagen principal

| Archivo | Medidas | Cómo se muestra |
|---|---|---|
| `/public/casillero/casillero-virtual.webp` | **900 × 1125 px** (4:5, vertical) | Se ve completa (sin recorte) con esquinas redondeadas, hasta 448 px de ancho. Es la "tarjeta" del casillero con la dirección en Miami; no incluir texto que cambie (la dirección va en el sitio). |

## 3.7 Casillero virtual: 8 pasos

Ilustraciones pequeñas, **sin fondo (transparentes)**, sobre un fondo azul oscuro. Se muestran completas (sin recorte) en un recuadro de **≈ 288 × 144 px**.

| Archivo (`/public/casillero/`) | Paso |
|---|---|
| `paso-02.png` | 1. Regístrate |
| `paso-03.png` | 2. Compra en EE. UU. |
| `paso-04.png` | 3. Envía a tu casillero |
| `paso-05.png` | 4. Notifica tu compra |
| `paso-06.png` | 5. Recibimos |
| `paso-07.png` | 6. Liquida |
| `paso-08.png` | 7. Pagas |
| `paso-09.png` | 8. Despachamos y recibes |

- **Tamaño recomendado:** 600 × 490 px (≈ 1,22:1), fondo transparente, ≤ 100 KB. Actual: ≈ 487 × 398 px.
- El motivo debe quedar **centrado** y con un margen de ≈ 8 % por cada lado. Colores que contrasten con azul oscuro. (Los nombres `paso-02` a `paso-09` son históricos; no existe `paso-01`.)

## 3.8 Personajes con disfraz

Imágenes **recortadas, con fondo transparente**. Se usan en la cortina de transición entre páginas y en la encuesta.

| Archivo (`/public/characters/`) | Actual | Entregar a | Dónde se ve |
|---|---|---|---|
| `boxy-halloween-cutout.webp` | 410 × 365 px | **800 × 712 px** | Cortina (alto 128–160 px); encuesta (64–80 px); |
| `boxella-halloween-cutout.webp` | 347 × 370 px | **800 × 853 px** | Cortina (alto 128–160 px) |
| `boxyta-halloween-cutout.webp` | 406 × 456 px | **800 × 899 px** | Cortina (alto 128–160 px) |
| `familia-halloween-cutout.webp` | 1457 × 640 px | **1680 × 738 px** | Cortina (alto 112–144 px); pantalla de gracias de la encuesta (hasta 420 px de ancho) |

- Mantener la proporción de cada personaje; ≤ 80 KB; bordes limpios, sin halo blanco.
- **Obligatorio:** logo de Boxex visible y completo en la barriguita; ojos originales del personaje.
- Cada página usa un personaje distinto; si cambia el tema (por ejemplo, Navidad), se entregan estos mismos 4 archivos con el nuevo disfraz.

## 3.9 Personaje que sigue el cursor

| Archivo | Actual | Entregar a | Cómo se muestra |
|---|---|---|---|
| `/public/characters/boxy-cutout.webp` | 800 × 709 px | **224 × 199 px** (4x) es suficiente | Ancho fijo de **56 px** junto al cursor del mouse (solo computadores). Pose y expresión legibles en miniatura. Fondo transparente. |

## 3.10 Logos de Boxex

| Archivo | Actual | Entregar a | Dónde se ve |
|---|---|---|---|
| `/public/logo.png` | 736 × 241 px | **SVG** (preferido) o PNG transparente ≥ 600 × 197 px | Encabezado (alto 44–48 px), menú móvil, pie de página (47 px) y tarjeta del casillero (32 px) |
| `/public/logo-white.png` | 849 × 244 px | **SVG** o PNG ≥ 760 × 218 px | Cortina de transición: logo blanco, 240 px de ancho en celular y 380 px en computador. Solo el logo, en blanco, sobre transparente. |

## 3.11 Logos de medios de pago (Colombia)

Se muestran dentro de tarjetas de 160 px de alto, con un alto máximo de 96 px y hasta 80 % del ancho.

| Archivo (`/public/pagos/`) | Actual | Recomendado |
|---|---|---|
| `occidente.webp` | 1155 × 243 px | alto ≥ 200 px (se conserva) |
| `pse.webp` | 240 × 240 px | **400 × 400 px** |
| `baloto.webp` | 877 × 311 px | alto ≥ 200 px (se conserva) |

Usar los logos oficiales de cada marca, sin deformarlos.

## 3.12 Ícono del sitio (favicon)

| Archivo | Medidas |
|---|---|
| `/app/favicon.ico` | Archivo ICO con 3 tamaños: **16 × 16, 32 × 32 y 48 × 48 px**. Diseño simple y legible a 16 px (por ejemplo, la "X" dorada o la caja). |

# 4. Imágenes que no vienen del sitio

- **Banderas de los países:** se cargan automáticamente de un servicio externo (flagcdn.com); no hay que crearlas.
- **Mapa de oficinas:** lo genera el sitio (OpenFreeMap); no requiere imágenes.

# 5. Imágenes recomendadas que hoy no existen

Estas piezas **no están en el sitio**; se sugieren para mejorar cómo se ve Boxex al compartir el enlace y al instalar el sitio en el celular.

| Pieza | Medidas | Uso |
|---|---|---|
| Imagen para compartir (Open Graph) | **1200 × 630 px**, JPG/PNG, ≤ 300 KB | Vista previa del enlace en WhatsApp, Facebook, LinkedIn. Logo y mensaje centrados (zona segura: 1000 × 500 px). |
| Ícono de Apple | **180 × 180 px**, PNG sin transparencia | Al guardar el sitio en la pantalla de inicio del iPhone. |
| Íconos de aplicación | **192 × 192 y 512 × 512 px**, PNG | Android / instalación como aplicación web. |
| Hero propio por país (opcional) | **2560 × 1440 px** (16:9), como en 3.1 | Hoy las 11 páginas de país reutilizan `destinos.webp`; un hero por país mejora la experiencia. |

# 6. Archivos que hoy no se usan

Pueden eliminarse o reutilizarse; el sitio no los muestra.

- `/public/characters/`: `boxy.webp`, `boxella.webp`, `boxyta.webp`, `familia-boxex.webp`, `boxella-cutout.webp`, `boxyta-cutout.webp`, `familia-boxex-cutout.webp` (versiones sin disfraz).
- `/public/pagos/paypal.webp` (el logo de PayPal no se muestra hoy).
- Archivos de ejemplo del framework: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.

# 7. Lista de verificación antes de entregar

- [ ] Nombre de archivo exacto y en minúsculas.
- [ ] Tamaño y proporción según este manual.
- [ ] Peso dentro del límite; formato WebP / PNG / SVG indicado.
- [ ] Zona segura respetada (sujetos dentro del área indicada; texto a la izquierda libre en heros y promociones).
- [ ] Sin texto, precios ni teléfonos dentro de la imagen.
- [ ] Logo de Boxex una sola vez, completo y sin deformar en cada personaje.
- [ ] Cajas solo con el logo de Boxex, sin franjas.
- [ ] Personajes y logos con fondo transparente y bordes limpios.
- [ ] Probada la vista en un celular (recorte lateral) y en un monitor grande (recorte superior e inferior).

*Medidas verificadas contra el código del sitio y los archivos actuales (13 de octubre al 25 de noviembre de 2026). Las dimensiones "Entregar a" son recomendaciones técnicas (2x de la visualización); las "Actual" son las de los archivos hoy publicados.*
