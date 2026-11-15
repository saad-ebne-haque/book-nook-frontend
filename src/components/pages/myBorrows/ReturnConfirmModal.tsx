"use client";

import { Button, Modal, toast } from "@heroui/react";
import { TrashBin, BookOpen } from "@gravity-ui/icons";
import { BorrowedBookType } from "@/types/borrowedBookType";
import { authenticatedFetch } from "@/lib/api-client";

interface ReturnConfirmModalProps {
    borrowedBook: BorrowedBookType;
    onReturned: () => void;
}

const ReturnConfirmModal = ({ borrowedBook, onReturned }: ReturnConfirmModalProps) => {
    const handleReturnBook = async () => {
        try {
            const req = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API}/borrows/${borrowedBook._id}`, {
                method: "DELETE",
            });
            const res = await req.json();

            if (!req.ok || !res.success) {
                throw new Error(res.message || "Failed to return book.");
            }

            toast.success("Book returned successfully.");
            onReturned();
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to return book."
            );
        }
    };

    return (
        <Modal>
            <Button
                size="sm"
                variant="danger-soft"

            >
                <TrashBin />
                Return
            </Button>

            <Modal.Backdrop className="backdrop-blur-sm">
                <Modal.Container placement="center">
                    <Modal.Dialog className="w-full max-w-sm rounded-2xl p-2">

                        <Modal.CloseTrigger />

                        <Modal.Header className="flex flex-col items-center gap-3 pt-6">
                            <div className="flex size-14 items-center justify-center rounded-full bg-danger/10 text-danger">
                                <BookOpen className="size-7" />
                            </div>

                            <Modal.Heading className="text-xl font-bold">
                                Return Book?
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="px-5 text-center">
                            <p className="text-sm leading-6 text-default-500">
                                Are you sure you want to return{" "}
                                <span className="font-semibold text-foreground">
                                    {borrowedBook.title}
                                </span>
                                ? This book will be removed from your borrowed books.
                            </p>
                        </Modal.Body>

                        <Modal.Footer className="flex justify-center gap-3 px-5 pb-5">
                            <Button
                                slot="close"
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                variant="danger"
                                className="flex-1"
                                onClick={handleReturnBook}
                            >
                                Yes, Return
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default ReturnConfirmModal;