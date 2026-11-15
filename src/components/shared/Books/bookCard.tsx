import { ArrowRight, BookOpen, Globe } from "@gravity-ui/icons";
import { Button, Card, Link } from "@heroui/react";
import Image from "next/image";
import { Book } from "@/types/bookType";

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    const isAvailable = book.availableCopies > 0;

    return (
        <Card className="group mx-auto flex h-full w-full max-w-[360px] flex-col overflow-hidden rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9] p-0 shadow-[0_12px_30px_rgba(54,48,37,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(49,92,77,0.14)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eee8dc]">
                <Image
                    alt={book.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    src={book.image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#292b25]/40 via-transparent to-transparent"
                />
                <span className="absolute left-4 top-4 max-w-[65%] truncate rounded-full border border-white/60 bg-[#fffdf9]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#315c4d] shadow-sm backdrop-blur">
                    {book.category}
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-[#292b25]/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    {book.publishedYear}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full border border-white/70 bg-[#fffdf9]/95 px-3 py-1.5 text-xs font-semibold text-[#315c4d] shadow-sm">
                    {isAvailable ? `${book.availableCopies} available` : "Currently borrowed"}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-7 text-[#292b25] transition-colors group-hover:text-[#315c4d]">
                    {book.title}
                </h2>
                <p className="mt-1 text-sm text-[#74756c]">
                    By <span className="font-medium text-[#464940]">{book.author}</span>
                </p>

                <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-[#74756c]">
                    {book.description}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                    <div className="rounded-2xl bg-[#f7f5ef] px-3 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#85867c]">
                            Language
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 truncate text-xs font-semibold text-[#464940]">
                            <Globe aria-hidden="true" className="size-3.5 shrink-0 text-[#74806d]" />
                            {book.language}
                        </p>
                    </div>
                    <div className="rounded-2xl bg-[#f7f5ef] px-3 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#85867c]">
                            Copies
                        </p>
                        <p className={`mt-1 text-xs font-semibold ${isAvailable ? "text-[#315c4d]" : "text-[#9b4938]"}`}>
                            {book.availableCopies} of {book.totalCopies}
                        </p>
                    </div>
                </div>

                <Link href={`/books/${book._id}`} className="mt-5 w-full no-underline">
                    <Button
                        className={`w-full rounded-full font-semibold transition-colors ${
                            isAvailable
                                ? "bg-[#315c4d] text-white hover:bg-[#25483c]"
                                : "bg-[#eee8dc] text-[#85867c]"
                        }`}
                        isDisabled={!isAvailable}
                    >
                        {isAvailable ? (
                            <>
                                <BookOpen aria-hidden="true" className="size-4" />
                                View book details
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </>
                        ) : (
                            "Currently unavailable"
                        )}
                    </Button>
                </Link>
            </div>
        </Card>
    );
}
