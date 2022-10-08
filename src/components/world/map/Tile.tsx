import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TILE_WIDTH } from "../../../config/config";
import { CREATE_BUILDING } from "../../../redux/actions/BuildablePlacementActions";
import { DESELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import Position from "../../../types/interfaces/world/Position";
import ChunkUtils from "../../../utils/ChunkUtils";

const Tile = ({ tileId, tileIndex, chunkPosition, showLocationForBuildable }: { tileId: number; tileIndex: number; chunkPosition: Position; showLocationForBuildable: any }) => {
    const self = useRef<any>(null);
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);
    const dispatch = useDispatch();
    const x = (tileId - 1) * -TILE_WIDTH;

    const tileClickHandler = () => {
        console.log({
            index: tileIndex,
            chunk: chunkPosition,
        });

        tryBuild();
    };

    const mouseEnterHandler = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        showLocationForBuildable(tileIndex, chunkPosition);
    };

    const mouseLeaveHandler = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        self.current.style.opacity = 1;
    };

    const tryBuild = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

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

        self.current.style.opacity = 1;
    };

    return (
        <div
            data-index={tileIndex}
            ref={self}
            onClick={tileClickHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className="tile"
            style={{
                backgroundPosition: `${x}px 0`,
                backgroundImage: `url('./assets/spritesheets/terrain_spritesheet.png')`,
            }}
        ></div>
    );
};

export default Tile;
