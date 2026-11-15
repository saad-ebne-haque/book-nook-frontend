import { Suspense } from "react";
import ProfilePageContent from "@/components/pages/profile/ProfilePageContent";
import { ProfilePageSkeleton } from "@/components/pages/profile/ProfilePageContent";

export default function ProfilePage() {
    return (
        <Suspense fallback={<ProfilePageSkeleton />}>
            <ProfilePageContent />
        </Suspense>
    );
}
