import Link from "next/link";
import NewArrivalsCarousel from "./NewArrivalsCarousel";
import type { Book } from "@/types/bookType";

interface BooksApiResponse {
    success: boolean;
    message?: string;
    data: Book[];
}

export default async function NewArrivals() {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API is not configured.");
    }

    const response = await fetch(`${apiUrl}/books?limit=6`, {
        cache: "no-store",
    });
    const result = await response.json() as BooksApiResponse;

    if (!response.ok || !result.success || !Array.isArray(result.data)) {
        throw new Error(result.message || "Failed to fetch new arrivals.");
    }

    return (
        <section
            aria-labelledby="new-arrivals-heading"
            className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
        >
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d806f]">
                        Fresh on the shelf
                    </p>
                    <h2
                        id="new-arrivals-heading"
                        className="mt-2 font-serif text-3xl font-semibold text-[#292b25] sm:text-4xl"
                    >
                        New Arrivals
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#74756c] sm:text-base">
                        Take a look at the latest stories added by the BookNook community.
                    </p>
                </div>
                <Link
                    href="/books"
                    className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center rounded-full border border-[#dce4da] px-5 text-sm font-semibold text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                >
                    See All Books
                </Link>
            </div>

            <NewArrivalsCarousel books={result.data} />
        </section>
    );
}

export function NewArrivalsSkeleton() {
    return (
        <section
            aria-label="Loading new arrivals"
            className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
        >
            <div className="mb-7 space-y-3">
                <div className="h-3 w-32 animate-pulse rounded bg-[#eee8dc]" />
                <div className="h-9 w-56 animate-pulse rounded bg-[#eee8dc]" />
                <div className="h-4 w-full max-w-md animate-pulse rounded bg-[#eee8dc]" />
            </div>
            <div className="flex gap-5 overflow-hidden">
                {Array.from({ length: 3 }, (_, index) => (
                    <div
                        key={index}
                        className="w-[88%] shrink-0 animate-pulse overflow-hidden rounded-[1.5rem] border border-[#e9e2d5] bg-[#fffdf9] sm:w-[62%] lg:w-[46%]"
                    >
                        <div className="aspect-[16/10] bg-[#eee8dc]" />
                        <div className="space-y-3 p-5">
                            <div className="h-4 w-2/3 rounded bg-[#eee8dc]" />
                            <div className="h-6 w-4/5 rounded bg-[#eee8dc]" />
                            <div className="h-4 w-full rounded bg-[#eee8dc]" />
                            <div className="h-4 w-1/2 rounded bg-[#eee8dc]" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
