import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});
export const metadata = {
  title: "3G Consultants | Engineering Excellence",
  description:
    "Engineering Excellence for Tomorrow's World. 3G Consultants delivers innovative engineering solutions with precision, expertise, and sustainable practices.",
  keywords: [
    "engineering",
    "construction",
    "consulting",
    "infrastructure",
    "sustainable engineering",
    "project management",
  ],
  authors: [
    {
      name: "3G Consultants",
    },
  ],
  creator: "3G Consultants",
  publisher: "3G Consultants",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}
      >
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
