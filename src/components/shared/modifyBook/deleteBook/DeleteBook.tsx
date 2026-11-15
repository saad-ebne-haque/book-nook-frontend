"use client";

import { TrashBin } from "@gravity-ui/icons";
import type { Book } from "@/types/bookType";
import { Button, Modal, toast, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface DeleteBookProps {
    book: Book;
    compact?: boolean;
    onDeleted?: () => void;
}

export default function DeleteBook({ book, compact = false, onDeleted }: DeleteBookProps) {
    const router = useRouter();
    const modalState = useOverlayState();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/books/${book._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.danger(result.message || "Failed to delete the book.");
                return;
            }

            toast.success("Book deleted successfully.");
            modalState.close();
            onDeleted?.();
            router.refresh();
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to delete the book."
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal state={modalState}>
            <Button
                isIconOnly={compact}
                aria-label={compact ? "Delete book" : undefined}
                size={compact ? "sm" : "md"}
                variant={compact ? "danger-soft" : "danger"}
                onPress={modalState.open}
                className={compact
                    ? "size-9 rounded-full bg-[#fbefeb] text-[#9b4938] shadow-sm hover:bg-[#f5ddd5]"
                    : "rounded-full"}
            >
                {compact ? (
                    <TrashBin aria-hidden="true" className="size-4" />
                ) : (
                    "Delete"
                )}
            </Button>

            <Modal.Backdrop
                isOpen={modalState.isOpen}
                onOpenChange={modalState.setOpen}
                className="backdrop-blur-sm"
            >
                <Modal.Container placement="center">
                    <Modal.Dialog className="w-full overflow-hidden rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9] shadow-[0_24px_70px_rgba(41,43,37,0.22)] sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header className="px-5 pt-6 sm:px-7">
                            <div className="flex size-12 items-center justify-center rounded-full bg-[#fbefeb] text-[#9b4938]">
                                <TrashBin aria-hidden="true" className="size-5" />
                            </div>
                            <Modal.Heading className="mt-4 font-serif text-2xl font-semibold text-[#292b25]">
                                Delete this book?
                            </Modal.Heading>
                            <p className="mt-2 text-sm leading-6 text-[#74756c]">
                                This will permanently remove{" "}
                                <span className="font-semibold text-[#464940]">{book.title}</span>{" "}
                                from the collection.
                            </p>
                        </Modal.Header>

                        <Modal.Footer className="px-5 py-5 sm:px-7">
                            <Button
                                slot="close"
                                variant="outline"
                                className="rounded-full border-[#dce4da] font-medium text-[#315c4d]"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                isDisabled={isDeleting}
                                onPress={handleDelete}
                                className="rounded-full font-semibold"
                            >
                                {isDeleting ? "Deleting..." : "Delete book"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
