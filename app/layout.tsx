import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/auth";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
