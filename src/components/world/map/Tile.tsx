import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TILE_WIDTH } from "../../../config/config";
import { CREATE_BUILDING } from "../../../redux/actions/BuildablePlacementActions";
import { DESELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import Position from "../../../types/interfaces/world/Position";
import ChunkUtils from "../../../utils/ChunkUtils";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";

const Tile = ({ tileId, tileIndex, chunkPosition, showLocationForBuildable }: { tileId: number; tileIndex: number; chunkPosition: Position; showLocationForBuildable: any }) => {
    const self = useRef<any>(null);
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);
    const dispatch = useDispatch();
    const x = (tileId - 1) * -TILE_WIDTH;

    const tileClickHandler = () => {
        tryBuild();
    };

    const mouseEnterHandler = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        showLocationForBuildable(tileIndex, chunkPosition);
    };

    const tryBuild = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        const location = selectedBuildable.spritesheetLocation;

        const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
        const worldPosition: Position = ChunkUtils.toWorldPosition(chunkPosition, tileIndex);
        const bottomRightWorldPosition = ChunkUtils.toBottomRightWorldPosition(worldPosition, dimensions);
        const bottomRightChunkAndTile = ChunkUtils.toChunkPositionAndTileIndex(bottomRightWorldPosition);
        const buildingPosition = ChunkUtils.tileIndexToPosition(bottomRightChunkAndTile.tileIndex);
        const buildingChunkPosition = bottomRightChunkAndTile.chunkPosition;

        dispatch(
            CREATE_BUILDING({
                bottomRightPosition: buildingPosition,
                spritesheetLocation: location,
                spriteSheet: "house_spritesheet",
                chunkPosition: buildingChunkPosition,
            })
        );
        dispatch(DESELECT_BUILDING);
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
