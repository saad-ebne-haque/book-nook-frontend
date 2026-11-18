'use client';

import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import ProfileImageField from "@/components/shared/profile/ProfileImageField";
import { uploadProfileImage } from "@/lib/profile-image-upload";
import GoogleLogin from "../socialLogins/google/GoogleLogin";

const RegistrationForm = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [pendingProfileImage, setPendingProfileImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");
        setIsSubmitting(true);

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
                image: profileImage.trim() || undefined,
                callbackURL: "/",
            });

            if (error) {
                toast.danger(error.message || "We couldn't create your account. Please try again.");
                return;
            }

            if (pendingProfileImage) {
                try {
                    const imageUrl = await uploadProfileImage(pendingProfileImage);
                    const { error: updateError } = await authClient.updateUser({ image: imageUrl });
                    if (updateError) {
                        throw new Error(updateError.message || "Unable to save the profile photo.");
                    }
                    toast.success("Account created and profile photo uploaded. You can now sign in.");
                } catch (error) {
                    toast.danger(
                        error instanceof Error
                            ? `Your account was created, but the profile photo could not be saved: ${error.message}`
                            : "Your account was created, but the profile photo could not be saved. You can add it from your profile later."
                    );
                }
            } else {
                toast.success("Account created successfully. You can now sign in.");
            }

            form.reset();
            setPassword("");
            setProfileImage("");
            setPendingProfileImage(null);
            router.push("/login");
        } catch (error) {
            toast.danger(
                error instanceof Error
                    ? error.message
                    : "We couldn't create your account. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            <TextField
                isRequired
                className="w-full"
                name="name"
                validate={(value) => value.length < 3 ? "Name must be at least 3 characters" : null}
            >
                <Label className="font-medium text-[#464940]">Name</Label>
                <Input placeholder="Your name" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                className="w-full"
                name="email"
                type="email"
                validate={(value) => (
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ? null
                        : "Please enter a valid email address"
                )}
            >
                <Label className="font-medium text-[#464940]">Email address</Label>
                <Input placeholder="you@example.com" />
                <FieldError />
            </TextField>

            <ProfileImageField
                value={profileImage}
                onChange={setProfileImage}
                deferUploadUntilRegistration
                onFileSelected={setPendingProfileImage}
            />

            <TextField
                isRequired
                className="w-full"
                name="password"
                validate={(value) => {
                    if (value.length < 6) {
                        return "Password must be at least 6 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                    }
                    if (!/[a-z]/.test(value)) {
                        return "Password must contain at least one lowercase letter";
                    }
                    return null;
                }}
            >
                <Label className="font-medium text-[#464940]">Password</Label>
                <InputGroup>
                    <InputGroup.Input
                        className="w-full"
                        type={isVisible ? "text" : "password"}
                        placeholder="Create a password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Suffix className="pe-0">
                        <Button
                            isIconOnly
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            size="sm"
                            variant="ghost"
                            onPress={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                        </Button>
                    </InputGroup.Suffix>
                </InputGroup>
                <Description className="text-[#85867c]">
                    Use at least 6 characters, including uppercase and lowercase letters.
                </Description>
                <FieldError />
            </TextField>

            <TextField
                isRequired
                className="w-full"
                name="reEnterPassword"
                validate={(value) => value !== password ? "Passwords don't match" : null}
            >
                <Label className="font-medium text-[#464940]">Confirm password</Label>
                <InputGroup>
                    <InputGroup.Input
                        className="w-full"
                        type={isVisible ? "text" : "password"}
                        placeholder="Enter your password again"
                    />
                    <InputGroup.Suffix className="pe-0">
                        <Button
                            isIconOnly
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            size="sm"
                            variant="ghost"
                            onPress={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                        </Button>
                    </InputGroup.Suffix>
                </InputGroup>
                <FieldError />
            </TextField>

            <Button
                type="submit"
                isDisabled={isSubmitting}
                className="mt-1 min-h-12 w-full rounded-full bg-[#315c4d] font-semibold text-white shadow-sm transition-colors hover:bg-[#25483c]"
            >
                {isSubmitting ? "Creating account..." : "Create account"}
                {!isSubmitting && <Check aria-hidden="true" className="size-4" />}
            </Button>

            <div className="flex items-center gap-4 py-1" aria-hidden="true">
                <span className="h-px flex-1 bg-[#e9e2d5]" />
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#929187]">or continue with</span>
                <span className="h-px flex-1 bg-[#e9e2d5]" />
            </div>

            <GoogleLogin
                method="Continue"
                callbackURL="/login"
                onError={(message) => toast.danger(message)}
                className="min-h-12 w-full rounded-full border-[#dce4da] bg-white font-semibold text-[#3d443b] hover:bg-[#f5f7f2]"
            />
        </Form>
    );
};

export default RegistrationForm;
