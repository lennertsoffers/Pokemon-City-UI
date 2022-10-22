import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../redux/actions/ModalActions";
import ModalProperties from "../../types/interfaces/world/ModalProperties";

/**
 * Parent component that children the modal behaviour
 * Covers the whole screen and shows the content of the modal in the middle
 * Clicking somewhere in the screen but not in the modal content box will close the modal
 */
const Modal = (properties: ModalProperties) => {
    const dispatch = useDispatch();

    /**
     * Checks if the user clicked inside or outside of the modal content
     * Closes the modal if it was outside of the content
     */
    const handleClickPage = (event: React.MouseEvent) => {
        if (!event.target) return;
        if ((event.target as Element).classList.contains("modal")) {
            handleClose();
        }
    };

    /**
     * Executes the callback onClose function from the parent and closes all modals
     */
    const handleClose = () => {
        if (properties.onClose) {
            properties.onClose();
        }

        dispatch(CLOSE_MODAL);
    };

    return (
        <div
            className="modal"
            onClick={handleClickPage}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
        >
            <div className="modal--inner">
                <div className="modal--inner--background">{properties.imageSource && <img src={properties.imageSource} alt="modal background" />}</div>
                <div className="modal--inner--foreground">
                    <div className="modal--inner__children">{properties.children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
