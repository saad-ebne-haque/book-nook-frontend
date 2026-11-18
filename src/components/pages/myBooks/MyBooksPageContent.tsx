
import { BookOpen } from "@gravity-ui/icons";
import Link from "next/link";
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

    if (myBooks.length === 0) {
        return (
            <section className="rounded-[1.75rem] border border-dashed border-[#d9dfd4] bg-[#fffdf9] px-6 py-12 text-center">
                <BookOpen aria-hidden="true" className="mx-auto size-10 text-[#74806d]" />
                <h2 className="mt-4 font-serif text-xl font-semibold text-[#292b25]">
                    You haven&apos;t added any books yet
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#74756c]">
                    Add a book to share it with the BookNook community.
                </p>
                <Link
                    href="/add-book"
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#315c4d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#25483c]"
                >
                    Add your first book
                </Link>
            </section>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myBooks.map((book) => (
                <MyBookCard key={book._id} book={book} />
            ))}
        </div>
    )
}