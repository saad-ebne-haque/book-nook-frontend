import { auth } from "@/lib/auth";

export type NavbarUser = {
  name: string;
  email?: string;
  image?: string;
  avatarUrl?: string;
};

export type SessionType = Awaited<
  ReturnType<typeof auth.api.getSession>
>;

export type NavbarProps = {
  session?: SessionType;
};

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];