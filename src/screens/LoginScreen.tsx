import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/AuthService";

/** Screen that shows the login form */
const LoginScreen = () => {
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
     * Handles clicking on the login button
     * Navigates to the main game screen if the login was successful
     */
    const handleLogin = async () => {
        const success = await AuthService.login(username, password);
        if (success) navigate("/");
    };

    /**
     * Handles clicking on the register button
     * Navigates to the register screen
     */
    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Login</h1>
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
                    <button onClick={handleLogin}>Login</button>
                    <img src="./assets/ui/link_pointer.png" alt="pointer" />
                </div>
                <div className="auth__switchAuth">
                    Don't have an account? <span onClick={handleRegisterClick}>Register</span> now.
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
