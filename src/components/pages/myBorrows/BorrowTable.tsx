"use client";

import { Card, Table } from "@heroui/react";
import Image from "next/image";
import ReturnConfirmModal from "./ReturnConfirmModal";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { BorrowedBookType } from "@/types/borrowedBookType";




const BorrowTable = () => {
    const [refresh, setRefresh] = useState(false);

    const session = authClient.useSession();

    const userEmail = session.data?.user.email;

    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBookType[]>([]);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/borrowed-books?borrowerEmail=${userEmail}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch borrowed books");
                }

                const data = await res.json();
                if (data.length > 0) {
                    setRefresh(!refresh);
                }
                setBorrowedBooks(data);

            } catch (error) {
                console.error("Error fetching borrowed books:", error);
            }
        };

        fetchBorrowedBooks();
    }, [userEmail, refresh]);




    return (
        <Card className="overflow-hidden shadow-sm">
            <div className="border-b border-default-200 p-5">
                <h2 className="text-lg font-semibold">Borrowed Books</h2>
                <p className="mt-1 text-sm text-default-500">
                    Total {borrowedBooks.length} books borrowed
                </p>
            </div>

            <div className="overflow-x-auto">
                <Table aria-label="Borrowed books table">
                    <Table.ScrollContainer>
                        <Table.Content>
                            <Table.Header>
                                <Table.Column isRowHeader>Book</Table.Column>
                                <Table.Column>Author</Table.Column>
                                <Table.Column>Borrow Date</Table.Column>
                                <Table.Column>Return Date</Table.Column>
                                <Table.Column>Action</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {borrowedBooks.map((book) => (
                                    <Table.Row key={book._id}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-default-100">
                                                    <Image
                                                        src={book.image}
                                                        alt={book.title}
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <span className="font-semibold">
                                                    {book.title}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>{book.author}</Table.Cell>
                                        <Table.Cell>{book.borrowedDate}</Table.Cell>
                                        <Table.Cell>{book.returnDate}</Table.Cell>

                                        <Table.Cell>
                                            <ReturnConfirmModal borrowedBook={book} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </Card>
    );
};

export default BorrowTable;
