import LayerType from "../../types/LayerType";
import Chunk from "./Chunk";

const Layer = ({ layerData }: { layerData: LayerType }) => {
    return (
        <div className="layer">
            {layerData.chunks.map((chunk, index) => (
                <Chunk key={index} chunkData={chunk} layerId={layerData.id} spritesheet={layerData.spriteSheet} />
            ))}
        </div>
    );
};

export default Layer;
