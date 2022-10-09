import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FALLBACK_SPRITESHEET, TILE_WIDTH } from "../../../config/config";
import { CREATE_BUILDING } from "../../../redux/actions/BuildablePlacementActions";
import { DESELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { UNSELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildableData from "../../../types/interfaces/world/BuildableData";
import Position from "../../../types/interfaces/world/Position";
import ChunkUtils from "../../../utils/ChunkUtils";
import BuildablePlacementMapper from "../../../utils/mappers/BuildablePlacementMapper";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";

const Tile = ({ tileId, tileIndex, chunkPosition, showLocationForBuildable }: { tileId: number; tileIndex: number; chunkPosition: Position; showLocationForBuildable: any }) => {
    const self = useRef<any>(null);
    const selectedAction = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);
    const dispatch = useDispatch();
    const x = (tileId - 1) * -TILE_WIDTH;

    const tileClickHandler = () => {
        switch (selectedAction) {
            case ActionEnum.BUILD:
                return tryBuild();
            case ActionEnum.MOVE:
                return console.log("move");
            case ActionEnum.DEMOLISH:
                return console.log("demolish");
            case ActionEnum.NONE:
                return console.log("none");
        }
    };

    const mouseEnterHandler = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        showLocationForBuildable(tileIndex, chunkPosition);
    };

    const tryBuild = () => {
        if (self.current == null) return;
        if (selectedBuildable == null) return;

        const location = selectedBuildable.spritesheetLocation;
        const spritesheet = selectedBuildable.spritesheet ? selectedBuildable.spritesheet : FALLBACK_SPRITESHEET;

        const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
        const worldPosition: Position = ChunkUtils.toWorldPosition(chunkPosition, tileIndex);
        const bottomRightWorldPosition = ChunkUtils.toBottomRightWorldPosition(worldPosition, dimensions);

        const body = {
            name: selectedBuildable.name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase(),
            x: bottomRightWorldPosition.x,
            y: bottomRightWorldPosition.y,
            buildableType: selectedBuildable.type,
        };

        axios
            .post("/api/buildables/build", body)
            .then(({ data }: { data: BuildableData }) => {
                dispatch(CREATE_BUILDING(BuildablePlacementMapper.toBuildablePlacement(data)));
                dispatch(DESELECT_BUILDING);
                dispatch(UNSELECT_ACTION);
            })
            .catch((error) => console.log(error.response.data));
    };

    return (
        <div
            data-index={tileIndex}
            ref={self}
            onClick={tileClickHandler}
            onMouseEnter={mouseEnterHandler}
            className="tile"
            style={{
                backgroundPosition: `${x}px 0`,
                backgroundImage: `url('./assets/spritesheets/terrain_spritesheet.png')`,
            }}
        ></div>
    );
};

export default Tile;
