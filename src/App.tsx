import { useEffect } from "react";
import { useStore } from "react-redux";
import ErrorQueue from "./components/error/ErrorQueue";
import ErrorHandler from "./error/ErrorHandler";
import Routes from "./router/Routes";

// TODO - When dragging, do not listen to other events that use the mouse

function App() {
    const store = useStore();

    useEffect(() => {
        ErrorHandler.initialize(store);
    }, [store]);

    return (
        <div>
            <Routes />
            <ErrorQueue />
        </div>
    );
}

export default App;
