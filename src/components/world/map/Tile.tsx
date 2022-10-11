import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuildableService from "../../../api/BuildableService";
import DataLoader from "../../../api/DataLoader";
import { TILE_WIDTH } from "../../../config/config";
import { CREATE_BUILDING, MOVE_BUILDING } from "../../../redux/actions/BuildablePlacementActions";
import { DESELECT_BUILDING as UNSELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { UNSELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildableData from "../../../types/interfaces/world/BuildableData";
import buildableMoveData from "../../../types/interfaces/world/BuildableMoveData";
import Position from "../../../types/interfaces/world/Position";
import ChunkUtils from "../../../utils/ChunkUtils";
import BuildablePlacementMapper from "../../../utils/mappers/BuildablePlacementMapper";

const Tile = ({ tileId, tileIndex, chunkPosition, showLocationForBuildable }: { tileId: number; tileIndex: number; chunkPosition: Position; showLocationForBuildable: Function }) => {
    const self = useRef<any>(null);
    const selectedAction = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);
    const selectedBuildableId = useSelector((state: CombinedState) => state.buildableSelectorState.id);
    const dispatch = useDispatch();
    const x = (tileId - 1) * -TILE_WIDTH;

    const tileClickHandler = () => {
        switch (selectedAction) {
            case ActionEnum.BUILD:
                return tryBuild();
            case ActionEnum.MOVE:
                return tryMove();
            case ActionEnum.DEMOLISH:
            case ActionEnum.NONE:
                return;
        }
    };

    const mouseEnterHandler = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        showLocationForBuildable(tileIndex, chunkPosition);
    };

    const tryBuild = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        const bottomRightWorldPosition = ChunkUtils.getRightCornerWorldPosition(selectedBuildable.spritesheetLocation, chunkPosition, tileIndex);

        BuildableService.buildBuildable(bottomRightWorldPosition, selectedBuildable, (data: BuildableData) => {
            dispatch(CREATE_BUILDING(BuildablePlacementMapper.toBuildablePlacement(data)));
            dispatch(UNSELECT_BUILDING);
            dispatch(UNSELECT_ACTION);

            DataLoader.loadUserData();
        });
    };

    const tryMove = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;
        if (!selectedBuildableId) return;

        const bottomRightWorldPosition = ChunkUtils.getRightCornerWorldPosition(selectedBuildable.spritesheetLocation, chunkPosition, tileIndex);

        BuildableService.moveBuildable(selectedBuildableId, bottomRightWorldPosition, (buildableMoveData: buildableMoveData) => {
            dispatch(MOVE_BUILDING(buildableMoveData));
            dispatch(UNSELECT_BUILDING);
            dispatch(UNSELECT_ACTION);

            DataLoader.loadUserData();
        });
    };

    return (
        <div
            data-index={tileIndex}
            ref={self}
            onClick={tileClickHandler}
            onMouseEnter={mouseEnterHandler}
            className="tile"
            style={{
                backgroundPosition: `${x}px 0`,
                backgroundImage: `url('./assets/spritesheets/terrain_spritesheet.png')`,
            }}
        ></div>
    );
};

export default Tile;
