import { CHUNK_DIMENSION, CHUNK_PIXELS, TILE_WIDTH } from "../../../config/config";
import BuildablePlacement from "../../../types/interfaces/world/BuildablePlacement";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";

const Building = ({ data }: { data: BuildablePlacement }) => {
    const dimensions = SpritesheetUtils.getDimension(data.spritesheetLocation);
    const x = (data.chunkPosition.x / CHUNK_DIMENSION) * 100;
    const y = (data.chunkPosition.y / CHUNK_DIMENSION) * 100;

    console.log(dimensions.offsetTop);

    return (
        <div
            style={{
                transform: `translate(${x}%, ${y}%)`,
                height: `${CHUNK_PIXELS}px`,
                width: `${CHUNK_PIXELS}px`,
                position: "absolute",
                top: "50%",
                left: "50%",
            }}
        >
            <div
                style={{
                    backgroundPosition: `${-dimensions.offsetLeft * TILE_WIDTH}px ${-dimensions.offsetTop}px`,
                    backgroundImage: `url('./assets/spritesheets/${data.spriteSheet}.png')`,
                    height: `${dimensions.height * TILE_WIDTH}px`,
                    width: `${dimensions.width * TILE_WIDTH}px`,
                    position: "absolute",
                    right: `${(CHUNK_DIMENSION - 1 - data.bottomRightPosition.x) * TILE_WIDTH}px`,
                    bottom: `${(CHUNK_DIMENSION - 1 - data.bottomRightPosition.y) * TILE_WIDTH}px`,
                }}
            ></div>
        </div>
    );
};

export default Building;
