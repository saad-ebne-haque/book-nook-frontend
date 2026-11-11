"use client";

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Card,
    Input,
    Label,
    TextArea,
    Select,
    ListBox,
} from "@heroui/react";
import { FormEvent } from "react";





export default function AddBookForm() {

    const session = authClient.useSession();
    const email = session.data?.user.email;


    const handleAddBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const submitedData = { ...data, addedBy: email, availableCopies: data.totalCopies };


        const req = await fetch(`${process.env.NEXT_PUBLIC_API}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitedData)
        })

        const result = await req.json();

        console.log(result);

    }


    return session.isPending ? (
        <>loading....</>
    )
        :
        (
            <Card className="w-full max-w-2xl mx-auto p-6 shadow-lg">
                <form className="flex flex-col gap-4" onSubmit={handleAddBook}>
                    <div>
                        <Label>Book Title</Label>
                        <Input required placeholder="Enter book title" name="title" />
                    </div>

                    <div>
                        <Label>Author</Label>
                        <Input required placeholder="Enter author name" name="author" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <TextArea required placeholder="Write book description..." name="description" />
                    </div>

                    <div>
                        <Label>Category</Label>
                        <Select isRequired placeholder="Select category" name="category">
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox>
                                    {[
                                        "Fiction",
                                        "Non-Fiction",
                                        "Classic",
                                        "Fantasy",
                                        "Science Fiction",
                                        "Self-Help",
                                        "Finance",
                                        "Historical Fiction",
                                        "Biography",
                                        "Mystery",
                                        'Others'
                                    ].map((category) => (
                                        <ListBox.Item
                                            key={category}
                                            id={category}
                                            textValue={category}
                                        >
                                            {category}
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Published Year</Label>
                            <Input required type="number" placeholder="e.g. 2020" name="publishedYear" />
                        </div>

                        <div>
                            <Label>Total Copies</Label>
                            <Input required type="number" placeholder="e.g. 10" name="totalCopies" />
                        </div>
                    </div>

                    <div>
                        <Label>Book Cover Image URL</Label>
                        <Input
                            required
                            type="url"
                            placeholder="https://example.com/book-cover.jpg"
                            name="image"
                        />
                    </div>

                    <div>
                        <Label>Language</Label>
                        <Input required placeholder="Enter language" name="language" />
                    </div>

                    <Button type="submit" className="w-full">
                        Add Book
                    </Button>
                </form>
            </Card>
        );

}