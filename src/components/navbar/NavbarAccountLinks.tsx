import Link from "next/link";

export default function NavbarAccountLinks() {
  return (
    <>
      <Link className="booknook-navbar-account-link booknook-navbar-login" href="/login">
        Login
      </Link>
      <Link className="booknook-navbar-account-link booknook-navbar-register" href="/register">
        Register
      </Link>
    </>
  );
}
