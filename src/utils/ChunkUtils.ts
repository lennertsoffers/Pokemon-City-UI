import { CHUNK_DIMENSION } from "../config";
import Position from "../types/interfaces/world/Position";

const ChunkUtils = (() => {
    const tileIndexToPosition = (tileIndex: number): Position => ({
        x: tileIndex % CHUNK_DIMENSION,
        y: Math.floor(tileIndex / CHUNK_DIMENSION),
    });

    return {
        tileIndexToPosition,
    };
})();

export default ChunkUtils;
