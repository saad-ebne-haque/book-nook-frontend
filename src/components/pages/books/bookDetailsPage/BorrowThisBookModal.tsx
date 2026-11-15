"use client";

import { authClient } from "@/lib/auth-client";
import { authenticatedFetch } from "@/lib/api-client";
import { BookOpen } from "@gravity-ui/icons";
import type { Book } from "@/types/bookType";
import { Button, Input, Label, Modal, TextField, toast, useOverlayState } from "@heroui/react";
import Image from "next/image";
import { useState, type FormEvent } from "react";

export interface BorrowBookModalProps {
    book: Book;
    onBorrowed: () => void;
}

export default function BorrowBookModal({ book, onBorrowed }: BorrowBookModalProps) {
    const { data: session } = authClient.useSession();
    const modalState = useOverlayState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const name = session?.user.name;
    const email = session?.user.email;
    const todayDate = new Date().toISOString().split("T")[0];
    const { _id, ...bookData } = book;
    const isAvailable = book.availableCopies > 0;

    const handleBorrowBook = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const borrowedBookData = {
            ...bookData,
            borrowerEmail: data.email,
            borrowerName: data.name,
            borrowedDate: data.borrowDate,
            returnDate: data.returnDate,
            bookId: _id,
        };

        setIsSubmitting(true);

        try {
            const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API}/borrows`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(borrowedBookData),
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.danger(result.message || "Failed to borrow this book.");
                return;
            }

            toast.success("Book borrowed successfully.");
            onBorrowed();
            modalState.close();
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to borrow this book."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal state={modalState}>
            <Button
                onPress={modalState.open}
                isDisabled={!isAvailable}
                className={`min-h-12 w-full rounded-full font-semibold shadow-sm transition-colors ${
                    isAvailable
                        ? "bg-[#315c4d] text-white hover:bg-[#25483c]"
                        : "bg-[#eee8dc] text-[#85867c]"
                }`}
            >
                {isAvailable && <BookOpen aria-hidden="true" className="size-4" />}
                {isAvailable ? "Borrow this book" : "Currently unavailable"}
            </Button>

            <Modal.Backdrop
                isOpen={modalState.isOpen}
                onOpenChange={modalState.setOpen}
                className="backdrop-blur-sm"
            >
                <Modal.Container placement="center">
                    <Modal.Dialog className="flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9] shadow-[0_24px_70px_rgba(41,43,37,0.22)] sm:max-w-lg">
                        <Modal.CloseTrigger />

                        <Modal.Header className="border-b border-[#eee8dc] px-5 py-5 sm:px-7">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-[#74806d]">
                                BOOKNOOK BORROW REQUEST
                            </p>
                            <Modal.Heading className="mt-2 font-serif text-2xl font-semibold text-[#292b25]">
                                Borrow this book
                            </Modal.Heading>
                            <p className="mt-1 text-sm leading-6 text-[#74756c]">
                                Confirm your details and choose an estimated return date.
                            </p>

                            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[#e9e2d5] bg-[#f7f5ef] p-3">
                                <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-[#eee8dc] shadow-sm">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        className="object-cover"
                                        sizes="56px"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="line-clamp-2 font-serif font-semibold text-[#292b25]">
                                        {book.title}
                                    </h3>
                                    <p className="mt-1 truncate text-sm text-[#74756c]">
                                        By {book.author}
                                    </p>
                                    <p className="mt-2 text-xs font-semibold text-[#315c4d]">
                                        {book.availableCopies} {book.availableCopies === 1 ? "copy" : "copies"} available
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleBorrowBook}>
                            <Modal.Body className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7">
                                <TextField name="name" defaultValue={name} className="w-full">
                                    <Label className="font-medium text-[#464940]">Your name</Label>
                                    <Input readOnly autoComplete="name" className="bg-[#f7f5ef]" />
                                </TextField>

                                <TextField name="email" type="email" defaultValue={email} className="w-full">
                                    <Label className="font-medium text-[#464940]">Your email</Label>
                                    <Input readOnly autoComplete="email" className="bg-[#f7f5ef]" />
                                </TextField>

                                <TextField
                                    name="borrowDate"
                                    type="date"
                                    defaultValue={todayDate}
                                    className="w-full"
                                >
                                    <Label className="font-medium text-[#464940]">Borrow date</Label>
                                    <Input readOnly className="bg-[#f7f5ef]" />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="returnDate"
                                    type="date"
                                    className="w-full"
                                >
                                    <Label className="font-medium text-[#464940]">
                                        Estimated return date
                                    </Label>
                                    <Input min={todayDate} />
                                </TextField>
                            </Modal.Body>

                            <Modal.Footer className="shrink-0 border-t border-[#eee8dc] bg-[#fffdf9] px-5 py-4 sm:px-7">
                                <Button
                                    slot="close"
                                    variant="outline"
                                    className="rounded-full border-[#dce4da] font-medium text-[#315c4d]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    isDisabled={isSubmitting || !isAvailable}
                                    className="rounded-full bg-[#315c4d] font-semibold text-white hover:bg-[#25483c]"
                                >
                                    {isSubmitting ? "Submitting..." : "Confirm borrow"}
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
