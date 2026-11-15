import { authClient } from "@/lib/auth-client"
import { Button, toast } from "@heroui/react"
import Image from "next/image"

export interface GoogleLoginProps {
    method: string
    callbackURL?: string
    className?: string
    onError?: (message: string) => void
}

export default function GoogleLogin({ method, callbackURL, className, onError }: GoogleLoginProps) {

    const handleGoogleLogins = async () => {
        try {
            const { error } = await authClient.signIn.social({
                provider: 'google',
                callbackURL,
            });

            if (error) {
                const message = error.message || "Google sign-in failed. Please try again.";
                if (onError) {
                    onError(message);
                } else {
                    toast.danger(message);
                }
            }
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Google sign-in failed. Please try again.";

            if (onError) {
                onError(message);
            } else {
                toast.danger(message);
            }
        }

    }
    return (
        <>
            <Button className={className} variant={className ? "outline" : "primary"} onClick={handleGoogleLogins}>
                <Image src="/images/google-g-logo.png" alt="" width={20} height={20} className="size-5 shrink-0" />
                {method} with Google
            </Button>
        </>
    )
}