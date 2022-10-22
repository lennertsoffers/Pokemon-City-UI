import { useDispatch, useSelector } from "react-redux";
import { SELECT_ACTION, UNSELECT_ACTION } from "../../redux/actions/SelectedActionActions";
import ActionEnum from "../../types/enums/ActionEnum";
import CombinedState from "../../types/interfaces/states/CombinedState";

/**
 * Component containing the user actions concerning buildables
 * - Move
 * - Demolish
 */
const Actions = () => {
    const dispatch = useDispatch();
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);

    const handleMoveClick = () => {
        // If the move action is not selected yet, select this
        if (action !== ActionEnum.MOVE) dispatch(SELECT_ACTION(ActionEnum.MOVE));
        // If the move action is selected, unselect it
        else dispatch(UNSELECT_ACTION);
    };

    const handleDemolishClick = () => {
        // If the demolish action is not selected yet, select it
        if (action !== ActionEnum.DEMOLISH) dispatch(SELECT_ACTION(ActionEnum.DEMOLISH));
        // If the demolish action is selected, unselect it
        else dispatch(UNSELECT_ACTION);
    };

    // If an action is selected, the corresponding button gets an opacity of 1, 0.7 otherwise
    const moveOpacity = action === ActionEnum.MOVE ? "1" : "0.7";
    const demolishOpacity = action === ActionEnum.DEMOLISH ? "1" : "0.7";

    return (
        <div className="actions">
            <button
                onClick={handleMoveClick}
                style={{
                    opacity: moveOpacity,
                }}
            >
                <img src="./assets/ui/move.png" alt="move" />
            </button>
            <button
                onClick={handleDemolishClick}
                style={{
                    opacity: demolishOpacity,
                }}
            >
                <img src="./assets/ui/demolish.png" alt="demolish" />
            </button>
        </div>
    );
};

export default Actions;
