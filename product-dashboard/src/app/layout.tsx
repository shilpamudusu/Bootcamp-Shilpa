import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "A dashboard for managing products and favorites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

