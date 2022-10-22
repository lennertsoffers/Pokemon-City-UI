import { Outlet, Navigate } from "react-router-dom";
import AuthService from "../api/AuthService";

/** Represents a component that can only be rendered if the user is logged in */
const ProtectedComponent = () => {
    if (AuthService.isLoggedIn()) {
        return <Outlet />;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default ProtectedComponent;
