import { CHUNK_DIMENSION } from "../config/config";
import SpritesheetDimension from "../types/interfaces/spritesheet/SpriteSheetDimension";
import SpritesheetLocation from "../types/interfaces/spritesheet/SpritesheetLocation";
import Position from "../types/interfaces/world/Position";
import SpritesheetUtils from "./SpritesheetUtils";

/** Module containing util functions concerning buildables */
const ChunkUtils = (() => {
    /**
     * Converts an index of a tile in a chunk to the coordinates in that chunk
     * @param tileIndex The index of the tile in the chunk
     * @returns The coordinates of the tile in the chunk
     */
    const tileIndexToPosition = (tileIndex: number): Position => ({
        x: tileIndex % CHUNK_DIMENSION,
        y: Math.floor(tileIndex / CHUNK_DIMENSION),
    });

    /**
     * Converts a position in a chunk to the index in that chunk
     * @param position The coordiantes of the tile in the chunk
     * @returns The index of the tile in the chunk
     */
    const positionToIndex = (position: Position): number => position.y * CHUNK_DIMENSION + position.x;

    /**
     * Converts the index of a tile in a chunk to the coordinates the tile has in the world
     * @param chunkPosition The coordinates the chunk has in the world
     * @param tileIndex The index of the tile in the chunk
     * @returns The coordinates of the tile in the world
     */
    const toWorldPosition = (chunkPosition: Position, tileIndex: number): Position => {
        const tilePosition = tileIndexToPosition(tileIndex);
        return {
            x: chunkPosition.x + tilePosition.x,
            y: chunkPosition.y + tilePosition.y,
        };
    };

    /**
     * Converts the position of a tile in the world to the coordinates of the chunk and the tile index in that chunk
     * @param worldPosition The coordinates of the tile in the world
     * @returns The coordinates of the chunk in the world an the index of the tile in that chunk
     */
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

    /**
     * Converst a tile index in a chunk to the world position the bottom right tile that building has given the spritesheetLocation
     * -> The given tile index is seen as the center of the sprite
     * -> We need to return the bottom right corner as a world position
     * @param location The spritesheetLocation of the buildable
     * @param chunkPosition The position of the chunk the tile is a part of
     * @param tileIndex The index of the tile in that chunk
     * @returns The world position of the bottom right corner given that the passed tile is the center of the buildable
     */
    const getRightCornerWorldPosition = (location: SpritesheetLocation, chunkPosition: Position, tileIndex: number): Position => {
        // Get the dimensions of the sprite
        const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
        // Convert the tile in the chunk to a world position
        // This is the world position of the center tile of the buildable
        const worldPosition: Position = toWorldPosition(chunkPosition, tileIndex);
        // Get the bottom right position given the center position and the dimensions of the buildable
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
