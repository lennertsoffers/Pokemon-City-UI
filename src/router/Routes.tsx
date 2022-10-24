import { Navigate, Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import ProtectedComponent from "../auth/ProtectedComponent";
import GameScreen from "../screens/GameScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

/** Component that handles the routes in the app */
const Routes = () => {
    return (
        <BrowserRouter basename="/pokemon-city/">
            <Switch>
                <Route path="/" element={<ProtectedComponent />}>
                    <Route path="" element={<GameScreen />} />
                </Route>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
