import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your BookNook account and join the reading community.",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
