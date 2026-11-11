import { Suspense } from "react";
import NavbarContent from "./NavbarContent";


export default function Navbar() {

    return (
        <>
            <Suspense>
                <NavbarContent></NavbarContent>
            </Suspense>
        </>
    );
}