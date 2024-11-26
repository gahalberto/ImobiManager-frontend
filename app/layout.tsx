import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/auth";
import Navbar from "./_components/Nav";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "ImobiManager",
  description: "Plataforma de gestão de imóveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} `}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
