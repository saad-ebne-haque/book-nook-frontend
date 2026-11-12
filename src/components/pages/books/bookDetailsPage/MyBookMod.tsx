import DeleteBook from "@/components/shared/modifyBook/deleteBook/DeleteBook"
import EditBook from "@/components/shared/modifyBook/editBook/EditBook"
import { Book } from "@/types/bookType"

export interface MyBookModProps {
    book: Book
}

export default function MyBookMod({ book }: MyBookModProps) {

    return (
        <div className="space-x-2">
            <EditBook book={book}></EditBook>
            <DeleteBook book={book}></DeleteBook>
        </div>
    )
}