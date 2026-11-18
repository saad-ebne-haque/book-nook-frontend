import BooksContainer from "@/components/pages/books/BooksContainer";
import BooksGridSkeleton from "@/components/shared/Books/BooksGridSkeleton";
import { Suspense } from "react";
import type { Metadata } from "next";

interface AllBooksPageProps {
    searchParams: Promise<{
        search?: string | string[];
        sort?: string | string[];
        page?: string | string[];
    }>;
}

export const metadata: Metadata = {
    title: "All Books",
};

const AllBooksPage = ({ searchParams }: AllBooksPageProps) => {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d806f]">
                    Find your next read
                </p>
                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#292b25] sm:text-4xl">
                    All Books
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#74756c] sm:text-base">
                    Search the BookNook collection by title, author, or category, then sort the shelf your way.
                </p>
            </header>
            <Suspense fallback={<BooksGridSkeleton label="Loading books" />}>
                <BooksContainer searchParams={searchParams} />
            </Suspense>
        </section>
    );
};

export default AllBooksPage;