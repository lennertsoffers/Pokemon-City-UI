import { useCallback, useEffect, useState } from "react";
import { ERROR_ANIMATION_TIME, ERROR_VISIBILITY_TIME } from "../../config/config";
import ErrorMessageData from "../../types/interfaces/error/ErrorMessageData";

const ErrorMessage = ({ errorMessage, removeByUuid }: { errorMessage: ErrorMessageData; removeByUuid: Function }) => {
    const [hidden, setHidden] = useState(false);

    const hide = useCallback(() => {
        setHidden(true);

        setTimeout(() => {
            removeByUuid(errorMessage.uuid);
        }, ERROR_ANIMATION_TIME);
    }, [errorMessage.uuid, removeByUuid]);

    const handleErrorMessageClick = () => {
        hide();
    };

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
