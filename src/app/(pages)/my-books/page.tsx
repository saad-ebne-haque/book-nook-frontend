import MyBooksPageContent from "@/components/pages/myBooks/MyBooksPageContent";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Books",
};


const MyBooksPage = async () => {




    return (
        <>

            <Suspense>
                <MyBooksPageContent></MyBooksPageContent>
            </Suspense>

        </>
    );
};

export default MyBooksPage;