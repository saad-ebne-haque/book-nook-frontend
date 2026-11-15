import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "@/components/pages/auth/registerPage/RegistrationForm";
import BrandLogo from "@/components/shared/brand/BrandLogo";

export default function RegisterPage() {
    return (
        <section className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#e9e2d5] bg-[#fffdf9] shadow-[0_24px_80px_rgba(54,48,37,0.12)] md:grid-cols-[0.95fr_1.05fr]">
                <aside className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-[#315c4d] p-6 text-[#fffdf9] sm:min-h-[250px] sm:p-8 md:min-h-[760px] md:p-10 lg:p-12">
                    <Image
                        src="/images/booknook-register.jpg"
                        alt=""
                        fill
                        sizes="(max-width: 767px) calc(100vw - 2rem), 450px"
                        className="object-cover object-center"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#17392e]/90 via-[#17392e]/65 to-[#17392e]/30 md:bg-gradient-to-b md:from-[#17392e]/85 md:via-[#17392e]/60 md:to-[#17392e]/90" />

                    <div className="relative z-10">
                        <BrandLogo inverse />
                    </div>

                    <div className="relative z-10 mt-8 max-w-md md:my-auto md:py-10">
                        <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#d3dfce]">
                            MAKE ROOM FOR A NEW STORY
                        </p>
                        <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                            Your next favorite book is waiting.
                        </h1>
                        <p className="mt-4 hidden max-w-sm text-sm leading-7 text-white/80 md:block">
                            Join a community of readers, discover new shelves, and share the stories that stay with you.
                        </p>
                    </div>

                    <p className="relative z-10 mt-6 text-xs tracking-wide text-white/70">
                        Read a little. Dream a lot.
                    </p>
                </aside>

                <div className="flex items-center justify-center px-6 py-9 sm:px-10 sm:py-10 md:px-10 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-6">
                            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#74806d]">
                                JOIN THE NOOK
                            </p>
                            <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#292b25] sm:text-4xl">
                                Create your account
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[#74756c]">
                                A welcoming shelf and a new story are just a few details away.
                            </p>
                        </div>

                        <RegistrationForm />

                        <p className="mt-6 text-center text-sm text-[#74756c]">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-[#315c4d] underline decoration-[#a9c5a9] underline-offset-4 hover:text-[#25483c]">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
