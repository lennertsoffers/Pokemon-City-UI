import { useDispatch, useSelector } from "react-redux";
import { DESELECT_BUILDING } from "../../redux/actions/BuildingSelectorActions";
import { CREATE_BUILDING } from "../../redux/actions/MapActions";
import ChunkUtils from "../../utils/ChunkUtils";
import { TILE_DIMENSION } from "./Constants";

const Tile = ({ tileId, tileIndex, chunkPosition, layerId, spritesheet }: { tileId: number; tileIndex: number; chunkPosition: { x: number; y: number }; layerId: number; spritesheet: string }) => {
    const x = (tileId - 1) * -TILE_DIMENSION;
    const selectedBuildingType = useSelector((state: any) => state.buildingSelector.type);
    const dispatch = useDispatch();

    const tileClickHandler = () => {
        console.log({
            index: tileIndex,
            chunk: chunkPosition,
        });

        build();
    };

    const build = () => {
        if (selectedBuildingType != null) {
            dispatch(
                CREATE_BUILDING({
                    bottomRightPosition: ChunkUtils.tileIndexToPosition(tileIndex),
                    spritesheetLocation: {
                        topLeft: 144,
                        bottomRight: 162,
                    },
                    spriteSheet: "house_spritesheet",
                    chunkPosition: chunkPosition,
                })
            );

            dispatch(DESELECT_BUILDING);
        }
    };

    return (
        <div
            onClick={tileClickHandler}
            className="tile"
            style={{
                backgroundPosition: `${x}px 0`,
                backgroundImage: `url('./assets/spritesheets/${spritesheet}.png')`,
            }}
        ></div>
    );
};

export default Tile;
