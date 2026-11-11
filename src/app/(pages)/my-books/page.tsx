import MyBooksPageContent from "@/components/pages/myBooks/MyBooksPageContent";
import { Suspense } from "react";



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