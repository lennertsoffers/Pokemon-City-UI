import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";

const CombinedReducer = combineReducers({
    modal: ModalReducer,
});

export default CombinedReducer;
