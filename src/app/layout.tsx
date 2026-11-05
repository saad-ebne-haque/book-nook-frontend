
import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { connection } from "next/server";
import Navbar, { NavbarFallback } from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Toaster } from "sonner";

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
    default: "Find your next favorite book | BookNook",
    template: "%s | BookNook",
  },
  description:
    "Discover a thoughtful collection of books and make room for your next chapter with BookNook.",
};

async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });


    return session;

  } catch {

    return null;
  }
}

async function NavbarWithSession() {
  await connection();
  const session = await getSession();

  return <Navbar session={session} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<NavbarFallback />}>
          <NavbarWithSession />
        </Suspense>

        <main className="grow">
          {children}
        </main>

        <Footer></Footer>
        <Toaster
          position="top-right"
          theme="light"
          duration={4000}
          closeButton
          richColors
          className="booknook-toaster"
          toastOptions={{
            className: "booknook-toast",
          }}
        />
      </body>

    </html>
  );
}
