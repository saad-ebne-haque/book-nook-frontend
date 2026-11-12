
import { Card, Button, Chip, Link } from "@heroui/react";
import Image from "next/image";
import { Book } from "@/types/bookType";

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    return (
        <Card className="max-w-[350px] h-full flex flex-col justify-start shadow-md hover:shadow-xl transition-shadow duration-300 p-4">

            {/* Card Header - Image */}
            <div className="w-full h-[220px] relative overflow-hidden rounded-xl bg-default-100">
                <Image
                    alt={book.title}
                    className="object-cover rounded-xl"
                    src={book.image}
                    fill
                />
            </div>

            {/* Card Body - Content */}
            <div className="w-full flex flex-col flex-1">

                <div className="pb-2 pt-3 flex flex-col items-start">
                    <div className="flex justify-between w-full items-center mb-1">
                        <Chip size="sm" variant="soft">
                            {book.category}
                        </Chip>
                        <span className="text-tiny text-default-500 font-medium">
                            Published: {book.publishedYear}
                        </span>
                    </div>

                    <h4 className="font-bold text-large mt-1 line-clamp-1">
                        {book.title}
                    </h4>
                    <p className="text-small text-default-500">
                        By {book.author}
                    </p>
                </div>

                <p className="text-tiny text-default-600 mt-2 line-clamp-2">
                    {book.description}
                </p>

                <div className="flex justify-between items-center mt-3 text-xs text-default-500 bg-default-50 p-2 rounded-lg">
                    <span>
                        Language: <strong className="text-default-700">{book.language}</strong>
                    </span>
                    <span>
                        Available:{" "}
                        <strong className={book.availableCopies > 0 ? "text-success" : "text-danger"}>
                            {book.availableCopies}/{book.totalCopies}
                        </strong>
                    </span>
                </div>

            </div>

            {/* Card Footer */}
            <div className="w-full pt-3 mt-auto">
                <Link href={`/books/${book._id}`} className="w-full no-underline">
                    <Button
                        className="bg-primary text-white w-full"
                        isDisabled={book.availableCopies === 0}
                    >
                        {book.availableCopies > 0 ? "View Details" : "Not Available"}
                    </Button>
                </Link>
            </div>

        </Card>
    );
}