"use client";

import { Button, Card, Chip } from "@heroui/react";
import { Person, Calendar, BookOpen, Globe } from "@gravity-ui/icons";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Book } from "@/types/bookType";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import MyBookMod from "./MyBookMod";








export default function BookDetailsPageContent() {
    const { data, isPending } = authClient.useSession();
    const userEmail = data?.user.email;
    const { id } = useParams();

    const [book, setBook] = useState<Book | null>(null);


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);

            })
            .catch(err => console.error(err));
    }, [id]);

    if (book) {
        return (
            <section className="container mx-auto px-4 py-12">
                <Card className="mx-auto max-w-5xl overflow-hidden shadow-lg p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Book Image */}
                        <div className="relative h-[400px] w-full bg-default-100 rounded-xl overflow-hidden">
                            <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Book Information */}
                        <div className="flex flex-col gap-5">
                            <Chip size="sm" variant="soft" className="w-fit">
                                {book.category}
                            </Chip>

                            <div>
                                <h1 className="text-3xl font-bold md:text-4xl">
                                    {book.title}
                                </h1>
                                <p className="mt-2 flex items-center gap-2 text-default-500">
                                    <Person className="w-4 h-4" /> By {book.author}
                                </p>
                            </div>

                            <div className="h-[1px] bg-default-200 w-full" />

                            <div>
                                <h2 className="mb-2 text-lg font-semibold">Description</h2>
                                <p className="leading-7 text-default-600 text-sm md:text-base">
                                    {book.description}
                                </p>
                            </div>

                            <div className="h-[1px] bg-default-200 w-full" />

                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-xs text-default-500">Published Year</p>
                                        <p className="font-medium">{book.publishedYear}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-xs text-default-500">Language</p>
                                        <p className="font-medium">{book.language}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-xs text-default-500">Total Copies</p>
                                        <p className="font-medium">{book.totalCopies}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-default-500">Available Copies</p>
                                    <p className={`font-medium ${book.availableCopies > 0 ? "text-success" : "text-danger"}`}>
                                        {book.availableCopies}
                                    </p>
                                </div>
                            </div>

                            <div className="h-[1px] bg-default-200 w-full" />

                            {
                                isPending ?
                                    <>
                                        <Button className="w-full bg-gray-300 animate-pulse text-transparent ">Borrow This Book</Button>
                                    </>
                                    :
                                    userEmail === book.addedBy ?
                                        <>
                                            <MyBookMod book={book}></MyBookMod>
                                        </>
                                        :
                                        <Button
                                            className="w-full bg-primary text-white font-medium"
                                            size="lg"
                                            isDisabled={book.availableCopies <= 0}
                                        >
                                            {book.availableCopies > 0 ? "Borrow This Book" : "Out of Stock"}
                                        </Button>
                            }
                        </div>
                    </div>
                </Card>
            </section>
        )
    }
}