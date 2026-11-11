export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    category: string;
    publishedYear: number;
    image: string;
    totalCopies: number;
    availableCopies: number;
    language: string;
    addedBy: string;
}