import { CHUNK_DIMENSION } from "../config/config";
import Position from "../types/interfaces/world/Position";

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

    return {
        tileIndexToPosition,
        positionToIndex,
        toWorldPosition,
        toChunkPositionAndTileIndex,
    };
})();

export default ChunkUtils;
