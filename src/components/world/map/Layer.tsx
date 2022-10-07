import LayerData from "../../../types/interfaces/world/LayerData";
import Chunk from "./Chunk";

const Layer = ({ layerData }: { layerData: LayerData }) => {
    return (
        <div className="layer">
            {layerData.chunks.map((chunk, index) => (
                <Chunk key={index} chunkData={chunk} />
            ))}
        </div>
    );
};

export default Layer;
