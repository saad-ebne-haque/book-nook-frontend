import { Suspense } from "react";
import type { Metadata } from "next";
import ProfilePageContent from "@/components/pages/profile/ProfilePageContent";
import { ProfilePageSkeleton } from "@/components/pages/profile/ProfilePageContent";

export const metadata: Metadata = {
    title: "My Profile",
};

export default function ProfilePage() {
    return (
        <Suspense fallback={<ProfilePageSkeleton />}>
            <ProfilePageContent />
        </Suspense>
    );
}
