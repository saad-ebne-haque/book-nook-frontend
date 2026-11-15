import Image from "next/image";
import BrandLogo from "@/components/shared/brand/BrandLogo";
import FooterNavigation from "./FooterNavigation";

const socialLinks = [
    { href: "https://www.facebook.com/", label: "Facebook", icon: "/images/social/facebook.svg" },
    { href: "https://www.instagram.com/", label: "Instagram", icon: "/images/social/instagram.svg" },
    { href: "https://www.linkedin.com/", label: "LinkedIn", icon: "/images/social/linkedin.svg" },
];

export default function Footer() {
    return (
        <footer className="border-t border-[#e9e2d5] bg-[#203f36] text-[#fffdf9]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_0.8fr] lg:gap-8">
                    <div className="max-w-sm">
                        <BrandLogo inverse />
                        <p className="mt-5 text-sm leading-7 text-white/70">
                            A cozy corner for curious readers. Discover, borrow, and share stories with the BookNook community.
                        </p>
                    </div>

                    <FooterNavigation />

                    <div>
                        <h2 className="text-sm font-semibold tracking-wide text-white">Get in touch</h2>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
                            Have a question or a book recommendation? We would love to hear from you.
                        </p>
                        <a
                            href="mailto:hello@booknook.example"
                            className="mt-3 inline-block text-sm font-medium text-[#d3dfce] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                        >
                            hello@booknook.example
                        </a>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold tracking-wide text-white">Connect</h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {socialLinks.map(({ href, label, icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        title={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    >
                                        <Image
                                            src={icon}
                                            alt=""
                                            width={18}
                                            height={18}
                                            className="size-[18px] brightness-0 invert"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-white/15 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 BookNook. All rights reserved.</p>
                    <p>Made for readers, one chapter at a time.</p>
                </div>
            </div>
        </footer>
    );
}
