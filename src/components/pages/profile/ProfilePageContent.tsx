import type { User } from "better-auth";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileEditor from "./ProfileEditor";
import DeleteAccountDialog from "./DeleteAccountDialog";

export function ProfilePageSkeleton() {
    return (
        <section
            aria-label="Loading profile"
            className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
        >
            <span className="sr-only">Loading profile</span>
            <div className="mx-auto max-w-5xl animate-pulse">
                <div className="mb-8 space-y-3">
                    <div className="h-3 w-40 rounded bg-[#eee9df]" />
                    <div className="h-10 w-48 rounded bg-[#eee9df]" />
                    <div className="h-4 w-72 max-w-full rounded bg-[#eee9df]" />
                </div>
                <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="min-h-72 rounded-[2rem] bg-[#315c4d]/20" />
                    <div className="min-h-72 rounded-[2rem] bg-[#eee9df]" />
                </div>
            </div>
        </section>
    );
}

export default async function ProfilePageContent() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(`/login?callbackUrl=${encodeURIComponent("/profile")}`);
    }

    const user: User = session.user;
    const initials = user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
    const memberSince = new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
    }).format(user.createdAt);

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8">
                    <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#74806d]">
                        YOUR BOOKNOOK ACCOUNT
                    </p>
                    <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#292b25] sm:text-4xl">
                        My Profile
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#74756c]">
                        Your reader details and account information, all in one place.
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <section className="relative overflow-hidden rounded-[2rem] bg-[#315c4d] p-7 text-[#fffdf9] shadow-[0_20px_50px_rgba(49,92,77,0.18)] sm:p-9">
                        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />
                        <ProfileEditor name={user.name} image={user.image ?? null} />
                        <div className="relative z-10 flex flex-col items-start">
                            <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-[#eaf0e9] text-2xl font-semibold text-[#315c4d] shadow-lg">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={`${user.name}'s profile`}
                                        fill
                                        sizes="96px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <span aria-hidden="true">{initials || "B"}</span>
                                )}
                            </div>
                            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-[#d3dfce]">
                                BOOKNOOK READER
                            </p>
                            <h2 className="mt-2 break-words font-serif text-2xl font-semibold">
                                {user.name}
                            </h2>
                            <p className="mt-2 break-all text-sm text-white/75">{user.email}</p>
                        </div>

                        <div className="relative z-10 mt-8 border-t border-white/15 pt-5">
                            <p className="text-xs text-white/60">MEMBER SINCE</p>
                            <p className="mt-1 text-sm font-medium text-white">{memberSince}</p>
                        </div>
                    </section>

                    <section className="rounded-[2rem] border border-[#e9e2d5] bg-[#fffdf9] p-7 shadow-[0_18px_50px_rgba(54,48,37,0.08)] sm:p-9">
                        <h2 className="font-serif text-2xl font-semibold text-[#292b25]">
                            Account information
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-[#74756c]">
                            These details are associated with your BookNook account.
                        </p>

                        <dl className="mt-7 divide-y divide-[#eee8dc]">
                            <div className="py-4 first:pt-0">
                                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#85867c]">
                                    Full name
                                </dt>
                                <dd className="mt-2 text-sm font-medium text-[#292b25]">{user.name}</dd>
                            </div>
                            <div className="py-4 last:pb-0">
                                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#85867c]">
                                    Email address
                                </dt>
                                <dd className="mt-2 break-all text-sm font-medium text-[#292b25]">{user.email}</dd>
                            </div>
                        </dl>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                href="/my-books"
                                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#315c4d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#25483c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                            >
                                View my books
                            </Link>
                            <Link
                                href="/my-borrows"
                                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#dce4da] px-5 text-sm font-semibold text-[#315c4d] transition-colors hover:bg-[#f1f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                            >
                                View my borrows
                            </Link>
                        </div>

                        <div className="mt-8 border-t border-[#eee8dc] pt-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b4938]">
                                Danger zone
                            </p>
                            <p className="mt-2 mb-4 text-sm leading-6 text-[#74756c]">
                                Permanently remove your BookNook login.
                            </p>
                            <DeleteAccountDialog fullName={user.name} />
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
