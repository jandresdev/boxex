# Topbar fijo + Sidebar colapsable — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el header estático actual de Boxex por un layout Next.js con una franja azul fija (Topbar) y un sidebar izquierdo colapsable a rail de íconos (drawer en móvil), como base para el resto de la migración.

**Architecture:** Proyecto Next.js 15 (App Router, TypeScript) creado en la raíz del repo, con Tailwind CSS + shadcn/ui como sistema de diseño. El componente `Sidebar` oficial de shadcn/ui (basado en Radix `Sheet`) ya resuelve nativamente el colapso a rail de íconos, el modo drawer en móvil y la persistencia por cookie — por eso el trabajo real es: 1) scaffolding, 2) instalar esos primitives, 3) componer `AppSidebar`/`AppTopbar` sobre ellos con los datos y la marca de Boxex, 4) ajustar el breakpoint móvil de 768px (default de shadcn) a 1024px (requisito del spec).

**Tech Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · lucide-react · @supabase/supabase-js (sin conectar aún)

**Spec:** [docs/superpowers/specs/2026-09-15-header-sidebar-migration-design.md](../specs/2026-09-15-header-sidebar-migration-design.md)

## Global Constraints

- Framework: Next.js 15, App Router, TypeScript (no Pages Router, no Vite).
- Estilos: Tailwind CSS + shadcn/ui (componente `sidebar` oficial como base, no reconstruido a mano).
- Íconos: lucide-react.
- Breakpoint móvil/escritorio: **1024px** (no el default de 768px de shadcn — debe ajustarse explícitamente).
- Colores de marca: `--brand-blue: #011689`, `--brand-gold: #d6b36a`.
- Copy del CTA: exactamente **"Cotizar envío"**, enlazando a `/cotizar`.
- Ubicación del proyecto: raíz del repo (`D:\AA-Valley-Group\Boxex\boxex-web`).
- **No modificar ni borrar:** `build.py`, `dist/`, `routes.json`, `README.md` existente, `.claude/`, `.openai/`, `skills-lock.json`.
- Móvil: el sidebar se abre como drawer deslizable (no bottom-nav, no sidebar fijo colapsado).
- Sidebar en escritorio: expandido por defecto, logo arriba, CTA anclado abajo, estado persistido en cookie.
- Supabase: cliente base creado (`lib/supabase/client.ts` + `.env.local.example`), sin conectarlo a ninguna funcionalidad todavía.
- Verificación de cada tarea: `npm run build` debe compilar sin errores de TypeScript; no hay suite de tests automatizados en este proyecto todavía, así que las tareas de UI se verifican con el Browser tool (navegación, resize, lectura de accesibilidad) según se detalla en cada tarea.

---

### Task 1: Scaffold del proyecto Next.js

**Files:**
- Create: proyecto completo generado por `create-next-app` en la raíz del repo (`package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `public/`, `.gitignore`, config de Tailwind — el nombre exacto del archivo de config de Tailwind depende de la versión instalada, v3 usa `tailwind.config.ts`, v4 usa solo CSS en `app/globals.css`).
- No tocar: `build.py`, `dist/`, `routes.json`, `README.md`, `docs/`, `.claude/`, `.openai/`, `skills-lock.json`, `.git/`.

**Interfaces:**
- Produces: proyecto Next.js ejecutable con `npm run dev` / `npm run build` en la raíz del repo. Ninguna tarea posterior depende de una API de código todavía, solo de que el proyecto exista y compile.

- [ ] **Step 1: Generar el scaffold en un directorio temporal**

Se genera en un directorio temporal (no directamente en la raíz del repo) porque `create-next-app` rechaza o sobreescribe directorios no vacíos, y la raíz ya tiene `README.md`, `build.py`, `.git`, etc.

```bash
TMPDIR=$(mktemp -d)
npx --yes create-next-app@latest "$TMPDIR/scaffold" \
  --typescript --tailwind --eslint --app --no-src-dir \
  --import-alias "@/*" --use-npm --yes
echo "$TMPDIR" > /tmp/boxex-scaffold-tmpdir.txt
```

Si algún flag no es reconocido por la versión instalada (`error: unknown option`), ejecuta `npx create-next-app@latest --help`, ubica el flag equivalente actual y repite el comando — el resultado esperado no cambia: TypeScript + Tailwind + App Router + ESLint + sin carpeta `src/` + alias `@/*`.

- [ ] **Step 2: Verificar que el scaffold compiló**

Run: `cd "$TMPDIR/scaffold" && npm run build`
Expected: termina con `✓ Compiled successfully` y código de salida 0.

- [ ] **Step 3: Mover el scaffold a la raíz del repo, sin pisar archivos existentes**

```bash
cd "$TMPDIR/scaffold"
rm -rf node_modules .git README.md
cp -r . "D:/AA-Valley-Group/Boxex/boxex-web/.claude/worktrees/header-sidebar-migration/"
cd "D:/AA-Valley-Group/Boxex/boxex-web/.claude/worktrees/header-sidebar-migration"
git status --porcelain
```

Expected en `git status`: aparecen como nuevos `package.json`, `tsconfig.json`, `next.config.ts`, `app/`, `public/`, `.gitignore`, `next-env.d.ts`, y el archivo de config de Tailwind (v3 o v4 según la versión instalada). **No debe aparecer ningún cambio sobre** `build.py`, `dist/`, `routes.json`, `README.md`, `docs/`, `.claude/`, `.openai/`, `skills-lock.json` — si alguno de esos aparece modificado, detente y revisa qué se sobreescribió antes de continuar.

- [ ] **Step 4: Instalar dependencias y verificar build**

```bash
npm install
npm run build
```

Expected: `npm run build` termina con código de salida 0.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts app public .gitignore tailwind.config.ts postcss.config.mjs 2>/dev/null
git commit -m "Scaffold Next.js 15 project (App Router, TypeScript, Tailwind)"
```

(Si `tailwind.config.ts` no existe porque el scaffold usa Tailwind v4 basado en CSS, el `2>/dev/null` evita que `git add` falle por un archivo inexistente — revisa con `git status` que todo lo generado quedó agregado.)

---

### Task 2: Instalar shadcn/ui y los primitives del sidebar

**Files:**
- Create: `components.json` (config de shadcn), `lib/utils.ts` (helper `cn()`), `components/ui/sidebar.tsx`, `components/ui/button.tsx`, `components/ui/sheet.tsx`, `components/ui/tooltip.tsx`, `components/ui/separator.tsx`, `hooks/use-mobile.ts` (o `.tsx`, según versión del CLI).
- Modify: `hooks/use-mobile.ts` (o el archivo equivalente que genere el CLI) — cambiar el breakpoint móvil de 768 a 1024.

**Interfaces:**
- Consumes: proyecto Next.js del Task 1.
- Produces: `Sidebar`, `SidebarProvider`, `SidebarInset`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarTrigger` exportados desde `@/components/ui/sidebar`; `Button` desde `@/components/ui/button`. Estos son los componentes que consumen los Tasks 4 y 5.

- [ ] **Step 1: Inicializar shadcn/ui**

```bash
npx --yes shadcn@latest init -d
```

El flag `-d` acepta los valores por defecto (evita prompts interactivos: estilo "New York" o "Default", color base, etc.). Expected: se crea `components.json` y `lib/utils.ts`.

- [ ] **Step 2: Agregar los componentes necesarios**

```bash
npx --yes shadcn@latest add sidebar button sheet tooltip separator
```

Expected: aparecen `components/ui/sidebar.tsx`, `components/ui/button.tsx`, `components/ui/sheet.tsx`, `components/ui/tooltip.tsx`, `components/ui/separator.tsx`, y un hook `use-mobile` (busca el archivo con `find . -iname "use-mobile*" -not -path "*/node_modules/*"` si no está en `hooks/`).

- [ ] **Step 3: Ajustar el breakpoint móvil de 768px a 1024px**

Abre el archivo del hook (`hooks/use-mobile.ts` o el que haya encontrado el `find` del paso anterior) y busca:

```ts
const MOBILE_BREAKPOINT = 768
```

Reemplázalo por:

```ts
const MOBILE_BREAKPOINT = 1024
```

Esto es lo que hace que el sidebar pase a modo drawer exactamente en el mismo punto (1024px) que usan las clases `lg:` de Tailwind en el resto de este plan — sin este cambio, el sidebar y el topbar quedarían desincronizados entre 768px y 1024px.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: código de salida 0.

- [ ] **Step 5: Commit**

```bash
git add components.json lib/utils.ts components/ui hooks package.json package-lock.json 2>/dev/null
git commit -m "Add shadcn/ui sidebar primitives, set mobile breakpoint to 1024px"
```

---

### Task 3: Tokens de marca Boxex en Tailwind

**Files:**
- Modify: `app/globals.css` (Tailwind v4) **o** `tailwind.config.ts` (Tailwind v3) — usa el que exista según lo que generó el Task 1.

**Interfaces:**
- Produces: utilidades Tailwind `bg-brand-blue`, `text-brand-blue`, `border-brand-blue`, `bg-brand-gold`, `text-brand-gold`, `border-brand-gold`, disponibles para los Tasks 5 y 6.

- [ ] **Step 1: Verificar qué variante de Tailwind se generó**

```bash
ls tailwind.config.ts 2>/dev/null && echo "v3" || echo "v4 (o config inline)"
```

- [ ] **Step 2a: Si es Tailwind v4 (config basada en CSS)**

En `app/globals.css`, justo después de la línea `@import "tailwindcss";`, agrega:

```css
@theme inline {
  --color-brand-blue: #011689;
  --color-brand-gold: #d6b36a;
}
```

- [ ] **Step 2b: Si es Tailwind v3 (`tailwind.config.ts`)**

Dentro de `theme.extend.colors`, agrega:

```ts
colors: {
  "brand-blue": "#011689",
  "brand-gold": "#d6b36a",
},
```

- [ ] **Step 3: Verificar que las utilidades existen**

Crea un archivo temporal de prueba `app/__tmp-token-check/page.tsx`:

```tsx
export default function TmpTokenCheck() {
  return <div className="bg-brand-blue text-brand-gold p-4">check</div>
}
```

Run: `npm run build`
Expected: código de salida 0, sin advertencias de clase Tailwind no reconocida.

Luego borra el archivo de prueba:

```bash
rm -rf app/__tmp-token-check
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts 2>/dev/null
git commit -m "Add Boxex brand color tokens (brand-blue, brand-gold) to Tailwind"
```

---

### Task 4: Datos de navegación (`nav-items.ts`)

**Files:**
- Create: `components/layout/nav-items.ts`

**Interfaces:**
- Consumes: tipo `LucideIcon` de `lucide-react`.
- Produces: `navItems: NavItem[]` y `quoteCta: { href: string; label: string }`, consumidos por los Tasks 5 y 6.

- [ ] **Step 1: Crear el archivo de datos**

```ts
// components/layout/nav-items.ts
import type { LucideIcon } from "lucide-react"
import { Package, MapPin, Compass, Building2, HelpCircle } from "lucide-react"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { href: "/servicios", label: "Servicios", icon: Package },
  { href: "/destinos", label: "Destinos", icon: MapPin },
  { href: "/como-funciona", label: "Cómo funciona", icon: Compass },
  { href: "/oficinas", label: "Oficinas", icon: Building2 },
  { href: "/ayuda", label: "Ayuda", icon: HelpCircle },
]

export const quoteCta = {
  href: "/cotizar",
  label: "Cotizar envío",
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: código de salida 0 (el archivo no se usa todavía en ningún componente, así que solo se valida que compila como TypeScript válido).

- [ ] **Step 3: Commit**

```bash
git add components/layout/nav-items.ts
git commit -m "Add nav-items data module for sidebar navigation"
```

---

### Task 5: Componente `AppSidebar`

**Files:**
- Create: `components/layout/app-sidebar.tsx`
- Create: `public/logo.png` — copia el logo existente: `cp "dist/assets/logo.png" "public/logo.png"` (es un asset ya público del sitio actual, no contenido nuevo).

**Interfaces:**
- Consumes: `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarTrigger` de `@/components/ui/sidebar` (Task 2); `navItems`, `quoteCta` de `./nav-items` (Task 4).
- Produces: `export function AppSidebar()`, consumido por el Task 7 (`app/layout.tsx`).

- [ ] **Step 1: Copiar el logo a `public/`**

```bash
cp "dist/assets/logo.png" "public/logo.png"
```

- [ ] **Step 2: Crear el componente**

```tsx
// components/layout/app-sidebar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { navItems, quoteCta } from "./nav-items"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-2 py-1">
          <Link
            href="/"
            aria-label="Boxex, inicio"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="Boxex"
              width={28}
              height={28}
              className="shrink-0"
            />
            <span className="text-sm font-semibold text-brand-blue group-data-[collapsible=icon]:hidden">
              Boxex
            </span>
          </Link>
          <SidebarTrigger
            className="text-brand-blue hover:bg-brand-blue/10 group-data-[collapsible=icon]:mx-auto"
            aria-label="Contraer o expandir menú"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <nav aria-label="Navegación principal">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className="data-[active=true]:border-l-2 data-[active=true]:border-brand-gold data-[active=true]:bg-brand-blue/5"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </nav>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={quoteCta.label}
              className="bg-brand-gold text-brand-blue font-semibold hover:bg-brand-gold/90"
            >
              <Link href={quoteCta.href}>
                <ArrowRight />
                <span>{quoteCta.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
```

Nota de diseño: el CTA reutiliza `SidebarMenuButton` (no un `Button` aparte) a propósito — así hereda gratis el mismo comportamiento de colapso a ícono + tooltip que ya tienen los demás ítems del menú, en vez de reimplementar esa lógica.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: código de salida 0. (El componente aún no está montado en ningún layout, así que solo se valida que compila; el chequeo visual llega en el Task 7.)

- [ ] **Step 4: Commit**

```bash
git add components/layout/app-sidebar.tsx public/logo.png
git commit -m "Add AppSidebar component with brand styling and active-state highlighting"
```

---

### Task 6: Componente `AppTopbar`

**Files:**
- Create: `components/layout/app-topbar.tsx`

**Interfaces:**
- Consumes: `SidebarTrigger` de `@/components/ui/sidebar` (Task 2).
- Produces: `export function AppTopbar()`, consumido por el Task 7.

- [ ] **Step 1: Crear el componente**

```tsx
// components/layout/app-topbar.tsx
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

const utilityLinks = [
  { href: "/rastreo", label: "Rastrea tu envío" },
  { href: "/pagos", label: "Pagos" },
  { href: "https://clientes.boxexpress.com/app/", label: "Mi casillero ↗" },
]

export function AppTopbar() {
  return (
    <div className="sticky top-0 z-50 flex h-10 items-center gap-4 bg-brand-blue px-3 text-xs text-white md:px-4">
      <SidebarTrigger
        className="text-white hover:bg-white/10 hover:text-white lg:hidden"
        aria-label="Abrir menú de navegación"
      />
      <nav
        aria-label="Enlaces de utilidad"
        className="ml-auto flex items-center gap-4"
      >
        {utilityLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:underline"
            {...(link.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
```

`lg:hidden` oculta el trigger en ≥1024px porque ahí el sidebar ya está siempre visible (breakpoint `lg` de Tailwind = 1024px, coincide con el `MOBILE_BREAKPOINT` ajustado en el Task 2).

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: código de salida 0.

- [ ] **Step 3: Commit**

```bash
git add components/layout/app-topbar.tsx
git commit -m "Add AppTopbar component with sticky blue bar and mobile sidebar trigger"
```

---

### Task 7: Layout raíz — montar Topbar + Sidebar

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx` (placeholder)

**Interfaces:**
- Consumes: `SidebarProvider`, `SidebarInset` de `@/components/ui/sidebar` (Task 2); `AppSidebar` (Task 5); `AppTopbar` (Task 6).
- Produces: layout renderizado de extremo a extremo — última tarea que produce una interfaz consumida por otra (Task 8 no depende de esto).

- [ ] **Step 1: Reemplazar `app/layout.tsx`**

```tsx
// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppTopbar } from "@/components/layout/app-topbar"

export const metadata: Metadata = {
  title: "Boxex",
  description: "Envíos de Estados Unidos a Latinoamérica",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppTopbar />
            <main id="main">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Reemplazar `app/page.tsx` con un placeholder**

```tsx
// app/page.tsx
export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-brand-blue">
        Boxex — layout base listo
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Topbar fijo y sidebar de navegación implementados. El Hero llega en
        la próxima iteración.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: código de salida 0.

- [ ] **Step 4: Verificación visual — escritorio**

Usa el Browser tool:
1. `preview_start` con el dev server (`npm run dev`, puerto por defecto 3000).
2. `navigate` a `http://localhost:3000`.
3. `computer` con `action: screenshot`.

Expected: sidebar visible a la izquierda con logo arriba, 5 ítems de menú, botón dorado "Cotizar envío" anclado abajo; topbar azul fija arriba con los 3 enlaces de utilidad a la derecha; sin trigger de hamburguesa visible (viewport de escritorio).

- [ ] **Step 5: Verificación de colapso a rail de íconos**

1. `find` con query `"Contraer o expandir menú"` para ubicar el `SidebarTrigger` que quedó dentro de `SidebarHeader` (junto al logo).
2. Haz clic para colapsar.
3. `computer` con `action: screenshot`.

Expected: el sidebar se angosta a solo íconos, las etiquetas de texto desaparecen, y al hacer `hover` sobre un ícono aparece un tooltip con la etiqueta.

- [ ] **Step 6: Verificación responsive — móvil**

1. `resize_window` con `preset: "mobile"`.
2. `navigate` (recarga) a `http://localhost:3000`.
3. `computer` con `action: screenshot`.

Expected: no se ve el sidebar inline; se ve el topbar azul con el botón de hamburguesa visible a la izquierda.

4. `computer` clic en el botón de hamburguesa.
5. `computer` con `action: screenshot`.

Expected: se abre un panel deslizable desde la izquierda con overlay, mostrando el mismo contenido del sidebar (logo, 5 ítems, CTA).

6. `computer` con `action: key`, `text: "Escape"`.
7. `computer` con `action: screenshot`.

Expected: el drawer se cierra.

- [ ] **Step 7: Verificación de accesibilidad de teclado**

1. `resize_window` con `preset: "desktop"` (vuelve a escritorio).
2. `read_page` con `filter: "interactive"` sobre la página cargada.

Expected: cada enlace del sidebar aparece como elemento enfocable (`ref_N`); el enlace correspondiente a la ruta activa (si aplica) trae `aria-current="page"` en el árbol de accesibilidad.

- [ ] **Step 8: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "Wire AppTopbar and AppSidebar into root layout"
```

---

### Task 8: Cliente Supabase base (sin conectar)

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `.env.local.example`
- Modify: `.gitignore` — confirmar que incluye `.env*.local` (el scaffold de Next.js ya lo agrega por defecto; solo verificar, no duplicar).

**Interfaces:**
- Produces: `export const supabase` desde `@/lib/supabase/client` — no consumido por ninguna tarea de este plan; queda listo para specs futuros.

- [ ] **Step 1: Instalar el paquete**

```bash
npm install @supabase/supabase-js
```

- [ ] **Step 2: Crear el cliente**

```ts
// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

- [ ] **Step 3: Crear el ejemplo de variables de entorno**

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Guárdalo como `.env.local.example` (no `.env.local` — ese archivo no debe crearse ni commitearse porque llevaría credenciales reales).

- [ ] **Step 4: Confirmar que `.gitignore` ignora `.env*.local`**

```bash
grep -n "env" .gitignore
```

Expected: aparece una línea tipo `.env*.local` (la genera `create-next-app` por defecto). Si no aparece, agrégala.

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: código de salida 0. (El `!` en `createClient(...)` le dice a TypeScript que confíe en que la env var existe en runtime; con las variables vacías en build no truena porque no se ejecuta código que las lea en build time — solo se referencian dentro de `createClient`, que no se invoca hasta que algo importe este módulo en el cliente.)

- [ ] **Step 6: Commit**

```bash
git add lib/supabase/client.ts .env.local.example package.json package-lock.json
git commit -m "Add base Supabase client (not yet connected to any feature)"
```

---

### Task 9: Verificación final end-to-end

**Files:** ninguno nuevo — solo verificación.

**Interfaces:** consume el resultado de todos los tasks anteriores; no produce nada para tasks futuros de este plan (es el último).

- [ ] **Step 1: Build limpio completo**

```bash
rm -rf .next
npm run build
```

Expected: código de salida 0, sin warnings de TypeScript ni de ESLint relacionados a los archivos creados en este plan.

- [ ] **Step 2: Confirmar que nada del sitio Python actual se rompió**

```bash
git diff --stat b40b1cc -- build.py dist routes.json README.md skills-lock.json .claude .openai
```

Expected: **salida vacía** (ningún archivo de esa lista cambió durante este plan, comparado contra el commit inmediatamente anterior a este trabajo). Si algo aparece, es una regresión — detente y revisa qué tarea lo tocó.

- [ ] **Step 3: Verificación visual final (escritorio + móvil) con el dev server corriendo**

Repite Steps 4-6 del Task 7 (screenshots de escritorio expandido, escritorio colapsado a rail, y drawer móvil) para confirmar que nada se rompió con los cambios de los Tasks 8-9.

- [ ] **Step 4: Cerrar el dev server / preview**

```
preview_stop
```

- [ ] **Step 5: Commit final (si algo quedó sin commitear)**

```bash
git status --porcelain
```

Si hay cambios pendientes, revísalos uno por uno (no debe haberlos si cada task hizo su propio commit) y commitea lo que falte con un mensaje descriptivo.
