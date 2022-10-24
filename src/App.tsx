import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import AuthService from "./api/AuthService";
import ErrorQueue from "./components/error/ErrorQueue";
import Loading from "./components/Loading";
import ErrorHandler from "./error/ErrorHandler";
import Routes from "./router/Routes";

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const store = useStore();

    useEffect(() => {
        ErrorHandler.initialize(store);
        AuthService.initialize(store);
        setLoading(false);
    }, [store]);

    if (loading) return <Loading />;
    return (
        <div>
            <Routes />
            <ErrorQueue />
        </div>
    );
}

export default App;
