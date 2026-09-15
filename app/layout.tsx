import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

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
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppTopbar />
            <main id="main">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
