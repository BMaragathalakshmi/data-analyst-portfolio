import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HireMeBadge } from "@/components/ui/HireMeBadge";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maragathalakshmi B | Data Analyst Portfolio",
  description: "Portfolio of Maragathalakshmi B, an Electronics and Communication Engineering student focused on data analytics, Python, SQL, Excel, Power BI, and web development.",
  keywords: ["Data Analyst", "Maragathalakshmi B", "SQL", "Python", "Power BI", "Excel", "Data Analytics"],
  authors: [{ name: "Maragathalakshmi B" }],
  openGraph: {
    title: "Maragathalakshmi B | Data Analyst Portfolio",
    description: "Data Analyst Portfolio with verifiable SQL queries, Python EDA, Excel models, and Power BI dashboards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <HireMeBadge />
        <Footer />
      </body>
    </html>
  );
}
