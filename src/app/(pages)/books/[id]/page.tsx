
import BookDetailsPageContent from "@/components/pages/books/bookDetailsPage/BookDetailsPageContent";
import { Suspense } from "react";


/* export interface BookDetailsPageProps {
    params: Promise<{ id: string }>;
} */




const BookDetailsPage = (/* { params }: BookDetailsPageProps */) => {


    return (
        <>
            <Suspense>
                <BookDetailsPageContent /* params={params} */></BookDetailsPageContent>
            </Suspense>

        </>
    );
};

export default BookDetailsPage;