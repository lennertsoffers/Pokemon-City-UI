import { useDispatch, useSelector } from "react-redux";
import { TILE_WIDTH } from "../../config";
import { CREATE_BUILDING } from "../../redux/actions/BuildablePlacementActions";
import { DESELECT_BUILDING } from "../../redux/actions/BuildableSelectorActions";
import CombinedState from "../../types/interfaces/states/CombinedState";
import ChunkUtils from "../../utils/ChunkUtils";

const Tile = ({ tileId, tileIndex, chunkPosition, layerId, spritesheet }: { tileId: number; tileIndex: number; chunkPosition: { x: number; y: number }; layerId: number; spritesheet: string }) => {
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);
    const dispatch = useDispatch();
    const x = (tileId - 1) * -TILE_WIDTH;

    const tileClickHandler = () => {
        console.log({
            index: tileIndex,
            chunk: chunkPosition,
        });

        build();
    };

    const build = () => {
        if (selectedBuildable != null) {
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
