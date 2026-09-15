import type { Metadata } from "next";
import "./globals.css";
import { AppTopbar } from "@/components/layout/app-topbar";
import { AppHeader } from "@/components/layout/app-header";
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
        <AppTopbar />
        <AppHeader />
        <main id="main">{children}</main>
        <AppFooter />
        <WhatsappFloat />
      </body>
    </html>
  );
}
