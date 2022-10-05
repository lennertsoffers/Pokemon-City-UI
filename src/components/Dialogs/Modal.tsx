import ModalProperties from "../../types/ModalProperties";

const Modal = (properties: ModalProperties) => {
    return (
        <div>
            <div>{properties.title}</div>
            {properties.children}
        </div>
    );
};

export default Modal;
