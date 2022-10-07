import ChunkType from "./ChunkType";

interface LayerType {
    chunks: Array<ChunkType>;
    id: number;
    spriteSheet: string;
}

export default LayerType;
