import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Toolbar from "./components/Toolbar/Toolbar";
import World from "./components/world/World";
import CombinedReducer from "./redux/reducers/CombinedReducer";

function App() {
    const store = configureStore({
        reducer: CombinedReducer,
    });

    return (
        <div className="game">
            <Provider store={store}>
                <World />
                <Toolbar />
            </Provider>
        </div>
    );
}

export default App;
