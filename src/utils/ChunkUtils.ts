import { CHUNK_DIMENSION } from "../config";
import PositionType from "../types/PositionType";

const ChunkUtils = (() => {
    const tileIndexToPosition = (tileIndex: number): PositionType => ({
        x: tileIndex % CHUNK_DIMENSION,
        y: Math.floor(tileIndex / CHUNK_DIMENSION),
    });

    return {
        tileIndexToPosition,
    };
})();

export default ChunkUtils;
