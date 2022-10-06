import ChunkType from "./ChunkType";

interface LayerType {
    chunks: Array<ChunkType>;
    id: number;
    spriteSheet: String;
}

export default LayerType;
