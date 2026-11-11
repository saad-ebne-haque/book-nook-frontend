import BookCard from "@/components/shared/Books/bookCard";
import { Book } from "@/types/bookType";

const BooksContainer = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/books`);
    const books: Book[] = await res.json();

    return (
        <>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    books.map(book => <BookCard key={book._id} book={book}></BookCard>)

                }
            </div>
        </>
    );
};

export default BooksContainer;