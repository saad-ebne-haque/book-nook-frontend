"use client";

import { usePathname } from "next/navigation";

import NavbarAccountLinks from "./navbar/NavbarAccountLinks";
import NavbarBrand from "./navbar/NavbarBrand";
import NavbarNavigation from "./navbar/NavbarNavigation";
import NavbarUserMenu from "./navbar/NavbarUserMenu";
import type { NavbarProps } from "./navbar/navbar.types";

export default function Navbar({ user: authenticatedUser }: NavbarProps) {
  const pathname = usePathname();
  const isLoggedIn = false;
  const user = {
    name: "Saad",
    email: "saad@example.com",
    image: "https://i.pravatar.cc/150?img=12",
  };
  const currentUser = authenticatedUser ?? user;

  return (
    <header className="booknook-navbar">
      <div className="booknook-navbar-container">
        <div className="booknook-navbar-top-row">
          <NavbarBrand />
          <nav className="booknook-navbar-desktop-nav" aria-label="Primary navigation">
            <NavbarNavigation pathname={pathname} />
          </nav>
          <div className="booknook-navbar-account">
            {isLoggedIn ? (
              <NavbarUserMenu user={currentUser} />
            ) : (
              <NavbarAccountLinks />
            )}
          </div>
        </div>
        <nav className="booknook-navbar-mobile-nav" aria-label="Primary navigation">
          <NavbarNavigation pathname={pathname} />
        </nav>
      </div>
    </header>
  );
}

export { default as NavbarFallback } from "./navbar/NavbarFallback";
