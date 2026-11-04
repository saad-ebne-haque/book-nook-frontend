import { BookOpen } from "lucide-react";
import Link from "next/link";

export function BookNookMark() {
  return <BookOpen className="booknook-navbar-brand-icon" aria-hidden="true" />;
}

export default function NavbarBrand() {
  return (
    <Link className="booknook-navbar-brand" href="/" aria-label="BookNook home">
      <BookNookMark />
      <span>BookNook</span>
    </Link>
  );
}
