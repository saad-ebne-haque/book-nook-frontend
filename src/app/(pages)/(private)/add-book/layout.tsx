import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Share a Book",
  description: "Add a book to the BookNook reading room.",
};

export default function AddBookLayout({ children }: { children: ReactNode }) {
  return children;
}
