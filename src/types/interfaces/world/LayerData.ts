import ChunkData from "./ChunkData";

interface LayerData {
    chunks: Array<ChunkData>;
    id: number;
    spriteSheet: string;
}

export default LayerData;
