import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/AuthService";

/** Screen that shows the registration form */
const RegisterScreen = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /**
     * Changes the username state when the user changes the content of the input
     */
    const onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    };

    /**
     * Changes the password state when the user changes the content of the input
     */
    const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    /**
     * Handles clicking on the registration button
     * Navigates to the main game screen if the registration was successful
     */
    const handleRegister = async () => {
        const success = await AuthService.register(username, password);
        if (success) navigate("/");
    };

    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Register</h1>
                <div>
                    <div className="auth__label">Username</div>
                    <input className="auth__input" type="text" value={username} onChange={onUsernameChange} />
                </div>
                <div>
                    <div className="auth__label">Password</div>
                    <input className="auth__input" type="password" value={password} onChange={onPasswordChange} />
                </div>
                <div className="auth__submit">
                    <img src="./assets/ui/link_pointer.png" alt="pointer" />
                    <button onClick={handleRegister}>Register</button>
                    <img src="./assets/ui/link_pointer.png" alt="pointer" />
                </div>
                <div className="auth__switchAuth">
                    Already have an account? <a href="/login">Login</a>.
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
