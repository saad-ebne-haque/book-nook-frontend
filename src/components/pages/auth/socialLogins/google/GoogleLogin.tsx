import { authClient } from "@/lib/auth-client"
import { Button } from "@heroui/react"

export interface GoogleLoginProps {
    method: string
}

export default function GoogleLogin({ method }: GoogleLoginProps) {

    const handleGoogleLogins = async () => {

        const { data, error } = await authClient.signIn.social({
            provider: 'google',
            fetchOptions: {
                onSuccess: () => {
                    alert(`Login success`)
                },
                onError(err) {
                    alert(err.error.message)
                }
            }
        });

        if (!error) {
            console.log(data);
        } else {
            console.log(error);
        }

    }
    return (
        <>
            <Button onClick={handleGoogleLogins}>{method} With Google</Button>
        </>
    )
}