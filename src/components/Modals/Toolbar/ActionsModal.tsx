import Modal from "../Modal";

const ActionsModal = () => {
    return (
        <Modal title="test" onOpen={() => console.log("c")} onClose={() => console.log("c")}>
            <div>asdf</div>
        </Modal>
    );
};

export default ActionsModal;
