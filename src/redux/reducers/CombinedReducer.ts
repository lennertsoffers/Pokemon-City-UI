import { combineReducers } from "redux";
import ToolbarReducer from "./ToolbarReducer";

const CombinedReducer = combineReducers({
    toolbar: ToolbarReducer,
});

export default CombinedReducer;
