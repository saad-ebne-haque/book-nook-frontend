import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toast } from "@heroui/react";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BookNook",
    template: "BookNook | %s",
  },
  description: "Discover, borrow, and share books with the BookNook community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main className="grow container mx-auto">
          {children}
        </main>
        <Footer />
        <Toast.Provider
          aria-label="Notifications"
          placement="top end"
          className="book-nook-toast"
          width="min(26rem, calc(100vw - 2rem))"
        />
      </body>
    </html>
  );
}
