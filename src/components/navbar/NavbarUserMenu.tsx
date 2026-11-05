import { Avatar, Dropdown } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

import type { NavbarUser } from "./navbar.types";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function NavbarUserMenu({ user }: { user: NavbarUser }) {
  const initial = user.name.trim().charAt(0).toUpperCase();
  const image = user.image ?? user.avatarUrl;
  const router = useRouter();
  const handleSignout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully.", {
              duration: 1500,

            });
            router.refresh();
            router.push("/login");
          },
          onError: ({ error }) => {
            toast.error(error.message || "Sign-out failed. Please try again.");
          },
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Sign-out failed. Please try again.",
      );
    }
  }

  return (
    <div className="booknook-navbar-profile-area">
      <Dropdown>
        <Dropdown.Trigger
          className="booknook-navbar-profile-trigger"
          aria-label="Open profile menu"
        >
          <Avatar className="booknook-navbar-avatar" size="md">
            {image ? <Avatar.Image src={image} alt="" /> : null}
            <Avatar.Fallback>{initial}</Avatar.Fallback>
          </Avatar>
          <span className="booknook-navbar-profile-name">{user.name}</span>
          <ChevronDown className="booknook-navbar-chevron" aria-hidden="true" />
        </Dropdown.Trigger>
        <Dropdown.Popover
          className="booknook-navbar-dropdown-popover"
          placement="bottom end"
        >
          <div className="booknook-navbar-dropdown-user">
            <Avatar className="booknook-navbar-dropdown-avatar" size="lg">
              {image ? <Avatar.Image src={image} alt="" /> : null}
              <Avatar.Fallback>{initial}</Avatar.Fallback>
            </Avatar>
            <div className="booknook-navbar-dropdown-user-details">
              <p className="booknook-navbar-menu-user">{user.name}</p>
              {user.email ? (
                <p className="booknook-navbar-menu-email">{user.email}</p>
              ) : null}
            </div>
          </div>
          <div className="booknook-navbar-dropdown-divider" role="separator" />
          <Dropdown.Menu aria-label="Profile menu" className="booknook-navbar-dropdown-menu">
            <Dropdown.Item
              id="my-profile"
              href="/profile"
              className="booknook-navbar-profile-menu-item"
            >
              My Profile
            </Dropdown.Item>
            <Dropdown.Item
              id="logout"
              variant="danger"
              className="booknook-navbar-profile-menu-item booknook-navbar-logout"
              onClick={handleSignout}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
