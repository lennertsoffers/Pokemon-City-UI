import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../redux/actions/ModalActions";
import ModalProperties from "../../types/interfaces/world/ModalProperties";

const Modal = (properties: ModalProperties) => {
    const dispatch = useDispatch();

    const handleClickPage = (event: React.MouseEvent) => {
        if (!event.target) return;
        if ((event.target as Element).classList.contains("modal")) {
            handleClose();
        }
    };

    const handleClose = () => {
        if (properties.onClose) {
            properties.onClose();
        }

        dispatch(CLOSE_MODAL);
    };

    return (
        <div className="modal" onClick={handleClickPage}>
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
