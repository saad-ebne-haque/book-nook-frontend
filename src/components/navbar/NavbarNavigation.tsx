import Link from "next/link";

import { navigationLinks } from "./navbar.types";

function isActiveLink(pathname: string, href: string) {
  return pathname === href || (href === "/books" && pathname.startsWith("/books/"));
}

export default function NavbarNavigation({
  pathname,
  isLoggedIn,
}: {
  pathname: string;
  isLoggedIn: boolean;
}) {
  const visibleLinks = isLoggedIn
    ? navigationLinks
    : navigationLinks.filter(({ href }) =>
        ["/", "/books"].includes(href),
      );

  return (
    <>
      {visibleLinks.map(({ label, href }) => {
        const active = isActiveLink(pathname, href);

        return (
          <Link
            key={href}
            className={`booknook-navbar-link ${active ? "booknook-navbar-link-active" : ""}`}
            href={href}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
