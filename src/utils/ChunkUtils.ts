import { CHUNK_DIMENSION } from "../config/config";
import SpritesheetDimension from "../types/interfaces/spritesheet/SpriteSheetDimension";
import SpritesheetLocation from "../types/interfaces/spritesheet/SpritesheetLocation";
import Position from "../types/interfaces/world/Position";
import SpritesheetUtils from "./SpritesheetUtils";

const ChunkUtils = (() => {
    const tileIndexToPosition = (tileIndex: number): Position => ({
        x: tileIndex % CHUNK_DIMENSION,
        y: Math.floor(tileIndex / CHUNK_DIMENSION),
    });

    const positionToIndex = (position: Position): number => position.y * CHUNK_DIMENSION + position.x;

    const toWorldPosition = (chunkPosition: Position, tileIndex: number): Position => {
        const tilePosition = tileIndexToPosition(tileIndex);
        return {
            x: chunkPosition.x + tilePosition.x,
            y: chunkPosition.y + tilePosition.y,
        };
    };

    const toChunkPositionAndTileIndex = (worldPosition: Position): { chunkPosition: Position; tileIndex: number } => {
        const x = Math.floor(worldPosition.x / CHUNK_DIMENSION) * CHUNK_DIMENSION;
        const y = Math.floor(worldPosition.y / CHUNK_DIMENSION) * CHUNK_DIMENSION;

        const tileIndex = positionToIndex({
            x: worldPosition.x - x,
            y: worldPosition.y - y,
        });

        return {
            chunkPosition: {
                x: x,
                y: y,
            },
            tileIndex: tileIndex,
        };
    };

    const getRightCornerWorldPosition = (location: SpritesheetLocation, chunkPosition: Position, tileIndex: number): Position => {
        const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
        const worldPosition: Position = toWorldPosition(chunkPosition, tileIndex);
        const bottomRightWorldPosition = toBottomRightWorldPosition(worldPosition, dimensions);

        return bottomRightWorldPosition;
    };

    /**
     * Takes a tile position and uses this as the center of the building
     * Based on the dimensions of the building in the spritesheet, the bottom right world tile is returned
     */
    const toBottomRightWorldPosition = (worldPosition: Position, dimensions: SpritesheetDimension): Position => {
        return {
            x: worldPosition.x + Math.floor(dimensions.width / 2),
            y: worldPosition.y + Math.floor(dimensions.height / 2),
        };
    };

    return {
        tileIndexToPosition,
        positionToIndex,
        toWorldPosition,
        toChunkPositionAndTileIndex,
        getRightCornerWorldPosition,
        toBottomRightWorldPosition,
    };
})();

export default ChunkUtils;
