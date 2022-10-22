import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ERROR_ANIMATION_TIME, ERROR_VISIBILITY_TIME } from "../../config/config";
import { REMOVE_ERROR } from "../../redux/actions/ErrorActions";
import ErrorMessageData from "../../types/interfaces/error/ErrorMessageData";

/**
 * Component that contains the message of one {@link ErrorMessageData}
 * Removes itself from the {@link ErrorQueue} after the {@link ERROR_VISIBILITY_TIME} runs out
 * @param errorMessage The message to be displayed in the component
 */
const ErrorMessage = ({ errorMessage }: { errorMessage: ErrorMessageData }) => {
    const [hidden, setHidden] = useState(false);
    const dispatch = useDispatch();

    /**
     * Hides the component and removes itself from the queue after the animation is done
     */
    const hide = useCallback(() => {
        // Makes the hidden state true
        // This means that the class 'errorMessage--hide' will be added to the component
        // An animation will start to play to hide this component
        setHidden(true);

        // Wait until the animation is done and than remove the message from the queue
        setTimeout(() => {
            dispatch(REMOVE_ERROR(errorMessage.uuid));
        }, ERROR_ANIMATION_TIME);
    }, [dispatch, errorMessage.uuid]);

    /**
     * Hides the message by clicking it
     */
    const handleErrorMessageClick = () => {
        hide();
    };

    /**
     * If the message was not removed yet by clicking, it will hide itself after {@link ERROR_VISIBILITY_TIME} runs out
     */
    useEffect(() => {
        setTimeout(() => {
            hide();
        }, ERROR_VISIBILITY_TIME);
    }, [hide]);

    return (
        <div onClick={handleErrorMessageClick} className={`errorMessage ${hidden ? "errorMessage--hide" : "errorMessage--shown"}`}>
            <div>{errorMessage.message}</div>
        </div>
    );
};

export default ErrorMessage;
