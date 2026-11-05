import { BookNookMark } from "./NavbarBrand";
import { navigationLinks } from "./navbar.types";

export default function NavbarFallback() {
  return (
    <header className="booknook-navbar" aria-hidden="true">
      <div className="booknook-navbar-container">
        <div className="booknook-navbar-top-row">
          <div className="booknook-navbar-brand">
            <BookNookMark />
            <span>BookNook</span>
          </div>
          <nav className="booknook-navbar-desktop-nav">
            {navigationLinks.map(({ label }) => (
              <span className="booknook-navbar-link" key={label}>
                {label}
              </span>
            ))}
          </nav>
          <div className="booknook-navbar-account">
            <div className="booknook-navbar-loading">
              <span />
              <span />
            </div>
          </div>
        </div>
        <nav className="booknook-navbar-mobile-nav">
          {navigationLinks.map(({ label }) => (
            <span className="booknook-navbar-link" key={label}>
              {label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
