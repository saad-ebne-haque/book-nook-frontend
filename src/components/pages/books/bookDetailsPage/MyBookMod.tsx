import DeleteBook from "@/components/shared/modifyBook/deleteBook/DeleteBook"
import EditBook from "@/components/shared/modifyBook/editBook/EditBook"
import { Book } from "@/types/bookType"

export interface MyBookModProps {
    book: Book;
    compact?: boolean;
    onUpdated?: () => void;
    onDeleted?: () => void;
}

export default function MyBookMod({
    book,
    compact = false,
    onUpdated,
    onDeleted,
}: MyBookModProps) {
    return (
        <div className={compact ? "flex items-center gap-1" : "flex flex-wrap items-center gap-2"}>
            <EditBook book={book} compact={compact} onUpdated={onUpdated} />
            <DeleteBook book={book} compact={compact} onDeleted={onDeleted} />
        </div>
    );
}