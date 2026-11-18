"use client";

import { ArrowLeft, BookOpen, Calendar, Globe, Person } from "@gravity-ui/icons";
import { Card, toast } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Book } from "@/types/bookType";
import { authClient } from "@/lib/auth-client";
import { authenticatedFetch } from "@/lib/api-client";
import BorrowBookModal from "./BorrowThisBookModal";
import MyBookMod from "./MyBookMod";

function BookDetailsSkeleton() {
    return (
        <section
            aria-label="Loading book details"
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12"
        >
            <div className="grid animate-pulse gap-8 rounded-[2rem] border border-[#e9e2d5] bg-[#fffdf9] p-5 sm:p-8 md:grid-cols-2">
                <div className="min-h-[360px] rounded-[1.5rem] bg-[#eee8dc]" />
                <div className="flex flex-col gap-5 py-2">
                    <div className="h-4 w-28 rounded bg-[#eee8dc]" />
                    <div className="h-10 w-4/5 rounded bg-[#eee8dc]" />
                    <div className="h-4 w-2/5 rounded bg-[#eee8dc]" />
                    <div className="mt-4 h-24 rounded bg-[#eee8dc]" />
                    <div className="mt-auto h-12 rounded-full bg-[#315c4d]/20" />
                </div>
            </div>
        </section>
    );
}

export default function BookDetailsPageContent() {
    const { data, isPending } = authClient.useSession();
    const userEmail = data?.user.email;
    const { id } = useParams();
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const bookTitle = book?.title;

    useEffect(() => {
        let isCurrent = true;

        authenticatedFetch(`${process.env.NEXT_PUBLIC_API}/books/${id}`)
            .then(async (res) => {
                const response = await res.json();
                if (!res.ok || !response.success) {
                    throw new Error(response.message || "Failed to fetch book");
                }
                if (isCurrent) {
                    setBook(response.data);
                }
            })
            .catch((error) => {
                if (isCurrent) {
                    toast.danger(
                        error instanceof Error ? error.message : "Failed to load book details."
                    );
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [id, refreshKey]);

    useEffect(() => {
        if (bookTitle) {
            document.title = bookTitle;
        }
    }, [bookTitle]);

    if (!book) {
        return <BookDetailsSkeleton />;
    }

    const isOwner = !isPending && userEmail === book.addedBy;
    const isAvailable = book.availableCopies > 0;
    const addedByName = book.addedByName?.trim();
    const addedByEmail = book.addedBy?.trim();
    const addedDate = book.createdAt ? new Date(book.createdAt) : null;
    const formattedAddedDate = addedDate && !Number.isNaN(addedDate.getTime())
        ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(addedDate)
        : null;
    const reloadBook = () => {
        setBook(null);
        setRefreshKey((currentKey) => currentKey + 1);
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
            <Link
                href="/books"
                className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to books
            </Link>

            <Card className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#e9e2d5] bg-[#fffdf9] p-3 shadow-[0_20px_55px_rgba(54,48,37,0.09)] sm:p-5 md:grid-cols-[0.9fr_1.1fr] md:gap-3 md:p-6">
                <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-[#f3e8d8] sm:min-h-[480px]">
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-contain p-7 sm:p-10"
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#292b25]/15 via-transparent to-transparent"
                    />
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-[#fffdf9]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#315c4d] shadow-sm backdrop-blur">
                        {book.category}
                    </span>
                    {isOwner && (
                        <div className="absolute right-4 top-4 z-10 rounded-full border border-white/60 bg-[#fffdf9]/90 p-1.5 shadow-md backdrop-blur">
                            <MyBookMod
                                book={book}
                                compact
                                onUpdated={reloadBook}
                                onDeleted={() => router.push("/books")}
                            />
                        </div>
                    )}
                </div>

                <div className="flex min-w-0 flex-col px-2 py-6 sm:px-5 sm:py-8 md:px-7">
                    <p className="text-xs font-bold tracking-[0.2em] text-[#74806d]">
                        FROM THE BOOKNOOK SHELVES
                    </p>

                    <h1 className="mt-3 break-words font-serif text-3xl font-semibold leading-tight tracking-tight text-[#292b25] sm:text-4xl">
                        {book.title}
                    </h1>
                    <p className="mt-3 flex items-center gap-2 text-sm text-[#74756c]">
                        <Person aria-hidden="true" className="size-4 text-[#74806d]" />
                        By <span className="font-medium text-[#464940]">{book.author}</span>
                    </p>

                    <div className="my-6 h-px bg-[#eee8dc]" />

                    <div>
                        <h2 className="font-serif text-xl font-semibold text-[#292b25]">
                            About this book
                        </h2>
                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#74756c] sm:text-base">
                            {book.description}
                        </p>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[#f7f5ef] p-4">
                            <p className="flex items-center gap-2 text-xs font-medium text-[#85867c]">
                                <Calendar aria-hidden="true" className="size-4 text-[#74806d]" />
                                Published
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[#292b25]">
                                {book.publishedYear}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#f7f5ef] p-4">
                            <p className="flex items-center gap-2 text-xs font-medium text-[#85867c]">
                                <Globe aria-hidden="true" className="size-4 text-[#74806d]" />
                                Language
                            </p>
                            <p className="mt-2 truncate text-sm font-semibold text-[#292b25]">
                                {book.language}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#f7f5ef] p-4">
                            <p className="flex items-center gap-2 text-xs font-medium text-[#85867c]">
                                <BookOpen aria-hidden="true" className="size-4 text-[#74806d]" />
                                Total copies
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[#292b25]">
                                {book.totalCopies}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#f7f5ef] p-4">
                            <p className="text-xs font-medium text-[#85867c]">Available now</p>
                            <p className={`mt-2 text-sm font-semibold ${isAvailable ? "text-[#315c4d]" : "text-[#9b4938]"}`}>
                                {book.availableCopies} {book.availableCopies === 1 ? "copy" : "copies"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#dce4da] bg-[#f1f5ef] p-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#315c4d]">
                            <Person aria-hidden="true" className="size-5" />
                        </span>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-[#74806d]">Added by</p>
                            {addedByName && (
                                <p className="mt-1 break-words text-sm font-semibold text-[#292b25]">
                                    {addedByName}
                                </p>
                            )}
                            {addedByEmail ? (
                                <p className="mt-0.5 break-all text-xs text-[#74756c]">
                                    <span className="font-medium text-[#464940]">Email: </span>
                                    {addedByEmail}
                                </p>
                            ) : !addedByName ? (
                                <p className="mt-1 text-sm text-[#74756c]">
                                    Contributor information unavailable
                                </p>
                            ) : null}
                            {formattedAddedDate && (
                                <p className="mt-1 text-xs text-[#74756c]">
                                    Added {formattedAddedDate}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto border-t border-[#eee8dc] pt-6">
                        <BorrowBookModal
                            book={book}
                            onBorrowed={() => {
                                setBook((currentBook) => {
                                    if (!currentBook) {
                                        return currentBook;
                                    }

                                    return {
                                        ...currentBook,
                                        availableCopies: currentBook.availableCopies - 1,
                                    };
                                });
                            }}
                        />
                    </div>
                </div>
            </Card>
        </section>
    );
}
