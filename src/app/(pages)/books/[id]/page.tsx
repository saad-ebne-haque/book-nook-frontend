
import BookDetailsPageContent from "@/components/pages/books/bookDetailsPage/BookDetailsPageContent";
import { auth } from "@/lib/auth";
import type { Book } from "@/types/bookType";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { connection } from "next/server";

interface BookDetailsApiResponse {
    success: boolean;
    message?: string;
    data?: Pick<Book, "title"> | null;
}

interface BookDetailsPageProps {
    params: Promise<{ id: string }>;
}

const createBookTitleMetadata = (title: string): Metadata => ({
    title: { absolute: title },
});

export async function generateMetadata(
    { params }: BookDetailsPageProps
): Promise<Metadata> {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API;

    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API is not configured.");
    }

    const requestHeaders = await headers();
    const { token } = await auth.api.getToken({ headers: requestHeaders });

    if (!token) {
        return createBookTitleMetadata("Book Details");
    }

    try {
        const response = await fetch(`${apiUrl}/books/${encodeURIComponent(id)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error(`Failed to fetch book title metadata (${response.status}).`);
            return createBookTitleMetadata("Book Details");
        }

        const result = await response.json() as BookDetailsApiResponse;
        if (!result.success || !result.data?.title) {
            console.error(result.message || "Book title metadata was not available.");
            return createBookTitleMetadata("Book Details");
        }

        return createBookTitleMetadata(result.data.title);
    } catch (error) {
        console.error("Failed to fetch book title metadata.", error);
        return createBookTitleMetadata("Book Details");
    }
}

async function DynamicMetadataMarker() {
    await connection();
    return null;
}

const BookDetailsPage = () => {

    return (
        <>
            <Suspense fallback={null}>
                <DynamicMetadataMarker />
            </Suspense>
            <Suspense>
                <BookDetailsPageContent />
            </Suspense>

        </>
    );
};

export default BookDetailsPage;