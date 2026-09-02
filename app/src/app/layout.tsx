import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EE Solutions | Panel",
  description: "Panel interno y portal de clientes de EE Solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#07050A] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
