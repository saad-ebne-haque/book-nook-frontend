'use client';
import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import LoggedinDropdown from "./LoggedinDropdown";

export default function Navbar() {
    const { data, error, isPending } = authClient.useSession();
    // console.log('pending', isPending);
    // console.log('error', error);
    // console.log('data', data);



    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        { name: "Home", href: "/" },
        { name: "All Books", href: "/books" },
        { name: "Add Book", href: "/add-book", current: true },
        { name: "My Books", href: "/my-books" },
        { name: "My Borrows", href: "/my-borrows" },
    ];
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <div className="flex items-center gap-3">

                        <p className="font-bold"><Link href="/">Book Nook</Link></p>
                    </div>
                </div>
                <ul className="hidden items-center gap-4 md:flex">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`font-medium ${item.current ? "text-accent" : "text-foreground"}`}
                                aria-current={item.current ? "page" : undefined}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {
                    isPending ?
                        <>
                            <div className="hidden items-center gap-4 md:flex">
                                <Button className='bg-gray-300 animate-pulse text-transparent'>Login</Button>

                                <Button className='bg-gray-300 animate-pulse text-transparent'>Register</Button>
                            </div>
                        </> :
                        data ?
                            <>
                                <LoggedinDropdown user={data.user}></LoggedinDropdown>
                            </> :

                            <div className="hidden items-center gap-4 md:flex">
                                <Link href="/login">Login</Link>

                                <Link href="/register" className={'no-underline'}>
                                    <Button>
                                        Register
                                    </Button>
                                </Link>
                            </div>
                }
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`block py-2 ${item.current ? "font-medium text-accent" : "font-medium text-foreground"}`}
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li className={`mt-4 ${isPending ? 'hidden' : !data ? 'hidden' : 'flex'} flex-col gap-2 border-t border-separator pt-4`}>
                            <Link href="/login" className="block py-2">
                                Login
                            </Link>
                            <Button className="w-full"><Link href="/register" className='no-underline'>Register</Link></Button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}