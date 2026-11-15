"use client";

import { authClient } from "@/lib/auth-client";
import { authenticatedFetch } from "@/lib/api-client";
import {
    BookOpen,
} from "@gravity-ui/icons";
import {
    Button,
    Card,
    Description,
    Input,
    Label,
    ListBox,
    Select,
    Spinner,
    TextArea,
    TextField,
    toast,
} from "@heroui/react";
import { useState, type FormEvent } from "react";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookForm() {
    const session = authClient.useSession();
    const user = session.data?.user;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddBook = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user) {
            toast.danger("Please sign in before adding a book.");
            return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);
        const totalCopies = Number(formData.get("totalCopies"));
        const publishedYear = Number(formData.get("publishedYear"));

        if (!Number.isInteger(totalCopies) || totalCopies < 1) {
            toast.danger("Enter at least one copy of the book.");
            return;
        }

        if (!Number.isInteger(publishedYear) || publishedYear < 0) {
            toast.danger("Enter a valid published year.");
            return;
        }

        const newBook = {
            title: String(formData.get("title") ?? "").trim(),
            author: String(formData.get("author") ?? "").trim(),
            category: String(formData.get("category") ?? ""),
            description: String(formData.get("description") ?? "").trim(),
            image: String(formData.get("image") ?? "").trim(),
            language: String(formData.get("language") ?? "").trim(),
            publishedYear,
            totalCopies,
            availableCopies: totalCopies,
            addedBy: user.email,
            addedByName: user.name,
            createdAt: new Date().toISOString(),
        };

        setIsSubmitting(true);

        try {
            const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API}/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.danger(result.message || "Failed to add the book.");
                return;
            }

            toast.success("Book added successfully.");
            form.reset();
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to add the book."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (session.isPending) {
        return (
            <div
                role="status"
                aria-label="Loading add book form"
                className="flex min-h-80 items-center justify-center"
            >
                <Spinner size="lg" className="text-[#315c4d]" />
            </div>
        );
    }

    return (
        <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
            <header className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d806f]">
                    Grow the community shelf
                </p>
                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#292b25] sm:text-4xl">
                    Add a Book
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#74756c] sm:text-base">
                    Share a favorite with the BookNook community. Add the book details
                    and how many copies readers can borrow.
                </p>
            </header>

            {!user ? (
                <Card className="rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9] p-6 text-sm text-[#74756c] shadow-[0_12px_36px_rgba(54,48,37,0.06)]">
                    Please sign in to add a book.
                </Card>
            ) : (
                <Card className="rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9] p-5 shadow-[0_12px_36px_rgba(54,48,37,0.06)] sm:p-8">
                    <form className="flex flex-col gap-6" onSubmit={handleAddBook}>
                        <section aria-labelledby="book-information-heading" className="space-y-4">
                            <div>
                                <h2
                                    id="book-information-heading"
                                    className="font-serif text-xl font-semibold text-[#292b25]"
                                >
                                    Book information
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-[#85867c]">
                                    Tell readers what makes this book worth picking up.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <TextField name="title" isRequired className="w-full">
                                    <Label className="font-medium text-[#464940]">Book title</Label>
                                    <Input
                                        autoComplete="off"
                                        maxLength={150}
                                        placeholder="e.g. The Secret Garden"
                                    />
                                </TextField>

                                <TextField name="author" isRequired className="w-full">
                                    <Label className="font-medium text-[#464940]">Author name</Label>
                                    <Input
                                        autoComplete="off"
                                        maxLength={100}
                                        placeholder="e.g. Frances Hodgson Burnett"
                                    />
                                </TextField>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-medium text-[#464940]">Category</Label>
                                    <Select
                                        isRequired
                                        name="category"
                                        placeholder="Choose a category"
                                    >
                                        <Select.Trigger className="min-h-11 rounded-xl border border-[#e9e2d5] bg-white px-3 text-left">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                {categories.map((category) => (
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

                                <TextField
                                    name="publishedYear"
                                    type="number"
                                    isRequired
                                    className="w-full"
                                >
                                    <Label className="font-medium text-[#464940]">Published year</Label>
                                    <Input min={0} max={new Date().getFullYear()} placeholder="e.g. 2020" />
                                </TextField>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <TextField
                                    name="totalCopies"
                                    type="number"
                                    isRequired
                                    className="w-full"
                                >
                                    <Label className="font-medium text-[#464940]">Total copies</Label>
                                    <Input min={1} step={1} placeholder="e.g. 5" />
                                    <Description className="text-[#85867c]">
                                        Available copies will start at this number.
                                    </Description>
                                </TextField>

                                <TextField name="language" isRequired className="w-full">
                                    <Label className="font-medium text-[#464940]">Language</Label>
                                    <Input placeholder="e.g. English" />
                                </TextField>
                            </div>

                            <TextField name="image" type="url" isRequired className="w-full">
                                <Label className="font-medium text-[#464940]">Book cover image URL</Label>
                                <Input
                                    placeholder="https://example.com/book-cover.jpg"
                                    autoComplete="url"
                                />
                                <Description className="text-[#85867c]">
                                    Upload the cover to imgbb or Postimages, then paste its image URL here.
                                </Description>
                            </TextField>

                            <div className="flex flex-col gap-2">
                                <Label className="font-medium text-[#464940]">Short description</Label>
                                <TextArea
                                    name="description"
                                    required
                                    maxLength={1200}
                                    placeholder="Write a short introduction to the book..."
                                    className="min-h-32"
                                />
                            </div>
                        </section>

                        <section
                            aria-labelledby="added-by-heading"
                            className="space-y-4 border-t border-[#eee8dc] pt-6"
                        >
                            <div>
                                <h2
                                    id="added-by-heading"
                                    className="font-serif text-xl font-semibold text-[#292b25]"
                                >
                                    Added by
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-[#85867c]">
                                    Your account details are included with the book.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <TextField name="addedByName" value={user.name} className="w-full">
                                    <Label className="font-medium text-[#464940]">Your name</Label>
                                    <Input readOnly className="bg-[#f7f5ef] text-[#74756c]" />
                                </TextField>
                                <TextField name="addedByEmail" value={user.email} className="w-full">
                                    <Label className="font-medium text-[#464940]">Your email</Label>
                                    <Input readOnly className="bg-[#f7f5ef] text-[#74756c]" />
                                </TextField>
                            </div>
                        </section>

                        <div className="border-t border-[#eee8dc] pt-5">
                            <Button
                                type="submit"
                                isDisabled={isSubmitting}
                                className="min-h-12 w-full rounded-full bg-[#315c4d] font-semibold text-white shadow-sm transition-colors hover:bg-[#25483c] sm:w-auto sm:min-w-48"
                            >
                                <BookOpen aria-hidden="true" className="size-4" />
                                {isSubmitting ? "Adding book..." : "Add book to the shelf"}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}
        </section>
    );
}
