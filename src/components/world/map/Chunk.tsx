import { CHUNK_DIMENSION } from "../../../config/config";
import ChunkData from "../../../types/interfaces/world/ChunkData";
import Tile from "./Tile";

/**
 * Component that renders a chunk in the world
 * Chunks consists of an array of {@link CHUNK_DIMENSION}^2 tiles
 * The tiles are displayed as a grid having {@link CHUNK_DIMENSION} on the x and y axis tiles
 *
 * Chunks are rendered as following:
 * -> The chunk is absolutely placed in the center of the world
 * -> The chunk is translated to its final position by converting its tile coordinates to pixel coordinates
 */
const Chunk = ({ chunkData, showLocationForBuildable }: { chunkData: ChunkData; showLocationForBuildable: Function }) => {
    const x = (chunkData.x / CHUNK_DIMENSION) * 100;
    const y = (chunkData.y / CHUNK_DIMENSION) * 100;

    return (
        <div
            data-x={chunkData.x}
            data-y={chunkData.y}
            className="chunk"
            style={{
                transform: `translate(${x}%, ${y}%)`,
            }}
        >
            {chunkData.data.map((tileId, index) => (
                <Tile key={index} tileIndex={index} tileId={tileId} chunkPosition={{ x: chunkData.x, y: chunkData.y }} showLocationForBuildable={showLocationForBuildable} />
            ))}
        </div>
    );
};

export default Chunk;
