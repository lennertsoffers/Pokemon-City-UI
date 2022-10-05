import { useDispatch, useSelector } from "react-redux";
import { OPEN_ACTIONS_MENU, OPEN_BUILD_MENU, OPEN_CITIZENS_MENU } from "../../redux/actions/ToolbarActions";

const Toolbar = () => {
    const dispatch = useDispatch();
    const toolbarState = useSelector((state: { toolbar: any }) => state.toolbar);

    const handleBuildClick = () => dispatch(OPEN_BUILD_MENU);
    const handleActionsClick = () => dispatch(OPEN_ACTIONS_MENU);
    const handleCitizensClick = () => dispatch(OPEN_CITIZENS_MENU);

    return (
        <div className="toolbar">
            <div className="toolbar--inner">
                <nav>
                    <ul>
                        <li>
                            <button onClick={handleBuildClick}>BUILD</button>
                        </li>
                        <li>
                            <button onClick={handleActionsClick}>ACTIONS</button>
                        </li>
                        <li>
                            <button onClick={handleCitizensClick}>CITIZENS</button>
                        </li>
                    </ul>
                    <div>{toolbarState}</div>
                </nav>
            </div>
        </div>
    );
};

export default Toolbar;
