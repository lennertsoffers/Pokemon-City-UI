const ProgressBar = ({ value, max, displayMaxValue = false }: { value: number; max: number; displayMaxValue?: boolean }) => {
    const width = (value / max) * 100;
    const widthPercentage = `${width}%`;
    const getValue = () => {
        if (!displayMaxValue && value === max) return "MAX";
        if (width < 5) return "";
        return value;
    };

    return (
        <div className="progressBar">
            <div className="progressBar__bar">
                <div
                    style={{
                        width: widthPercentage,
                    }}
                    className="progressBar__bar__inner"
                >
                    <div className="progressBar__bar__inner__value">{getValue()}</div>
                </div>
            </div>
            <div className="progressBar__max">{max}</div>
        </div>
    );
};

export default ProgressBar;
