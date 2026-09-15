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
    <Sidebar collapsible="icon" className="lg:top-10 lg:h-[calc(100svh-2.5rem)]">
      <SidebarHeader className="pb-2 pt-6 lg:border-b lg:border-white/15 lg:bg-brand-blue">
        <div className="flex items-center justify-between gap-2 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Link
            href="/"
            aria-label="Boxex, inicio"
            className="flex min-w-0 items-center rounded-lg group-data-[collapsible=icon]:hidden lg:bg-white/90 lg:px-2.5 lg:py-1.5 lg:shadow-sm"
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
            className="text-brand-blue hover:bg-brand-blue/10 lg:text-white lg:hover:bg-white/15 lg:hover:text-white"
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
                    className="h-12 justify-start gap-3 rounded-xl border border-white/40 bg-white/25 text-[15px] backdrop-blur-md transition-[transform,box-shadow,background-color,border-color] duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:backdrop-blur-none hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/60 hover:shadow-[0_10px_20px_rgba(1,22,137,0.12)] data-[active=true]:border-l-2 data-[active=true]:border-brand-gold data-[active=true]:bg-white/70 data-[active=true]:shadow-[0_10px_20px_rgba(1,22,137,0.14)]"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className="justify-start group-data-[collapsible=icon]:justify-center"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/50 bg-white/40 text-brand-blue shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] backdrop-blur-sm group-data-[collapsible=icon]:size-[18px] group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:shadow-none group-data-[collapsible=icon]:backdrop-blur-none">
                        <Icon className="size-[18px]" />
                      </span>
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.label}
                      </span>
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
              className="bg-brand-gold text-brand-blue font-semibold shadow-[0_10px_25px_rgba(214,179,106,0.4)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand-gold/90"
            >
              <Link href={quoteCta.href}>
                <ArrowRight className="hidden group-data-[collapsible=icon]:inline-block" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {quoteCta.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
