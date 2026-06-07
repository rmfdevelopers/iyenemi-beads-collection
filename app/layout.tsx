import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading" 
});

const bodyFont = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Iyenemi Beads Collection | Royal Nigerian Bridal Adornments",
  description: "Port Harcourt's premier destination for regal cultural adornments and bespoke bridal beads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}