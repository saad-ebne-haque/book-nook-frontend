import { Book } from "./bookType";



export interface BorrowedBookType extends Book {
    borrowerEmail: string;
    borrowerName: string;
    borrowedDate: string;
    returnDate: string;
    bookId: string;
}