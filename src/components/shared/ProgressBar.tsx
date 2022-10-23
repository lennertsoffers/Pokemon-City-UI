import StringUtils from "../../utils/StringUtils";

/**
 * Component that displays progress in a nice progresbar
 * - Value: The current value in the bar
 * - Max: The max value the bar can reach
 * - DisplayMaxValue: Wether the bar should display the max value if the value has reached its maximum or just "MAX"
 * - HasMaxValue: Wether there is a max value or the bar should just display the filled bar with the current value
 */
const ProgressBar = ({ value, max, displayMaxValue = false, hasMaxValue = true }: { value: number; max: number; displayMaxValue?: boolean; hasMaxValue?: boolean }) => {
    // The width of the bar the the percentage of the current val in correlation with the max val
    // Or 100 if there is no max value
    const width = hasMaxValue ? (value / max) * 100 : 100;
    // Create a string with the percentage sign
    const widthPercentage = `${width}%`;

    // Get "MAX" or a simplified value from the precise value
    const getValue = () => {
        if (!displayMaxValue && value === max) return "MAX";
        return StringUtils.simplify(value);
    };

    // Don't display the fill bar if the value is 0
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
                            className={hasMaxValue ? "" : "progressBar__bar--background__progress--fullWidth"}
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
            {hasMaxValue && <div className="progressBar__max">{StringUtils.simplify(max)}</div>}
        </div>
    );
};

export default ProgressBar;
