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
            <Suspense fallback={<BooksGridSkeleton label="Loading your books" />}>
                <MyBooksPageContent />
            </Suspense>
        </>
    );
};

export default MyBooksPage;