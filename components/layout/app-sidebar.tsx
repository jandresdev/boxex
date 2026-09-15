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
      <SidebarHeader className="pb-2 pt-6">
        <div className="flex items-center justify-between gap-2 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
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
              className="h-10 w-auto shrink-0"
            />
          </Link>
          <SidebarTrigger
            className="text-brand-blue hover:bg-brand-blue/10"
            aria-label="Contraer o expandir menú"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="justify-center">
        <nav aria-label="Navegación principal">
          <SidebarMenu className="gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className="h-11 justify-center gap-3 rounded-xl text-[15px] group-data-[collapsible=icon]:justify-center data-[active=true]:border-l-2 data-[active=true]:border-brand-gold data-[active=true]:bg-white/60 data-[active=true]:shadow-sm hover:bg-white/50"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className="justify-center"
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
