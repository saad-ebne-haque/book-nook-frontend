import Link from "next/link";
import BookCard from "@/components/shared/Books/bookCard";
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
                    className="inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-[#dce4da] px-5 text-sm font-semibold text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                >
                    See All Books
                </Link>
            </div>

            {result.data.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-[#d9dfd4] bg-[#fffdf9] px-6 py-12 text-center">
                    <h3 className="font-serif text-xl font-semibold text-[#292b25]">
                        The shelf is waiting for its first story
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#74756c]">
                        Check back soon to discover newly added books.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {result.data.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}

            <div className="mt-7 flex justify-center">
                <Link
                    href="/books"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#315c4d] px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#25483c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c4d]"
                >
                    See All Books
                </Link>
            </div>
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                    <div
                        key={index}
                        className="h-[480px] animate-pulse rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9]"
                    />
                ))}
            </div>
        </section>
    );
}
