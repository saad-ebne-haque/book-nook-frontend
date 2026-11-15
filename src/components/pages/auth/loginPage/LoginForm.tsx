'use client';

import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, InputGroup, Label, TextField, toast } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GoogleLogin from "../socialLogins/google/GoogleLogin";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const requestedUrl = searchParams.get("callbackUrl") || '/';

    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setIsSubmitting(true);
        const formData = new FormData(form);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        try {
            const { error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: requestedUrl,
                fetchOptions: {
                    onSuccess: () => form.reset(),
                },
            });

            if (error) {
                toast.danger(error.message || "We couldn't sign you in. Check your details and try again.");
            }
        } catch (error) {
            toast.danger(
                error instanceof Error
                    ? error.message
                    : "We couldn't sign you in. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    className="w-full"
                    validate={(value) => {
                        if (!/^[A-Z0-9.\_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label className="font-medium text-[#464940]">Email address</Label>
                    <Input className="mt-1" placeholder="you@example.com" />
                    <FieldError />
                </TextField>

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
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label className="font-medium text-[#464940]">Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full"
                            type={isVisible ? "text" : "password"}
                            placeholder="Enter your password"
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
                    {isSubmitting ? "Signing in..." : "Sign in"}
                    {!isSubmitting && <Check aria-hidden="true" className="size-4" />}
                </Button>

                <div className="flex items-center gap-4 py-1" aria-hidden="true">
                    <span className="h-px flex-1 bg-[#e9e2d5]" />
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#929187]">or continue with</span>
                    <span className="h-px flex-1 bg-[#e9e2d5]" />
                </div>

                <GoogleLogin
                    method="Continue"
                    callbackURL={requestedUrl}
                    onError={(message) => toast.danger(message)}
                    className="min-h-12 w-full rounded-full border-[#dce4da] bg-white font-semibold text-[#3d443b] hover:bg-[#f5f7f2]"
                />
            </Form>
        </>
    );
};

export default LoginForm;