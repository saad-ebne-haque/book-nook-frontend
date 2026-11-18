import MyBooksPageContent from "@/components/pages/myBooks/MyBooksPageContent";
import BooksGridSkeleton from "@/components/shared/Books/BooksGridSkeleton";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Books",
};


const MyBooksPage = () => {
    return (
        <>
            <h1 className="font-bold text-4xl">My Books</h1>
            <p className="mt-2 mb-7 max-w-2xl text-sm leading-6 text-[#74756c] sm:text-base">
                Manage the books you&apos;ve shared with the BookNook community.
            </p>
            <Suspense fallback={<BooksGridSkeleton label="Loading your books" />}>
                <MyBooksPageContent />
            </Suspense>
        </>
    );
};

export default MyBooksPage;