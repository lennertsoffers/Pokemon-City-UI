interface ModalProperties {
    title?: String;
    onClose?: CallableFunction;
    imageSource?: string;
    width?: number;
    height?: number;
    blur?: boolean;
    children: JSX.Element;
}

export default ModalProperties;
