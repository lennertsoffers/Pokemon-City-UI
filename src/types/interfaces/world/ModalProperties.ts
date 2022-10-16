interface ModalProperties {
    title?: String;
    onClose?: CallableFunction;
    imageSource?: string;
    transparent?: boolean;
    children: JSX.Element;
}

export default ModalProperties;
