import BookCard from "@/components/shared/Books/bookCard";
import { auth } from "@/lib/auth"
import { Book } from "@/types/bookType";
import { email } from "better-auth";
import { headers } from "next/headers"


export default async function MyBooksPageContent() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const email = session?.user.email;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/my-books/${email}`)
    const myBooks: Book[] = await res.json();


    return (
        <>
            <h1 className="font-bold text-4xl">My Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    myBooks.map(book => <BookCard key={book._id} book={book}></BookCard>)

                }
            </div>
        </>
    )
}