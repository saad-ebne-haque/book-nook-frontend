import Link from "next/link";

interface BrandLogoProps {
    inverse?: boolean;
    showTagline?: boolean;
}

export default function BrandLogo({
    inverse = false,
    showTagline = false,
}: BrandLogoProps) {
    return (
        <Link
            href="/"
            aria-label="BookNook home"
            className="inline-flex w-fit items-center gap-2.5"
        >
            <svg
                aria-hidden="true"
                className={`size-9 shrink-0 ${inverse ? "text-white" : "text-[#315c4d]"}`}
                fill="none"
                viewBox="0 0 40 40"
            >
                <path
                    d="M20 8.5v21.7M20 8.5c-5-2-10-2-15 0v21c4.8-1.8 9.8-1.8 15 .7m0-11.2c-4.8-1.8-9.8-1.8-15 0"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                />
                <path
                    d="M20 8.5c5-2 10-2 15 0v21c-4.8-1.8-9.8-1.8-15 .7m0-21.7 15 21"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                />
            </svg>
            <span className="flex flex-col">
                <span
                    className={`font-sans text-[19px] font-semibold leading-none tracking-[-0.045em] ${
                        inverse ? "text-white" : "text-[#292b25]"
                    }`}
                >
                    BookNook
                </span>
                {showTagline && (
                    <span
                        className={`mt-1.5 text-[8px] font-medium tracking-[0.17em] ${
                            inverse ? "text-white/65" : "text-[#7b806f]"
                        }`}
                    >
                        READ · BORROW · RETURN
                    </span>
                )}
            </span>
        </Link>
    );
}
