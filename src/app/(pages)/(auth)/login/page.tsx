import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "@/components/pages/auth/loginPage/LoginForm";
import BrandLogo from "@/components/shared/brand/BrandLogo";

function LoginFormSkeleton() {
    return (
        <div role="status" aria-label="Loading login form" className="space-y-5">
            <span className="sr-only">Loading login form</span>
            <div className="space-y-2">
                <div className="h-4 w-16 animate-pulse rounded bg-[#eee9df]" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-[#eee9df]" />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-[#eee9df]" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-[#eee9df]" />
            </div>
            <div className="h-12 w-full animate-pulse rounded-full bg-[#315c4d]/20" />
            <div className="h-12 w-full animate-pulse rounded-full bg-[#eee9df]" />
        </div>
    );
}

export default function LoginPage() {
    return (
        <section className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#e9e2d5] bg-[#fffdf9] shadow-[0_24px_80px_rgba(54,48,37,0.12)] md:grid-cols-[0.95fr_1.05fr]">
                <aside className="relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-[#315c4d] p-6 text-[#fffdf9] sm:min-h-[280px] sm:p-8 md:min-h-[640px] md:p-10 lg:p-12">
                    <Image
                        src="/images/booknook-login.jpg"
                        alt=""
                        fill
                        sizes="(max-width: 767px) calc(100vw - 2rem), 450px"
                        className="object-cover object-center"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#17392e]/90 via-[#17392e]/65 to-[#17392e]/30 md:bg-gradient-to-b md:from-[#17392e]/85 md:via-[#17392e]/60 md:to-[#17392e]/90" />
                    <div className="pointer-events-none absolute -right-32 -top-20 size-96 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-16 top-0 size-64 rounded-full border border-white/10" />
                    <div className="relative z-10">
                        <BrandLogo inverse />
                    </div>

                    <div className="relative z-10 py-8 md:py-10">
                        <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#c8d8c4]">
                            YOUR NEXT CHAPTER
                        </p>
                        <h2 className="max-w-sm font-serif text-4xl font-semibold leading-tight lg:text-5xl">
                            Good books are better when shared.
                        </h2>
                        <p className="mt-5 hidden max-w-sm text-sm leading-7 text-white/75 md:block">
                            Sign in to discover stories, keep track of your shelf, and pick up right where your next great read begins.
                        </p>

                    </div>

                    <p className="relative z-10 text-xs tracking-wide text-white/70">
                        A cozy corner for curious readers.
                    </p>
                </aside>

                <div className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-10 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#74806d]">
                                WELCOME BACK
                            </p>
                            <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#292b25] sm:text-4xl">
                                Sign in to your nook
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-[#74756c]">
                                Your next favorite book is just around the corner.
                            </p>
                        </div>

                        <Suspense fallback={<LoginFormSkeleton />}>
                            <LoginForm />
                        </Suspense>

                        <p className="mt-7 text-center text-sm text-[#74756c]">
                            New to BookNook?{" "}
                            <Link href="/register" className="font-semibold text-[#315c4d] underline decoration-[#a9c5a9] underline-offset-4 hover:text-[#25483c]">
                                Create an account
                            </Link>
                        </p>

                        <p className="mt-8 text-center text-xs leading-5 text-[#929187]">
                            By continuing, you agree to keep the stories moving and the books shared.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
