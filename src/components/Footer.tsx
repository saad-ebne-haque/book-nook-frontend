import Link from "next/link";
import {
  AtSign,
  BookOpen,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/", Icon: AtSign },
  { label: "Facebook", href: "https://www.facebook.com/", Icon: MessageCircle },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Share2 },
];

export default function Footer() {
  return (
    <footer className="bg-[#173F36] text-white">
      <div className="mx-auto w-[min(100%-2.5rem,80rem)] py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_0.9fr] lg:gap-12">
          <div className="max-w-sm">
            <Link
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-white no-underline"
              href="/"
              aria-label="BookNook home"
            >
              <BookOpen className="size-7 text-[#D8B98A]" aria-hidden="true" />
              <span>BookNook</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/70">
              Discover a thoughtful collection of books and make room for your next chapter.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-[#D8B98A] transition-colors hover:border-[#D8B98A]/60 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B98A]"
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="size-[1.125rem]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="text-sm font-semibold tracking-wide text-white">Quick Links</h2>
            <ul className="mt-4 grid gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    className="text-sm text-white/70 no-underline transition-colors hover:text-[#D8B98A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8B98A]"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">Contact</h2>
            <ul className="mt-4 grid gap-4">
              <li className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <Mail className="mt-1 size-4 shrink-0 text-[#D8B98A]" aria-hidden="true" />
                <a
                  className="text-white/70 no-underline transition-colors hover:text-[#D8B98A]"
                  href="mailto:hello@booknook.com"
                >
                  hello@booknook.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <MapPin className="mt-1 size-4 shrink-0 text-[#D8B98A]" aria-hidden="true" />
                <span>Your reading community, wherever you are.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">A little note</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Good stories are even better when they are shared. Find your next favorite and
              pass it along.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5 text-xs text-white/60 sm:mt-12 sm:flex sm:items-center sm:justify-between">
          <p>© 2026 BookNook. All rights reserved.</p>
          <p className="mt-2 text-[#D8B98A] sm:mt-0">Made for the love of reading.</p>
        </div>
      </div>
    </footer>
  );
}
