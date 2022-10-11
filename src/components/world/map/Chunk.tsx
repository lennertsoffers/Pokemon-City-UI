import { CHUNK_DIMENSION } from "../../../config/config";
import ChunkData from "../../../types/interfaces/world/ChunkData";
import Tile from "./Tile";

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
