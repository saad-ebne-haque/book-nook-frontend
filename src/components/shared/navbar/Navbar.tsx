import { Suspense } from "react";
import NavbarContent, { NavbarSkeleton } from "./NavbarContent";

export default function Navbar() {
    return (
        <Suspense fallback={<NavbarSkeleton />}>
            <NavbarContent />
        </Suspense>
    );
}