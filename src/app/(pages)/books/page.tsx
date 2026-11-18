import BooksContainer from "@/components/pages/books/BooksContainer";
import BooksGridSkeleton from "@/components/shared/Books/BooksGridSkeleton";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Books",
};

const AllBooksPage = async () => {




    return (
        <>
            <h1 className="font-bold text-4xl">All Books</h1>
            <Suspense fallback={<BooksGridSkeleton label="Loading books" />}>
                <BooksContainer />
            </Suspense>


        </>
    );
};

export default AllBooksPage;