import LayerData from "../../../types/interfaces/world/LayerData";
import Chunk from "./Chunk";

/**
 * Component that wraps chunks in a layer so that multiple layers can be shown on top of each other
 */
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
