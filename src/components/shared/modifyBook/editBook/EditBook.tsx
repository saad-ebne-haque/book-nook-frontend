"use client";

import { PencilToSquare } from "@gravity-ui/icons";
import type { Book } from "@/types/bookType";
import { Button, Input, Label, Modal, Surface, TextArea, TextField, toast, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authenticatedFetch } from "@/lib/api-client";

export interface EditBookProps {
    book: Book;
    compact?: boolean;
    onUpdated?: () => void;
}

export default function EditBook({ book, compact = false, onUpdated }: EditBookProps) {
    const router = useRouter();
    const modalState = useOverlayState();
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        setIsSaving(true);

        try {
            const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API}/books/${book._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.danger(result.message || "Failed to update the book.");
                return;
            }

            toast.success("Book updated successfully.");
            modalState.close();
            onUpdated?.();
            router.refresh();
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to update the book."
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal state={modalState}>
            <Button
                isIconOnly={compact}
                aria-label={compact ? "Edit book" : undefined}
                size={compact ? "sm" : "md"}
                variant={compact ? "outline" : "primary"}
                onPress={modalState.open}
                className={compact
                    ? "size-9 rounded-full border-[#dce4da] bg-[#fffdf9] text-[#315c4d] shadow-sm hover:bg-[#eaf0e9]"
                    : "rounded-full bg-[#315c4d] font-semibold text-white hover:bg-[#25483c]"}
            >
                {compact ? (
                    <PencilToSquare aria-hidden="true" className="size-4" />
                ) : (
                    "Edit Book"
                )}
            </Button>

            <Modal.Backdrop
                isOpen={modalState.isOpen}
                onOpenChange={modalState.setOpen}
                className="backdrop-blur-sm"
            >
                <Modal.Container placement="center">
                    <Modal.Dialog className="w-full overflow-hidden rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9] shadow-[0_24px_70px_rgba(41,43,37,0.22)] sm:max-w-xl">
                        <Modal.CloseTrigger />
                        <Modal.Header className="border-b border-[#eee8dc] px-5 py-5 sm:px-7">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-[#74806d]">
                                BOOKNOOK COLLECTION
                            </p>
                            <Modal.Heading className="mt-2 font-serif text-2xl font-semibold text-[#292b25]">
                                Edit book details
                            </Modal.Heading>
                            <p className="mt-1 text-sm leading-6 text-[#74756c]">
                                Update the information readers see about this book.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-7">
                            <Surface
                                variant="default"
                                className="rounded-2xl border border-[#e9e2d5] bg-[#fffdf9] p-4 sm:p-5"
                            >
                                <form
                                    id={`edit-book-form-${book._id}`}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-4"
                                >
                                    <TextField className="w-full" name="title" defaultValue={book.title} isRequired>
                                        <Label className="font-medium text-[#464940]">Book title</Label>
                                        <Input placeholder="Enter book title" />
                                    </TextField>

                                    <TextField className="w-full" name="author" defaultValue={book.author} isRequired>
                                        <Label className="font-medium text-[#464940]">Author</Label>
                                        <Input placeholder="Enter author name" />
                                    </TextField>

                                    <div className="flex flex-col gap-2">
                                        <Label className="font-medium text-[#464940]">Description</Label>
                                        <TextArea
                                            name="description"
                                            defaultValue={book.description}
                                            placeholder="Write book description..."
                                            className="min-h-28"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <TextField
                                            className="w-full"
                                            name="publishedYear"
                                            type="number"
                                            defaultValue={book.publishedYear.toString()}
                                            isRequired
                                        >
                                            <Label className="font-medium text-[#464940]">Published year</Label>
                                            <Input placeholder="e.g. 2020" />
                                        </TextField>

                                        <TextField
                                            className="w-full"
                                            name="totalCopies"
                                            type="number"
                                            defaultValue={book.totalCopies.toString()}
                                            isRequired
                                        >
                                            <Label className="font-medium text-[#464940]">Total copies</Label>
                                            <Input placeholder="e.g. 10" />
                                        </TextField>
                                    </div>

                                    <TextField className="w-full" name="image" type="url" defaultValue={book.image} isRequired>
                                        <Label className="font-medium text-[#464940]">Book cover image URL</Label>
                                        <Input placeholder="https://..." />
                                    </TextField>

                                    <TextField className="w-full" name="language" defaultValue={book.language} isRequired>
                                        <Label className="font-medium text-[#464940]">Language</Label>
                                        <Input placeholder="Enter language" />
                                    </TextField>
                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer className="border-t border-[#eee8dc] bg-[#fffdf9] px-5 py-4 sm:px-7">
                            <Button
                                slot="close"
                                variant="outline"
                                className="rounded-full border-[#dce4da] font-medium text-[#315c4d]"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form={`edit-book-form-${book._id}`}
                                isDisabled={isSaving}
                                className="rounded-full bg-[#315c4d] font-semibold text-white hover:bg-[#25483c]"
                            >
                                {isSaving ? "Saving..." : "Save changes"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
