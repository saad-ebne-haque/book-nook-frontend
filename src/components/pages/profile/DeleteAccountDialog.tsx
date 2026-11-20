"use client";

import { TrashBin } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, TextField, toast, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

interface DeleteAccountDialogProps {
    fullName: string;
}

export default function DeleteAccountDialog({ fullName }: DeleteAccountDialogProps) {
    const router = useRouter();
    const modalState = useOverlayState();
    const [confirmation, setConfirmation] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const isConfirmationValid = confirmation.trim() === fullName.trim();

    const handleDeleteAccount = async () => {
        if (!isConfirmationValid) {
            toast.danger("Enter your full name to confirm account deletion.");
            return;
        }

        setIsDeleting(true);

        try {
            const { error } = await authClient.deleteUser({
                callbackURL: "/",
            });

            if (error) {
                toast.danger(error.message || "Unable to delete your account.");
                return;
            }

            toast.success("Your account has been deleted.");
            modalState.close();
            router.refresh();
            router.replace("/");
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Unable to delete your account."
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal state={modalState}>
            <Button
                variant="danger-soft"
                onPress={() => {
                    setConfirmation("");
                    modalState.open();
                }}
                className="rounded-full"
            >
                <TrashBin aria-hidden="true" className="size-4" />
                Delete account
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
                                Delete your account?
                            </Modal.Heading>
                            <p className="mt-2 text-sm leading-6 text-[#74756c]">
                                This permanently deletes your BookNook login and sessions. Your books and borrow records will remain unchanged and may still show your email address.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="px-5 sm:px-7">
                            <TextField name="accountDeleteConfirmation" className="w-full">
                                <Label className="font-medium text-[#464940]">
                                    Type your full name to confirm
                                </Label>
                                <Input
                                    autoComplete="off"
                                    value={confirmation}
                                    onChange={(event) => setConfirmation(event.target.value)}
                                    placeholder={fullName}
                                />
                            </TextField>
                        </Modal.Body>

                        <Modal.Footer className="px-5 py-5 sm:px-7">
                            <Button
                                slot="close"
                                variant="outline"
                                isDisabled={isDeleting}
                                className="rounded-full border-[#dce4da] font-medium text-[#315c4d]"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                isDisabled={isDeleting || !isConfirmationValid}
                                onPress={handleDeleteAccount}
                                className="rounded-full font-semibold"
                            >
                                {isDeleting ? "Deleting account..." : "Delete permanently"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
