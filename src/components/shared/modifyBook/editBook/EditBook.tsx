'use client'
import { Book } from "@/types/bookType"
import { Button, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react"
import { useRouter } from "next/navigation"

export interface EditBookProps {
    book: Book
}

export default function EditBook({ book }: EditBookProps) {

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const req = await fetch(`${process.env.NEXT_PUBLIC_API}/books/${book._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await req.json();
        console.log(result);
        if (result.modifiedCount > 0) {
            router.refresh();
            alert(`Change Successfull`);
            document.getElementById("close-modal-btn")?.click();
        }

    };
    return (
        <>
            <Modal>
                <Button variant="primary">Edit Book</Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Edit Book Details</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-default-500">
                                    Update the book information below and save changes.
                                </p>
                            </Modal.Header>
                            <Modal.Body className="p-6">
                                <Surface variant="default" className="p-4 rounded-xl">
                                    <form id="edit-book-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <TextField className="w-full" name="title" defaultValue={book.title} isRequired>
                                            <Label>Book Title</Label>
                                            <Input placeholder="Enter book title" />
                                        </TextField>

                                        <TextField className="w-full" name="author" defaultValue={book.author} isRequired>
                                            <Label>Author</Label>
                                            <Input placeholder="Enter author name" />
                                        </TextField>

                                        <div className="flex flex-col gap-2">
                                            <Label>Description</Label>
                                            <TextArea
                                                name="description"
                                                defaultValue={book.description}
                                                placeholder="Write book description..."

                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <TextField className="w-full" name="publishedYear" type="number" defaultValue={book.publishedYear.toString()} isRequired>
                                                <Label>Published Year</Label>
                                                <Input placeholder="e.g. 2020" />
                                            </TextField>

                                            <TextField className="w-full" name="totalCopies" type="number" defaultValue={book.totalCopies.toString()} isRequired>
                                                <Label>Total Copies</Label>
                                                <Input placeholder="e.g. 10" />
                                            </TextField>
                                        </div>

                                        <TextField className="w-full" name="image" type="url" defaultValue={book.image} isRequired>
                                            <Label>Book Cover Image URL</Label>
                                            <Input placeholder="https://..." />
                                        </TextField>

                                        <TextField className="w-full" name="language" defaultValue={book.language} isRequired>
                                            <Label>Language</Label>
                                            <Input placeholder="Enter language" />
                                        </TextField>
                                    </form>
                                </Surface>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" form="edit-book-form" variant="primary">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    )
}