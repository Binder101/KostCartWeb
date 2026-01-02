import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/app/layouts/Header";

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
      <body className="bg-radial from-indigo-900 to to-black to-55% h-screen w-screen bg-cover overflow-x-hidden">
        <Header />
        {children}
      </body>
    </html>
  );
}
