import { useState } from "react";
import AuthForm from "../components/AuthForm";

function AuthPage() {
    const [currentForm, setCurrentForm] = useState('login');

    const switchToSignup = () => setCurrentForm('signup');
    const switchToLogin = () => setCurrentForm('login');

    return (
        <div className="AuthPage">
            <div className="swich-forms">
                <button onClick={switchToLogin} disabled={currentForm === 'login'}>
                    Login
                </button>

                <button onClick={switchToSignup} disabled={currentForm === 'signup'}>
                    Sign Up
                </button>

                {currentForm === 'login' && <AuthForm operation="login" />}
                {currentForm === 'signup' && <AuthForm operation="signup" />}

            </div>
        </div>
    )


}

export default AuthPage;