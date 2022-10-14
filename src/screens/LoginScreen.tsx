import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../api/AuthService";

const LoginScreen = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    };

    const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const handleLogin = async () => {
        const success = await AuthService.login(username, password);
        if (success) navigate("/");
    };

    if (AuthService.isLoggedIn()) return <Navigate to="/" />;
    return (
        <div className="auth">
            <h2>Login</h2>
            <div>
                <div className="auth__label">Username</div>
                <input className="auth__input" type="text" value={username} onChange={onUsernameChange} />
            </div>
            <div>
                <div className="auth__label">Password</div>
                <input className="auth__input" type="password" value={password} onChange={onPasswordChange} />
            </div>
            <button onClick={handleLogin}>Login</button>
            <div>
                Don't have an account? <a href="/register">Register</a> now.
            </div>
        </div>
    );
};

export default LoginScreen;
