import Modal from "../Modal";

const CitizensModal = () => {
    return (
        <Modal title="test" onOpen={() => console.log("c")} onClose={() => console.log("c")}>
            <div>asdf</div>
        </Modal>
    );
};

export default CitizensModal;
