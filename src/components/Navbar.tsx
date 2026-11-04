"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import NavbarAccountLinks from "./navbar/NavbarAccountLinks";
import NavbarBrand from "./navbar/NavbarBrand";
import NavbarNavigation from "./navbar/NavbarNavigation";
import NavbarUserMenu from "./navbar/NavbarUserMenu";
import type { NavbarProps } from "./navbar/navbar.types";

export default function Navbar({ user: authenticatedUser }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          <div className="booknook-navbar-actions">
            <button
              type="button"
              className="booknook-navbar-mobile-toggle"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="booknook-mobile-navigation"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
            <div
              className={`booknook-navbar-account${isLoggedIn ? " booknook-navbar-account-authenticated" : ""}`}
            >
              {isLoggedIn ? (
                <NavbarUserMenu user={currentUser} />
              ) : (
                <NavbarAccountLinks />
              )}
            </div>
          </div>
        </div>
        <nav
          id="booknook-mobile-navigation"
          className={`booknook-navbar-mobile-nav${isMobileMenuOpen ? " booknook-navbar-mobile-nav-open" : ""}`}
          aria-label="Primary navigation"
        >
          <NavbarNavigation pathname={pathname} />
          {!isLoggedIn ? (
            <div className="booknook-navbar-mobile-account">
              <NavbarAccountLinks />
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export { default as NavbarFallback } from "./navbar/NavbarFallback";
