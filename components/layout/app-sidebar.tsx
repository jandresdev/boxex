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
