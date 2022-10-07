import { CHUNK_DIMENSION } from "../../../config/config";
import ChunkData from "../../../types/interfaces/world/ChunkData";
import Tile from "./Tile";

const Chunk = ({ chunkData }: { chunkData: ChunkData }) => {
    const x = (chunkData.x / CHUNK_DIMENSION) * 100;
    const y = (chunkData.y / CHUNK_DIMENSION) * 100;

    return (
        <div
            className="chunk"
            style={{
                transform: `translate(${x}%, ${y}%)`,
            }}
        >
            <div style={{ position: "absolute", top: "13px", left: "10px", fontWeight: "bold", fontSize: "50px" }}>{chunkData.x.toString() + " " + chunkData.y.toString()}</div>
            {chunkData.data.map((tileId, index) => (
                <Tile key={index} tileIndex={index} tileId={tileId} chunkPosition={{ x: chunkData.x, y: chunkData.y }} />
            ))}
        </div>
    );
};

export default Chunk;
