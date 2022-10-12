const ValueBox = ({ value, onClick }: { value: string | number; onClick?: Function }) => {
    const handleValueBoxClick = () => {
        if (!onClick) return;

        onClick();
    };

    return (
        <div onClick={handleValueBoxClick}>
            <div className="hud__right--background">
                <img src="./assets/ui/databox.png" alt="valuebox" />
            </div>
            <div className="hud__right--foreground">
                <div>{value}</div>
            </div>
        </div>
    );
};

export default ValueBox;
