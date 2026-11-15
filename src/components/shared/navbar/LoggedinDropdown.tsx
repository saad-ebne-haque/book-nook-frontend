
"use client";

import type { User } from "better-auth";
import { useRouter } from "next/navigation";
import {
    Avatar,
    Description,
    Dropdown,
    Label,
    toast,
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
        try {
            const { error } = await authClient.signOut();
            if (error) {
                toast.danger(error.message || "Failed to sign out.");
                return;
            }

            toast.success("You have signed out.");
            router.refresh();
            router.push('/login');
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to sign out."
            );
        }
    };


    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="flex cursor-pointer items-center gap-2 rounded-full border border-[#e9e2d5] bg-white/80 py-1 pl-1 pr-3 shadow-sm transition-colors hover:border-[#cbd9c9] hover:bg-[#f5f7f2]">
                    <Avatar size="sm" className="ring-2 ring-[#eaf0e9]">
                        <Avatar.Image src={user.image || ""} alt={user.name} />
                        <Avatar.Fallback className="bg-[#315c4d] font-semibold text-white">
                            {user.name?.charAt(0).toUpperCase()}
                        </Avatar.Fallback>
                    </Avatar>
                    <span className="hidden max-w-28 truncate text-sm font-semibold text-[#3d443b] sm:block">
                        {user.name}
                    </span>
                    <svg aria-hidden="true" className="hidden size-3.5 text-[#7b806f] sm:block" fill="none" viewBox="0 0 20 20">
                        <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                    </svg>
                </span>
            </Dropdown.Trigger>

            <Dropdown.Popover className="min-w-60 rounded-2xl border border-[#e9e2d5] bg-[#fffdf9] p-1.5 shadow-xl">
                <Dropdown.Menu
                    aria-label="User menu"
                    className="outline-none"
                    onAction={(key) => {
                        if (key === "profile") {
                            router.push("/profile");
                        }

                        if (key === "signout") {
                            handleSignOut();
                        }
                    }}
                >
                    <Dropdown.Item id="user-info" textValue="User information" className="rounded-xl p-3">
                        <Avatar size="lg" className="ring-2 ring-[#eaf0e9]">
                            <Avatar.Image
                                src={user.image || ""}
                                alt={user.name}
                            />
                            <Avatar.Fallback className="bg-[#315c4d] font-semibold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </Avatar.Fallback>
                        </Avatar>

                        <div className="flex min-w-0 flex-col">
                            <Label className="truncate font-semibold text-[#292b25]">{user.name}</Label>
                            <Description className="truncate text-[#7b806f]">{user.email}</Description>
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile" className="rounded-xl">
                        <Person className="size-4 shrink-0" />
                        <Label>My Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="signout"
                        textValue="Sign out"
                        variant="danger"
                        className="rounded-xl"
                    >
                        <ArrowRightFromSquare className="size-4 shrink-0 text-danger" />
                        <Label>Sign out</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );

}
