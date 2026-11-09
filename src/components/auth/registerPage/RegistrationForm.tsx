'use client';
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const RegistrationForm = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { data: resData, error } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            image: data.image,
            callbackURL: "/",
            fetchOptions: {
                onSuccess: () => {
                    form.reset();
                    setPassword("");
                    router.push('/')
                    console.log(`Registration success`)
                },
                onError(err) {
                    alert(err.error.message)
                }
            }
        });

        if (!error) {
            console.log(resData);
        } else {
            console.log(error);
        }

    };

    return (
        <>

            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    name="image"
                    type="url"
                >
                    <Label>Image URL (Optional)</Label>
                    <Input placeholder="https://example.com/profile.jpg" />
                    <Description>Enter your profile photo URL (optional)</Description>
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    className="w-full "
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
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full "
                            type={isVisible ? "text" : "password"}
                            placeholder="Enter your password"
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
                    <Description>Must be at least 6 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>


                <TextField
                    isRequired
                    className="w-full "
                    name="reEnterPassword"
                    validate={(value) => {
                        if (value !== password) {
                            return "Password don't match";
                        }
                        return null;
                    }}
                >
                    <Label>Re-enter Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full "
                            type={isVisible ? "text" : "password"}
                            placeholder="Re-enter your password"

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
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default RegistrationForm;