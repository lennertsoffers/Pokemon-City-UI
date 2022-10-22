/** Component that contains a value with a nice box style provided by the parent */
const ValueBox = ({ value, onClick, link }: { value: string | number; onClick?: Function; link?: boolean }) => {
    /**
     * Triggers the onClick function from the parent if its provided
     */
    const handleValueBoxClick = () => {
        if (!onClick) return;

        onClick();
    };

    return (
        <div className={`valueBox ${link ? "valueBox--link" : ""}`} onClick={handleValueBoxClick}>
            <div className="valueBox--background">
                <img src="./assets/ui/databox.png" alt="valuebox" />
            </div>
            <div className="valueBox--foreground">
                <div>{value}</div>
            </div>
        </div>
    );
};

export default ValueBox;
