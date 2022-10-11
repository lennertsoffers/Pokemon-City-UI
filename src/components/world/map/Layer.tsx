import LayerData from "../../../types/interfaces/world/LayerData";
import Chunk from "./Chunk";

const Layer = ({ layerData, showLocationForBuildable }: { layerData: LayerData; showLocationForBuildable: Function }) => {
    return (
        <div className="layer" data-id={layerData.id}>
            {layerData.chunks.map((chunk, index) => (
                <Chunk key={index} chunkData={chunk} showLocationForBuildable={showLocationForBuildable} />
            ))}
        </div>
    );
};

export default Layer;
