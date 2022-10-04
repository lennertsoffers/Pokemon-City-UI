import ChunkType from "./ChunkType";

interface LayerType {
    chunks: Array<ChunkType>;
    id: Number;
    spriteSheet: String;
}

export default LayerType;
