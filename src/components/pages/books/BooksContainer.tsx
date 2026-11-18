import { BookOpen } from "@gravity-ui/icons";
import Link from "next/link";
import BookCard from "@/components/shared/Books/bookCard";
import { Book } from "@/types/bookType";

const BooksContainer = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/books`);
    const response = await res.json();
    if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to fetch books");
    }
    const books: Book[] = response.data;

    if (books.length === 0) {
        return (
            <section className="rounded-[1.75rem] border border-dashed border-[#d9dfd4] bg-[#fffdf9] px-6 py-12 text-center">
                <BookOpen aria-hidden="true" className="mx-auto size-10 text-[#74806d]" />
                <h2 className="mt-4 font-serif text-xl font-semibold text-[#292b25]">
                    The library is waiting for its first book
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#74756c]">
                    No books have been added yet. Add one to get the collection started.
                </p>
                <Link
                    href="/add-book"
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#315c4d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#25483c]"
                >
                    Add a book
                </Link>
            </section>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
};

export default BooksContainer;