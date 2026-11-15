"use client";

import { BookOpen } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoggedinDropdown from "./LoggedinDropdown";

const publicMenuItems = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
];

const privateMenuItems = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
];

function isActivePath(pathname: string, href: string) {
    return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarSkeleton() {
    return (
        <nav
            aria-label="Main navigation"
            className="sticky top-0 z-40 border-b border-[#e9e2d5] bg-[#fffdf9]/95 shadow-[0_4px_24px_rgba(54,48,37,0.04)] backdrop-blur-xl"
        >
            <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="BookNook home"
                    className="flex shrink-0 items-center gap-3"
                >
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-[#315c4d] text-[#fffdf9] shadow-sm">
                        <BookOpen aria-hidden="true" className="size-5" />
                    </span>
                    <span className="flex flex-col">
                        <span className="font-serif text-xl font-bold tracking-tight text-[#292b25]">
                            BookNook
                        </span>
                        <span className="hidden text-[9px] font-semibold tracking-[0.18em] text-[#7b806f] sm:block">
                            READ · BORROW · RETURN
                        </span>
                    </span>
                </Link>

                <div role="status" aria-label="Loading navigation" className="flex flex-1 items-center justify-end gap-3 md:justify-center">
                    <span className="sr-only">Loading navigation</span>
                    <div className="hidden items-center gap-2 md:flex">
                        {[16, 20, 16, 16, 20].map((width, index) => (
                            <span
                                key={index}
                                className="h-9 animate-pulse rounded-full bg-[#eee9df]"
                                style={{ width: `${width * 4}px` }}
                            />
                        ))}
                    </div>
                    <span className="h-10 w-24 animate-pulse rounded-full bg-[#eee9df]" />
                </div>
            </div>
        </nav>
    );
}

export default function NavbarContent() {
    const { data, isPending } = authClient.useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isUser = Boolean(data?.user);
    const menuItems = isUser ? [...publicMenuItems, ...privateMenuItems] : publicMenuItems;

    return (
        <nav
            aria-label="Main navigation"
            className="sticky top-0 z-40 border-b border-[#e9e2d5] bg-[#fffdf9]/95 shadow-[0_4px_24px_rgba(54,48,37,0.04)] backdrop-blur-xl"
        >
            <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex shrink-0 items-center gap-3">
                    <button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-xl text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d] md:hidden"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {isMenuOpen ? (
                            <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m6 6 12 12M18 6 6 18" />
                            </svg>
                        ) : (
                            <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>

                    <Link href="/" aria-label="BookNook home" className="flex items-center gap-3">
                        <span className="flex size-11 items-center justify-center rounded-2xl bg-[#315c4d] text-[#fffdf9] shadow-sm transition-transform duration-200 hover:-rotate-3">
                            <BookOpen aria-hidden="true" className="size-5" />
                        </span>
                        <span className="flex flex-col">
                            <span className="font-serif text-xl font-bold tracking-tight text-[#292b25]">
                                BookNook
                            </span>
                            <span className="hidden text-[9px] font-semibold tracking-[0.18em] text-[#7b806f] sm:block">
                                READ · BORROW · RETURN
                            </span>
                        </span>
                    </Link>
                </div>

                <ul className="hidden items-center gap-1 md:flex">
                    {isPending ? (
                        <li role="status" aria-label="Loading navigation links" className="flex items-center gap-2 px-2">
                            <span className="sr-only">Loading navigation links</span>
                            {[16, 20, 16, 16, 20].map((width, index) => (
                                <span
                                    key={index}
                                    className="h-9 animate-pulse rounded-full bg-[#eee9df]"
                                    style={{ width: `${width * 4}px` }}
                                />
                            ))}
                        </li>
                    ) : (
                        menuItems.map((item) => {
                            const currentPage = isActivePath(pathname, item.href);

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d] ${
                                            currentPage
                                                ? "bg-[#eaf0e9] text-[#315c4d]"
                                                : "text-[#5d6057] hover:bg-[#f3f0e9] hover:text-[#315c4d]"
                                        }`}
                                        aria-current={currentPage ? "page" : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })
                    )}
                </ul>

                <div className="flex shrink-0 items-center justify-end">
                    {isPending ? (
                        <div role="status" aria-label="Loading account" className="flex items-center gap-2">
                            <span className="sr-only">Loading account</span>
                            <span className="hidden h-10 w-20 animate-pulse rounded-full bg-[#eee9df] sm:block" />
                            <span className="h-10 w-24 animate-pulse rounded-full bg-[#315c4d]/20" />
                        </div>
                    ) : data?.user ? (
                        <LoggedinDropdown user={data.user} />
                    ) : (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Link
                                href="/login"
                                className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#315c4d] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#25483c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                            >
                                Join the nook
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {isMenuOpen && (
                <div id="mobile-navigation" className="border-t border-[#eee8dc] bg-[#fffdf9] px-4 pb-5 pt-3 shadow-lg md:hidden">
                    {isPending ? (
                        <div role="status" aria-label="Loading menu" className="space-y-2 py-2">
                            <span className="sr-only">Loading menu</span>
                            {[1, 2, 3].map((item) => (
                                <span key={item} className="block h-11 animate-pulse rounded-xl bg-[#eee9df]" />
                            ))}
                        </div>
                    ) : (
                        <>
                            <ul className="space-y-1">
                                {menuItems.map((item) => {
                                    const currentPage = isActivePath(pathname, item.href);

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`flex min-h-11 items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                                                    currentPage
                                                        ? "bg-[#eaf0e9] text-[#315c4d]"
                                                        : "text-[#5d6057] hover:bg-[#f3f0e9] hover:text-[#315c4d]"
                                                }`}
                                                aria-current={currentPage ? "page" : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            {!isUser && (
                                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#eee8dc] pt-4 sm:hidden">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#dce4da] px-4 text-sm font-semibold text-[#315c4d]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#315c4d] px-4 text-sm font-semibold text-white"
                                    >
                                        Join the nook
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
