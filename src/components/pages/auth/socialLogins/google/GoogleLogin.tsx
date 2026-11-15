import { authClient } from "@/lib/auth-client"
import { Button } from "@heroui/react"
import Image from "next/image"

export interface GoogleLoginProps {
    method: string
    callbackURL?: string
    className?: string
    onError?: (message: string) => void
}

export default function GoogleLogin({ method, callbackURL, className, onError }: GoogleLoginProps) {

    const handleGoogleLogins = async () => {

        const { data, error } = await authClient.signIn.social({
            provider: 'google',
            callbackURL,
            fetchOptions: {
                onError(err) {
                    if (onError) {
                        onError(err.error.message)
                    } else {
                        alert(err.error.message)
                    }
                }
            }
        });

        if (!error) {
            console.log(data);
        } else {
            onError?.(error.message ?? "Google sign-in failed. Please try again.");
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