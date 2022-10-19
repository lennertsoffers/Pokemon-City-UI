import StringUtils from "../../utils/StringUtils";

const ProgressBar = ({ value, max, displayMaxValue = false }: { value: number; max: number; displayMaxValue?: boolean }) => {
    const width = (value / max) * 100;
    const widthPercentage = `${width}%`;
    const getValue = () => {
        if (!displayMaxValue && value === max) return "MAX";
        return StringUtils.simplify(value);
    };
    const display = value > 0 ? "block" : "none";

    return (
        <div className="progressBar">
            <div className="progressBar__bar">
                <div className="progressBar__bar--background">
                    <div className="progressBar__bar--background__frame">
                        <img src="./assets/ui/progressbar_left.png" alt="progressbar left" />
                        <img src="./assets/ui/progressbar_center.png" alt="progressbar center" />
                        <img src="./assets/ui/progressbar_right.png" alt="progressbar right" />
                    </div>
                    <div className="progressBar__bar--background__progress">
                        <img
                            style={{
                                width: widthPercentage,
                            }}
                            src="./assets/ui/progressbar_progress_fill.png"
                            alt="progressbar fill"
                        />
                        <img
                            style={{
                                display: display,
                            }}
                            src="./assets/ui/progressbar_progress_end.png"
                            alt="progressbar fill"
                        />
                    </div>
                </div>
                <div className="progressBar__bar--foreground">
                    <div className="progressBar__bar__inner__value">{getValue()}</div>
                </div>
            </div>
            <div className="progressBar__max">{StringUtils.simplify(max)}</div>
        </div>
    );
};

export default ProgressBar;
