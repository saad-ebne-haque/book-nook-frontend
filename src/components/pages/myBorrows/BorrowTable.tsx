"use client";

import { Card, Spinner, Table, toast } from "@heroui/react";
import { BookOpen } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BorrowedBookType } from "@/types/borrowedBookType";
import ReturnConfirmModal from "./ReturnConfirmModal";

const BorrowTable = () => {
    const session = authClient.useSession();
    const userEmail = session.data?.user.email;
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBookType[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [loadedEmail, setLoadedEmail] = useState<string | null>(null);
    const [isRetrying, setIsRetrying] = useState(false);
    const isLoading = session.isPending
        || Boolean(userEmail && (loadedEmail !== userEmail || isRetrying));
    const visibleBooks = userEmail ? borrowedBooks : [];

    const handleBookReturned = (bookId: string) => {
        setBorrowedBooks((currentBooks) =>
            currentBooks.filter((book) => book._id !== bookId)
        );
    };

    const handleRetry = () => {
        setLoadError(null);
        setIsRetrying(true);
        setRetryCount((count) => count + 1);
    };

    useEffect(() => {
        let isCurrent = true;

        if (session.isPending || !userEmail) {
            return () => {
                isCurrent = false;
            };
        }

        const fetchBorrowedBooks = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/borrows?borrowerEmail=${encodeURIComponent(userEmail)}`
                );
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || "Failed to fetch borrowed books.");
                }

                if (!Array.isArray(result.data)) {
                    throw new Error("The borrowed books response was not valid.");
                }

                if (isCurrent) {
                    setBorrowedBooks(result.data);
                    setLoadError(null);
                    setLoadedEmail(userEmail);
                }
            } catch (error) {
                const message = error instanceof Error
                    ? error.message
                    : "Failed to fetch borrowed books.";

                if (isCurrent) {
                    setLoadError(message);
                    setLoadedEmail(userEmail);
                    toast.danger(message);
                }
            } finally {
                if (isCurrent) {
                    setIsRetrying(false);
                }
            }
        };

        fetchBorrowedBooks();

        return () => {
            isCurrent = false;
        };
    }, [session.isPending, userEmail, retryCount]);

    return (
        <Card className="overflow-hidden rounded-2xl border border-[#e9e2d5] bg-[#fffdf9] shadow-[0_12px_36px_rgba(54,48,37,0.06)]">
            <div className="border-b border-[#e9e2d5] px-5 py-5 sm:px-7">
                <h2 className="font-serif text-xl font-semibold text-[#292b25]">
                    Your borrowed books
                </h2>
                <p className="mt-1 text-sm text-[#74756c]">
                    {visibleBooks.length} {visibleBooks.length === 1 ? "book" : "books"} currently borrowed
                </p>
            </div>

            {isLoading ? (
                <div
                    role="status"
                    aria-label="Loading borrowed books"
                    className="flex min-h-64 flex-col items-center justify-center gap-3 px-5 py-12"
                >
                    <Spinner className="text-[#315c4d]" size="lg" />
                    <span className="text-sm text-[#74756c]">Loading your borrowed books...</span>
                </div>
            ) : loadError && userEmail ? (
                <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-5 py-12 text-center">
                    <p className="font-medium text-[#292b25]">We couldn&apos;t load your borrowed books.</p>
                    <button
                        type="button"
                        onClick={handleRetry}
                        className="rounded-full bg-[#315c4d] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#25483c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                    >
                        Try again
                    </button>
                </div>
            ) : visibleBooks.length === 0 ? (
                <div className="flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center">
                    <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#eaf0e9] text-[#315c4d]">
                        <BookOpen aria-hidden="true" className="size-7" />
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#292b25]">
                        Your reading journey starts here
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-[#74756c]">
                        You haven&apos;t borrowed any books yet. Find your next favorite read in the library.
                    </p>
                    <Link
                        href="/books"
                        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#315c4d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#25483c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
                    >
                        Browse books
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <Table aria-label="Borrowed books table">
                        <Table.ScrollContainer>
                            <Table.Content>
                                <Table.Header>
                                    <Table.Column isRowHeader>Book image</Table.Column>
                                    <Table.Column>Book title</Table.Column>
                                    <Table.Column>Borrow date</Table.Column>
                                    <Table.Column>Return date</Table.Column>
                                    <Table.Column>Action</Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {visibleBooks.map((book) => (
                                        <Table.Row key={book._id}>
                                            <Table.Cell>
                                                <div className="relative h-16 w-12 overflow-hidden rounded-lg bg-[#f3f0e9]">
                                                    <Image
                                                        src={book.image}
                                                        alt={`Cover of ${book.title}`}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className="font-semibold text-[#292b25]">
                                                    {book.title}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>{book.borrowedDate}</Table.Cell>
                                            <Table.Cell>{book.returnDate}</Table.Cell>
                                            <Table.Cell>
                                                <ReturnConfirmModal
                                                    borrowedBook={book}
                                                    onReturned={() => handleBookReturned(book._id)}
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </div>
            )}
        </Card>
    );
};

export default BorrowTable;
