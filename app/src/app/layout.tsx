import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EE Solutions | Panel",
  description: "Panel interno y portal de clientes de EE Solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/*
          Las mismas tres familias del sitio público (Unbounded para títulos,
          Instrument Sans para texto, JetBrains Mono para etiquetas). Se cargan
          por <link> y no con next/font para no depender de que el build
          alcance Google Fonts por red.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="brillo-ambiente flex min-h-full flex-col bg-ink text-texto">
        {children}
      </body>
    </html>
  );
}
