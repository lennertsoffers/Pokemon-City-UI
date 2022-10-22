import { useSelector } from "react-redux";
import ErrorMessageData from "../../types/interfaces/error/ErrorMessageData";
import CombinedState from "../../types/interfaces/states/CombinedState";
import ErrorMessage from "./ErrorMessage";

/**
 * Component that serves as a container holding all the {@link ErrorMessage} that are spawned
 * Acts as a queue where the first spawned error message is on top
 */
const ErrorQueue = () => {
    const errorMessages = useSelector((state: CombinedState) => state.errorState.errorMessages);

    return (
        <div className="errorQueue">
            {errorMessages.map((errorMessages: ErrorMessageData) => (
                <ErrorMessage errorMessage={errorMessages} key={errorMessages.uuid} />
            ))}
        </div>
    );
};

export default ErrorQueue;
