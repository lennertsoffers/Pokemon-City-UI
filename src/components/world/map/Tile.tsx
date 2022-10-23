import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuildableService from "../../../api/BuildableService";
import DataLoader from "../../../api/DataLoader";
import RoadService from "../../../api/RoadService";
import { TILE_WIDTH } from "../../../config/config";
import { CREATE_BUILDING, MOVE_BUILDING } from "../../../redux/actions/BuildableDataActions";
import { DESELECT_BUILDING as UNSELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { LOAD_ROADS } from "../../../redux/actions/RoadActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildableData from "../../../types/interfaces/world/BuildableData";
import buildableMoveData from "../../../types/interfaces/world/BuildableMoveData";
import Position from "../../../types/interfaces/world/Position";
import ChunkUtils from "../../../utils/ChunkUtils";
import BuildableDataMapper from "../../../utils/mappers/BuildableDataMapper";

/**
 * Component that makes one tile in the world living in a chunk component
 * The background of the tile is set to the terrain spritesheet and then positioned that the right tile is shown
 * Tiles are clickable and will handle the click correspondent to the selected action
 */
const Tile = ({ tileId, tileIndex, chunkPosition, showLocationForBuildable }: { tileId: number; tileIndex: number; chunkPosition: Position; showLocationForBuildable: Function }) => {
    const self = useRef<any>(null);
    const [showLocationForRoad, setShowLocationForRoad] = useState<boolean>(false);
    const selectedAction = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);
    const selectedBuildableId = useSelector((state: CombinedState) => state.buildableSelectorState.id);
    const dispatch = useDispatch();
    // X = the x position on the terrain spritesheet
    const x = (tileId - 1) * -TILE_WIDTH;

    /**
     * Handles clicking the tile by executing the function that corresponds to the selected action
     */
    const tileClickHandler = () => {
        switch (selectedAction) {
            case ActionEnum.BUILD:
                return tryBuild();
            case ActionEnum.PLACE_ROAD:
                return tryBuildRoad();
            case ActionEnum.MOVE:
                return tryMove();
            case ActionEnum.DEMOLISH:
            case ActionEnum.NONE:
                return;
        }
    };

    /**
     * Handles entering the tile with the mouse
     * -> Sets the showLocationForRoad to true if the selected action is placing roads
     * -> Calls the showLocationForBuildalbe from the parent if a buildable is selected
     */
    const mouseEnterHandler = () => {
        if (self.current == null) return;
        if (selectedAction === ActionEnum.PLACE_ROAD) return setShowLocationForRoad(true);
        if (selectedBuildable !== null) return showLocationForBuildable(tileIndex, chunkPosition);
    };

    /**
     * Hide the road placement preview if the mouse leaves the tile
     */
    const mouseLeaveHandler = () => setShowLocationForRoad(false);

    /**
     * Tries to build the selected buildable on the current position
     * -> First calculates the bottom right position from the current location of the priview (the mouse is positioned in the center of the preview but to send the build request, you need the bottom right position)
     * -> Calls the Api to try to build on that location
     */
    const tryBuild = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        let bottomRightWorldPosition = ChunkUtils.getRightCornerWorldPosition(selectedBuildable.spritesheetLocation, chunkPosition, tileIndex);

        BuildableService.buildBuildable(bottomRightWorldPosition, selectedBuildable, (data: BuildableData) => {
            dispatch(CREATE_BUILDING(BuildableDataMapper.toBuildableData(data)));
            DataLoader.loadUserData();
        });
    };

    /**
     * Tries to build the road on the current clicked position
     */
    const tryBuildRoad = async () => {
        if (self.current == null) return;

        const worldPosition = ChunkUtils.toWorldPosition(chunkPosition, tileIndex);
        const roads = await RoadService.buildRoad(worldPosition);
        if (!roads) return;

        dispatch(LOAD_ROADS(roads));
    };

    /**
     * Tries to move the selected buildable to the current position
     * -> First calculates the bottom right position from the current location of the priview (the mouse is positioned in the center of the preview but to send the build request, you need the bottom right position)
     * -> Calls the Api to try to move to that location
     */
    const tryMove = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;
        if (!selectedBuildableId) return;

        const bottomRightWorldPosition = ChunkUtils.getRightCornerWorldPosition(selectedBuildable.spritesheetLocation, chunkPosition, tileIndex);

        BuildableService.moveBuildable(selectedBuildableId, bottomRightWorldPosition, (buildableMoveData: buildableMoveData) => {
            dispatch(MOVE_BUILDING(buildableMoveData));
            dispatch(UNSELECT_BUILDING);

            DataLoader.loadUserData();
        });
    };

    return (
        <div
            data-index={tileIndex}
            ref={self}
            onClick={tileClickHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className="tile"
            style={{
                backgroundPosition: `${x}px 0`,
                backgroundImage: `url('./assets/spritesheets/terrain_spritesheet.png')`,
            }}
        >
            {showLocationForRoad && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 900,
                        border: `4px dashed rgba(150, 0, 0, 0.8)`,
                        backgroundColor: `rgba(255, 0, 0, 0.3)`,
                        width: `${TILE_WIDTH * 2 - 10}px`,
                        height: `${TILE_WIDTH * 2 - 10}px`,
                        transform: `translate(-${TILE_WIDTH - 5}px, -${TILE_WIDTH - 5}px)`,
                        pointerEvents: "none",
                    }}
                ></div>
            )}
        </div>
    );
};

export default Tile;
