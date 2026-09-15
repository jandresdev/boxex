# Boxex — Migración a Next.js: Topbar fijo + Sidebar de navegación

**Fecha:** 2026-09-15
**Estado:** Aprobado por el usuario en chat (brainstorming), pendiente de plan de implementación.
**Alcance de este spec:** únicamente el layout base (Topbar + Sidebar) del nuevo proyecto Next.js. El Hero y el resto de las páginas se abordan en specs posteriores.

## 1. Contexto

El sitio actual (`boxex-web`) es un generador estático en Python (`build.py` → `dist/`), sin ningún framework de JavaScript, documentado en detalle en el informe de auditoría de esta misma conversación (ver resumen en la sección 9). Se decidió reconstruir el sitio sobre Next.js, empezando por el Header (que se convierte en Topbar fijo + Sidebar) y dejando el Hero para una siguiente iteración.

Referencias de marca ya verificadas en la auditoría: azul `#011689`, dorado `#d6b36a` (contraste botón dorado ≈7.12:1, AAA). Público objetivo incluye migrantes jóvenes, familias establecidas, emprendedores y **adultos mayores (57–65 años)** — esto pesó directamente en la decisión de usar un drawer en móvil en vez de un sidebar fijo de difícil alcance con el pulgar.

## 2. Objetivo

Reemplazar el header actual (topbar de utilidades + fila con logo/nav/CTA) por:
- Una **franja azul superior fija** (topbar) con los enlaces de utilidad actuales.
- Un **sidebar izquierdo** que reemplaza el nav horizontal, colapsable a un rail de solo íconos, con logo arriba y CTA "Cotizar envío" anclado abajo.
- Comportamiento responsive: sidebar visible en escritorio, **drawer deslizable** en móvil.

No objetivos de este spec: contenido del Hero, migración de las demás 32 páginas, conexión real a Supabase, analítica, SEO/indexación (todo eso ya está documentado como pendiente en el informe de auditoría y se aborda en iteraciones futuras).

## 3. Decisiones ya tomadas (con el usuario, en brainstorming)

| Decisión | Resultado |
|---|---|
| Framework | **Next.js 15, App Router, TypeScript** (Vite descartado — no se combina con Next.js) |
| Estilos | **Tailwind CSS + shadcn/ui** (componente `sidebar` oficial como base) |
| Íconos | **lucide-react** |
| Comportamiento del sidebar en móvil | **Drawer deslizable** (no bottom-nav, no sidebar fijo colapsado) |
| Logo y CTA | Logo arriba del sidebar; CTA "Cotizar envío" anclado abajo del sidebar |
| Ubicación del proyecto Next.js | **Raíz del repo** (`D:\AA-Valley-Group\Boxex\boxex-web`), sin tocar `build.py`/`dist/`/`routes.json` existentes |
| Supabase | Cliente base creado (`lib/supabase/client.ts` + `.env.local.example`), **sin conectar** a ninguna funcionalidad todavía |

## 4. Arquitectura y estructura de archivos

```
app/
  layout.tsx              # <SidebarProvider> envolviendo <AppTopbar> + <AppSidebar> + <main>
  page.tsx                # home placeholder (Hero pendiente)
  globals.css              # tokens Tailwind: --blue, --gold, etc. tomados del CSS actual
components/
  layout/
    app-topbar.tsx         # franja azul fija superior
    app-sidebar.tsx        # sidebar (usa primitives de shadcn/ui: Sidebar, SidebarTrigger, SidebarMenu...)
    nav-items.ts           # fuente única de verdad del menú: [{ href, label, icon, section? }]
  ui/                       # primitivos generados por `shadcn add` (sidebar, button, sheet, tooltip, separator)
lib/
  supabase/
    client.ts              # cliente supabase-js, no usado aún
  utils.ts                 # helper cn() estándar de shadcn
.env.local.example          # NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
```

`nav-items.ts` es la única fuente de verdad del menú (hoy: Servicios, Destinos, Cómo funciona, Oficinas, Ayuda) para que el sidebar de escritorio, el drawer móvil y cualquier navegación futura (footer, breadcrumbs) lean de un solo lugar.

## 5. Comportamiento del Topbar

- `position: sticky; top: 0`, `z-index` por encima del contenido y del sidebar.
- Alto ≈40px, fondo `--blue` (#011689), texto blanco, tamaño de fuente pequeño (~12-13px, igual que hoy).
- Contenido: enlaces de utilidad actuales — "Rastrea tu envío", "Pagos", "Mi casillero ↗" — alineados a la derecha.
- En viewport móvil (<1024px), aparece a la izquierda el botón hamburguesa (`SidebarTrigger` de shadcn) que abre el drawer.

## 6. Comportamiento del Sidebar

**Escritorio (≥1024px):**
- Visible siempre, **contraído por defecto** (rail de solo íconos, ~56px); el usuario lo expande manualmente con el control de colapsar y el estado queda persistido por cookie.
- Logo de Boxex como header del sidebar (visible también en estado colapsado, como isotipo).
- Enlaces del nav como `SidebarMenu` vertical, usando `nav-items.ts`.
- Botón "Cotizar envío" (estilo `gold`, mismo componente de botón que el resto del sitio) anclado como footer del sidebar, siempre visible sin necesidad de scroll.
- Control de colapsar (`«`) en la parte superior: contrae el sidebar a **rail de solo íconos** (~56px). En ese estado, cada ícono muestra su etiqueta en un `Tooltip` al hacer hover/focus.
- El estado expandido/colapsado se persiste entre visitas vía cookie (comportamiento por defecto del componente `Sidebar` de shadcn — `SIDEBAR_COOKIE_NAME`).

**Móvil (<1024px):**
- El sidebar no se renderiza inline; se oculta por completo del flujo del layout.
- El botón hamburguesa del Topbar lo abre como **drawer** (`Sheet` deslizante desde la izquierda, con overlay).
- Cerrable con: tecla Escape, click/tap fuera del panel, o seleccionar un enlace de navegación.
- Foco atrapado dentro del drawer mientras está abierto (`role="dialog"`, manejado por el primitive `Sheet` de shadcn/Radix).

**Item activo:**
- Se resalta con borde izquierdo dorado (`--gold`) + fondo sutil (`bg-blue/5` o similar), análogo al subrayado dorado que usa hoy el nav horizontal.
- `aria-current="page"` en el `<a>` correspondiente a la ruta activa (usando `usePathname()` de Next.js).

## 7. Accesibilidad (requisitos verificables)

- Navegación 100% operable por teclado: `Tab`/`Shift+Tab` para recorrer enlaces, `Enter`/`Space` para activarlos, `Escape` cierra el drawer móvil.
- `aria-label` en: botón de colapsar sidebar, `SidebarTrigger` (hamburguesa), y el propio `<nav>`.
- `aria-current="page"` en el enlace activo.
- Contraste de color: se reutilizan los tokens ya auditados (`--blue`/`--gold`/blanco), con razón de contraste mínima AA verificada para texto de navegación; el botón "Cotizar envío" mantiene el mismo par de colores ya calculado en ≈7.12:1 (AAA) en la auditoría previa.
- El drawer móvil no debe permitir scroll del `body` detrás del overlay mientras está abierto (comportamiento estándar de `Sheet`/Radix, se verifica en pruebas manuales).
- Tooltips del rail de íconos deben ser accesibles por foco de teclado, no solo por hover.

## 8. Testing / verificación

Dado que es un proyecto Next.js nuevo (sin suite de tests previa):
- **Verificación manual en navegador** (Browser tool) tras cada componente: comprobar que el topbar queda fijo al hacer scroll, que el sidebar colapsa/expande correctamente, que el drawer se abre/cierra en viewport móvil (375px) y que el estado colapsado persiste al recargar.
- **Chequeo de accesibilidad de teclado:** recorrer todo el nav solo con teclado y confirmar foco visible en cada paso.
- **Chequeo de contraste:** validar visualmente que el texto sobre `--blue` y `--gold` sigue leyéndose con claridad (ya calculado matemáticamente en la auditoría previa; no se recalcula aquí salvo que cambien los tokens).
- **`next build`** debe completar sin errores de TypeScript antes de dar por terminada la tarea.

## 9. Referencia: informe de auditoría previo

Este spec se apoya en el informe de auditoría integral de Boxex (mismo hilo de conversación, turno anterior), que documentó: paleta y contraste verificados, ausencia de analítica conectada, 33 rutas actuales, público objetivo por segmento (incluye adultos mayores — motivo directo de la decisión de usar drawer en vez de sidebar fijo en móvil), y el estado del sitio productivo (`boxexpress.com`) vs. esta propuesta. No se repite aquí ese contenido; se referencia como contexto de decisión.

## 10. Fuera de alcance / próximos specs

- Hero (el usuario indicó explícitamente que lo definiremos después de este layout).
- Migración del resto de las 32 páginas/rutas.
- Conexión real de Supabase (tablas, auth, RLS).
- Analítica/tracking, SEO/indexación, i18n.
