"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Browse books" },
];

const privateLinks = [
    { href: "/add-book", label: "Add a book" },
    { href: "/my-books", label: "My books" },
    { href: "/my-borrows", label: "My borrows" },
];

export default function FooterNavigation() {
    const { data } = authClient.useSession();
    const links = data?.user ? [...publicLinks, ...privateLinks] : publicLinks;

    return (
        <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold tracking-wide text-white">Explore</h2>
            <ul className="mt-4 space-y-3">
                {links.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
