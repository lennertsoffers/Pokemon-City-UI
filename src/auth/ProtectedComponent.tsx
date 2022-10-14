import { Outlet, Navigate } from "react-router-dom";
import AuthService from "../api/AuthService";

const ProtectedComponent = () => {
    if (AuthService.isLoggedIn()) {
        return <Outlet />;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default ProtectedComponent;
