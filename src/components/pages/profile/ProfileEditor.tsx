"use client";

import { authClient } from "@/lib/auth-client";
import { PencilToSquare } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Modal, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface ProfileEditorProps {
    name: string;
    image: string | null;
}

interface Feedback {
    type: "error" | "success";
    message: string;
}

function FeedbackMessage({ feedback }: { feedback: Feedback | null }) {
    if (!feedback) {
        return null;
    }

    return (
        <p
            role={feedback.type === "error" ? "alert" : "status"}
            className={`rounded-xl px-4 py-3 text-sm ${
                feedback.type === "error"
                    ? "border border-[#e8c8bc] bg-[#fbefeb] text-[#9b4938]"
                    : "border border-[#dce4da] bg-[#f1f5ef] text-[#315c4d]"
            }`}
        >
            {feedback.message}
        </p>
    );
}

function isOptionalHttpsUrl(value: string) {
    if (!value) {
        return true;
    }

    try {
        return new URL(value).protocol === "https:";
    } catch {
        return false;
    }
}

export default function ProfileEditor({ name: currentName, image: currentImage }: ProfileEditorProps) {
    const router = useRouter();
    const [name, setName] = useState(currentName);
    const [image, setImage] = useState(currentImage ?? "");
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [profileFeedback, setProfileFeedback] = useState<Feedback | null>(null);
    const [passwordFeedback, setPasswordFeedback] = useState<Feedback | null>(null);

    const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedName = name.trim();
        const updatedImage = image.trim();

        if (updatedName.length < 3) {
            setProfileFeedback({ type: "error", message: "Name must be at least 3 characters." });
            return;
        }

        if (!isOptionalHttpsUrl(updatedImage)) {
            setProfileFeedback({ type: "error", message: "Enter a valid HTTPS URL for your profile photo." });
            return;
        }

        setProfileFeedback(null);
        setIsSavingProfile(true);

        try {
            const { error } = await authClient.updateUser({
                name: updatedName,
                image: updatedImage || null,
            });

            if (error) {
                setProfileFeedback({ type: "error", message: error.message || "Unable to update your profile." });
                return;
            }

            setName(updatedName);
            setImage(updatedImage);
            setProfileFeedback({ type: "success", message: "Your profile has been updated." });
            router.refresh();
        } catch (error) {
            setProfileFeedback({
                type: "error",
                message: error instanceof Error ? error.message : "Unable to update your profile.",
            });
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const currentPassword = String(formData.get("currentPassword") ?? "");
        const newPassword = String(formData.get("newPassword") ?? "");
        const confirmPassword = String(formData.get("confirmPassword") ?? "");

        if (newPassword.length < 6 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword)) {
            setPasswordFeedback({
                type: "error",
                message: "New password must be at least 6 characters and include uppercase and lowercase letters.",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordFeedback({ type: "error", message: "New passwords do not match." });
            return;
        }

        setPasswordFeedback(null);
        setIsSavingPassword(true);

        try {
            const { error } = await authClient.changePassword({ currentPassword, newPassword });

            if (error) {
                setPasswordFeedback({ type: "error", message: error.message || "Unable to change your password." });
                return;
            }

            form.reset();
            setPasswordFeedback({ type: "success", message: "Your password has been changed." });
        } catch (error) {
            setPasswordFeedback({
                type: "error",
                message: error instanceof Error ? error.message : "Unable to change your password.",
            });
        } finally {
            setIsSavingPassword(false);
        }
    };

    return (
        <Modal>
            <Button
                isIconOnly
                aria-label="Edit profile"
                variant="ghost"
                className="absolute right-5 top-5 z-20 text-white hover:bg-white/10 sm:right-7 sm:top-7"
            >
                <PencilToSquare aria-hidden="true" className="size-5" />
            </Button>
            <Modal.Backdrop className="backdrop-blur-sm">
                <Modal.Container placement="center">
                    <Modal.Dialog className="w-full max-w-lg rounded-2xl p-2">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="font-serif text-2xl font-semibold text-[#292b25]">
                                Edit your profile
                            </Modal.Heading>
                            <p className="mt-1 text-sm leading-5 text-[#74756c]">
                                Update your reader details or change your password.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="max-h-[70vh] space-y-7 overflow-y-auto px-5">
                            <section aria-labelledby="profile-details-heading" className="space-y-4">
                                <h3 id="profile-details-heading" className="font-semibold text-[#315c4d]">
                                    Profile details
                                </h3>
                                <Form className="space-y-4" onSubmit={handleProfileSubmit}>
                                    <TextField
                                        isRequired
                                        name="name"
                                        className="w-full"
                                        validate={(value) => value.trim().length < 3 ? "Name must be at least 3 characters" : null}
                                    >
                                        <Label className="font-medium text-[#464940]">Full name</Label>
                                        <Input value={name} onChange={(event) => setName(event.target.value)} />
                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        name="image"
                                        type="url"
                                        className="w-full"
                                        validate={(value) => isOptionalHttpsUrl(value) ? null : "Enter a valid HTTPS URL"}
                                    >
                                        <Label className="font-medium text-[#464940]">Profile photo URL (optional)</Label>
                                        <Input
                                            value={image}
                                            onChange={(event) => setImage(event.target.value)}
                                            placeholder="https://example.com/photo.jpg"
                                        />
                                        <Description className="text-[#85867c]">
                                            Use an HTTPS image URL, or leave blank to remove your photo.
                                        </Description>
                                        <FieldError />
                                    </TextField>

                                    <FeedbackMessage feedback={profileFeedback} />
                                    <Button type="submit" isDisabled={isSavingProfile} className="w-full rounded-full bg-[#315c4d] font-semibold text-white hover:bg-[#25483c]">
                                        {isSavingProfile ? "Saving profile..." : "Save profile"}
                                    </Button>
                                </Form>
                            </section>

                            <section aria-labelledby="change-password-heading" className="space-y-4 border-t border-[#eee8dc] pt-6">
                                <div>
                                    <h3 id="change-password-heading" className="font-semibold text-[#315c4d]">
                                        Change password
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-[#85867c]">
                                        Enter your current password to set a new one.
                                    </p>
                                </div>
                                <Form className="space-y-4" onSubmit={handlePasswordSubmit}>
                                    <TextField isRequired name="currentPassword" type="password" className="w-full">
                                        <Label className="font-medium text-[#464940]">Current password</Label>
                                        <Input autoComplete="current-password" />
                                        <FieldError />
                                    </TextField>

                                    <TextField isRequired name="newPassword" type="password" className="w-full">
                                        <Label className="font-medium text-[#464940]">New password</Label>
                                        <Input autoComplete="new-password" />
                                        <Description className="text-[#85867c]">
                                            At least 6 characters, with uppercase and lowercase letters.
                                        </Description>
                                        <FieldError />
                                    </TextField>

                                    <TextField isRequired name="confirmPassword" type="password" className="w-full">
                                        <Label className="font-medium text-[#464940]">Confirm new password</Label>
                                        <Input autoComplete="new-password" />
                                        <FieldError />
                                    </TextField>

                                    <FeedbackMessage feedback={passwordFeedback} />
                                    <Button type="submit" isDisabled={isSavingPassword} variant="outline" className="w-full rounded-full border-[#dce4da] font-semibold text-[#315c4d] hover:bg-[#f1f5ef]">
                                        {isSavingPassword ? "Changing password..." : "Change password"}
                                    </Button>
                                </Form>
                            </section>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="outline" className="rounded-full">
                                Done
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
