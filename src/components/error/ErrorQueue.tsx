import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ERROR } from "../../redux/actions/ErrorActions";
import ErrorMessageData from "../../types/interfaces/error/ErrorMessageData";
import CombinedState from "../../types/interfaces/states/CombinedState";
import ErrorMessage from "./ErrorMessage";

const ErrorQueue = () => {
    const errorMessages = useSelector((state: CombinedState) => state.errorState.errorMessages);
    const dispatch = useDispatch();

    const removeByUuid = (uuid: string) => {
        dispatch(REMOVE_ERROR(uuid));
    };

    return (
        <div className="errorQueue">
            {errorMessages.map((errorMessages: ErrorMessageData) => (
                <ErrorMessage errorMessage={errorMessages} removeByUuid={removeByUuid} key={errorMessages.uuid} />
            ))}
        </div>
    );
};

export default ErrorQueue;
