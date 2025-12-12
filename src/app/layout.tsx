import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Kost Cart",
  description: "Ghata hata, Paisa bacha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[url('/drawables/background1.svg')] h-screen w-screen bg-cover">
        {children}
      </body>
    </html>
  );
}
