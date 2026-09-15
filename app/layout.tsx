import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { AppFooter } from "@/components/layout/app-footer";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";

export const metadata: Metadata = {
  title: "Boxex",
  description: "Envíos de Estados Unidos a Latinoamérica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset>
            <AppTopbar />
            <main id="main">{children}</main>
            <AppFooter />
          </SidebarInset>
        </SidebarProvider>
        <WhatsappFloat />
      </body>
    </html>
  );
}
