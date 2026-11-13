"use client";

import { authClient } from "@/lib/auth-client";
import { Book } from "@/types/bookType";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import Image from "next/image";
import { FormEvent } from "react";

export interface BorrowBookModalProps {
    book: Book;
}

export default function BorrowBookModal({ book }: BorrowBookModalProps) {
    const { data } = authClient.useSession();

    const name = data?.user.name;
    const email = data?.user.email;

    const todayDate = new Date().toISOString().split("T")[0];
    const { _id, ...bookData } = book;

    const handleBorrowBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const borrowedBookData = {
            ...bookData,
            borrowerEmail: data.email,
            borrowerName: data.name,
            borrowedDate: data.borrowDate,
            returnDate: data.returnDate,
            bookId: _id,
        };

        const req = await fetch(`${process.env.NEXT_PUBLIC_API}/borrowed-books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(borrowedBookData),
        });

        const res = await req.json();
        console.log(res);

    };

    return (
        <Modal>
            <Button
                variant="primary"
                size="lg"
                className="w-full font-semibold shadow-md"
            >
                Borrow This Book
            </Button>

            {/* CHANGED: Backdrop scrollable করা হয়েছে */}
            <Modal.Backdrop className="overflow-y-auto">
                <Modal.Container placement="auto">
                    {/* CHANGED: Modal-এর maximum height এবং flex layout */}
                    <Modal.Dialog className="flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-2xl shadow-2xl sm:max-w-md">

                        <Modal.CloseTrigger />

                        {/* Header */}
                        <Modal.Header className="flex flex-col gap-1 border-b border-default-200 bg-default-50 px-5 py-5">
                            <Modal.Heading className="text-xl font-bold">
                                Borrow Book
                            </Modal.Heading>

                            <p className="text-sm text-default-500">
                                Fill in the details below to borrow this book.
                            </p>

                            {/* Book Information */}
                            <div className="mt-3 flex items-center gap-4 rounded-xl border border-default-200 bg-background p-3">
                                <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-default-100 shadow-sm">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        className="object-cover"
                                        sizes="56px"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h4 className="line-clamp-2 font-semibold text-foreground">
                                        {book.title}
                                    </h4>

                                    <p className="mt-1 text-sm text-default-500">
                                        by{" "}
                                        <span className="font-medium text-default-700">
                                            {book.author}
                                        </span>
                                    </p>

                                    <p className="mt-2 text-xs text-default-500">
                                        Available Copies: {book.availableCopies}
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        {/* Form */}
                        <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleBorrowBook}>
                            {/* CHANGED: Body scrollable করা হয়েছে */}
                            <Modal.Body className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                                <Surface
                                    variant="default"
                                    className="rounded-xl border border-default-200 p-4"
                                >
                                    <div className="flex flex-col gap-5">

                                        {/* Name */}
                                        <TextField
                                            className="w-full"
                                            name="name"
                                            defaultValue={name}
                                        >
                                            <Label className="font-medium">
                                                Your Name
                                            </Label>
                                            <Input
                                                readOnly
                                                className="bg-default-100"
                                            />
                                        </TextField>

                                        {/* Email */}
                                        <TextField
                                            className="w-full"
                                            name="email"
                                            type="email"
                                            defaultValue={email}
                                        >
                                            <Label className="font-medium">
                                                Your Email
                                            </Label>
                                            <Input
                                                readOnly
                                                className="bg-default-100"
                                            />
                                        </TextField>

                                        {/* Borrow Date */}
                                        <TextField
                                            className="w-full"
                                            name="borrowDate"
                                            type="date"
                                            defaultValue={todayDate}
                                        >
                                            <Label className="font-medium">
                                                Borrow Date
                                            </Label>
                                            <Input
                                                readOnly
                                                className="bg-default-100"
                                            />
                                        </TextField>

                                        {/* Return Date */}
                                        <TextField
                                            className="w-full"
                                            name="returnDate"
                                            type="date"
                                            isRequired
                                        >
                                            <Label className="font-medium">
                                                Estimated Return Date
                                            </Label>
                                            <Input />
                                        </TextField>

                                    </div>
                                </Surface>
                            </Modal.Body>

                            {/* CHANGED: Footer shrink হবে না, button visible থাকবে */}
                            <Modal.Footer className="shrink-0 border-t border-default-200 bg-default-50 px-5 py-4">
                                <Button
                                    slot="close"
                                    variant="outline"
                                    className="font-medium"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    slot="close"
                                    variant="primary"
                                    type="submit"
                                    className="font-semibold shadow-sm"
                                >
                                    Confirm Borrow
                                </Button>
                            </Modal.Footer>
                        </form>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}