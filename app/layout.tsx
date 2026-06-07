import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading" 
});

const body = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "700"],
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Iyenemi Beads Collection | Luxury Nigerian Bridal Beads",
  description: "Exquisite traditional beadwork and cultural wedding styling for royalty, celebrities, and discerning families across the globe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}