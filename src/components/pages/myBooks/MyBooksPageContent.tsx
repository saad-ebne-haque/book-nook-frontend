
import { auth } from "@/lib/auth"
import { getServerAuthToken } from "@/lib/auth-token-server";
import { Book } from "@/types/bookType";
import { headers } from "next/headers"
import MyBookCard from "./MyBookCard";


export default async function MyBooksPageContent() {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session?.user.email) {
        throw new Error("An authenticated user is required to load your books.");
    }

    const token = await getServerAuthToken();
    if (!token) {
        throw new Error("An authentication token is required to load your books.");
    }
    const email = session.user.email;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/my-books/${encodeURIComponent(email)}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    const response = await res.json();
    if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to fetch your books");
    }
    const myBooks: Book[] = response.data;


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    myBooks.map(book => <MyBookCard key={book._id} book={book}></MyBookCard>)

                }
            </div>
        </>
    )
}