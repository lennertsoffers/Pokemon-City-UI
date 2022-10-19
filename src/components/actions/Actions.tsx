import { useDispatch, useSelector } from "react-redux";
import { SELECT_ACTION, UNSELECT_ACTION } from "../../redux/actions/SelectedActionActions";
import ActionEnum from "../../types/enums/ActionEnum";
import CombinedState from "../../types/interfaces/states/CombinedState";

const Actions = () => {
    const dispatch = useDispatch();
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);

    const handleMoveClick = () => {
        if (action !== ActionEnum.MOVE) dispatch(SELECT_ACTION(ActionEnum.MOVE));
        else dispatch(UNSELECT_ACTION);
    };

    const handleDemolishClick = () => {
        if (action !== ActionEnum.DEMOLISH) dispatch(SELECT_ACTION(ActionEnum.DEMOLISH));
        else dispatch(UNSELECT_ACTION);
    };

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
