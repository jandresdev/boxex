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
        <div className="flex items-center justify-between gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Link
            href="/"
            aria-label="Boxex, inicio"
            className="flex min-w-0 items-center group-data-[collapsible=icon]:hidden"
          >
            <Image
              src="/logo.png"
              alt="Boxex"
              width={2048}
              height={407}
              priority
              className="h-7 w-auto shrink-0"
            />
          </Link>
          <SidebarTrigger
            className="text-brand-blue hover:bg-brand-blue/10"
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
