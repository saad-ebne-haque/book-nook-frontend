import LoginForm from "@/components/pages/auth/loginPage/LoginForm";
import { Suspense } from "react";

const RegisterPage = () => {


    return (
        <>
            <Suspense>

                <LoginForm></LoginForm>
            </Suspense>
        </>
    );
};

export default RegisterPage;