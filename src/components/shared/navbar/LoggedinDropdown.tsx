
"use client";

import type { User } from "better-auth";
import { useRouter } from "next/navigation";
import {
    Avatar,
    Description,
    Dropdown,
    Label,
} from "@heroui/react";
import {
    Person,
    ArrowRightFromSquare,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

interface LoggedinDropdownProps {
    user: User;
}

export default function LoggedinDropdown({
    user,
}: LoggedinDropdownProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess() {
                    router.refresh();
                    router.push('/login');
                    alert('SignOut Successfull');
                }
            }
        })
    };


    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="flex items-center gap-2">
                    <Avatar size="sm">
                        <Avatar.Image
                            src={user.image || ""}
                            alt={user.name}
                        />
                        <Avatar.Fallback>
                            {user.name?.charAt(0).toUpperCase()}
                        </Avatar.Fallback>
                    </Avatar>

                    <span>{user.name}</span>
                </span>
            </Dropdown.Trigger>

            <Dropdown.Popover>
                <Dropdown.Menu
                    aria-label="User menu"
                    onAction={(key) => {
                        if (key === "profile") {
                            router.push("/profile");
                        }

                        if (key === "signout") {
                            handleSignOut();
                        }
                    }}
                >
                    <Dropdown.Item id="user-info" textValue="User information">
                        <Avatar size="lg">
                            <Avatar.Image
                                src={user.image || ""}
                                alt={user.name}
                            />
                            <Avatar.Fallback>
                                {user.name?.charAt(0).toUpperCase()}
                            </Avatar.Fallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <Label>{user.name}</Label>
                            <Description>{user.email}</Description>
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                        <Person className="size-4 shrink-0" />
                        <Label>Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="signout"
                        textValue="Sign out"
                        variant="danger"
                    >
                        <ArrowRightFromSquare className="size-4 shrink-0 text-danger" />
                        <Label>Sign out</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );

}
