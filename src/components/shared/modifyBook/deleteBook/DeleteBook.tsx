'use client';
import { Book } from "@/types/bookType"
import { Button, Modal } from "@heroui/react"
import { useRouter } from "next/navigation";


export interface DeleteBookProps {
    book: Book
}

export default function DeleteBook({ book }: DeleteBookProps) {

    const router = useRouter()

    const handleDelete = async () => {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API}/books/${book._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        });
        const result = await req.json();
        console.log(result);
        if (result.deletedCount > 0) {
            router.refresh();
            alert(`Change Successfull`);
            document.getElementById("close-modal-btn")?.click();
        }
    }
    return (
        <>
            <Modal>
                <Button variant="danger">
                    Delete
                </Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-sm">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading className="text-danger font-bold">
                                    Delete Confirmation
                                </Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-default-500">
                                    Are you sure you want to delete this book? This action cannot be undone.
                                </p>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button slot="close" variant="danger-soft">
                                    Cancel
                                </Button>
                                <Button slot="close" variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    )
}