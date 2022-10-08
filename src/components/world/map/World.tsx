import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHUNK_PIXELS, TILE_WIDTH } from "../../../config/config";
import { LOAD_MAP_DATA } from "../../../redux/actions/MapActions";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildablePlacement from "../../../types/interfaces/world/BuildablePlacement";
import LayerData from "../../../types/interfaces/world/LayerData";
import Position from "../../../types/interfaces/world/Position";
import ChunkUtils from "../../../utils/ChunkUtils";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import Building from "../building/Building";
import Layer from "./Layer";
import map from "./map";

const World = () => {
    const world = useRef<any>(null);
    const dispatch = useDispatch();
    const mapData = useSelector((state: CombinedState) => state.mapState.mapData);
    const buildablePlacements = useSelector((state: CombinedState) => state.buildablePlacementState.buildablePlacements);
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);

    const mouseMoveHandler = (e: any) => {
        if (e.buttons !== 1) return;
        if (world.current == null) return;

        const worldElement = world.current;

        // We don't make a state because updating the state on every mouseMove event
        // is more demanding than reading the scroll position of the element
        const newX = worldElement.scrollLeft - e.movementX;
        const newY = worldElement.scrollTop - e.movementY;

        world.current.scrollTo(newX, newY);
    };

    const showLocationForBuildable = (tileIndex: number, chunkPosition: Position) => {
        if (world.current == null) return;
        if (selectedBuildable == null) return;

        const worldElement = world.current;

        const location = selectedBuildable.spritesheetLocation;

        const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
        const worldPosition: Position = ChunkUtils.toWorldPosition(chunkPosition, tileIndex);
        const bottomRightWorldPosition = ChunkUtils.toBottomRightWorldPosition(worldPosition, dimensions);

        const displayWidth = dimensions.width * TILE_WIDTH;
        const displayHeight = dimensions.height * TILE_WIDTH;

        worldElement.querySelector(".buildingActionWrapper").innerHTML = `
            <div style="
                transform: translate(${bottomRightWorldPosition.x * TILE_WIDTH - displayWidth + TILE_WIDTH}px, ${bottomRightWorldPosition.y * TILE_WIDTH - displayHeight + TILE_WIDTH}px);
                width: ${displayWidth}px;
                height: ${displayHeight}px;
                border: 3px solid #000;
                position: absolute;
                left: 50%;
                top: 50%;
            "/>
        `;
    };

    useEffect(() => {
        dispatch(LOAD_MAP_DATA(map));
    }, [dispatch]);

    useEffect(() => {
        if (world.current == null) return;
        if (mapData == null) return;

        const worldElement = world.current;
        worldElement.style.display = "block";
        worldElement.scrollTo((CHUNK_PIXELS * mapData.chunksX) / 2 - window.innerWidth / 2, (CHUNK_PIXELS * mapData.chunksY) / 2 - window.innerHeight / 2);
    }, [mapData]);

    const layers: JSX.Element[] | String = (() => {
        if (mapData != null) return mapData.layers.map((layerData: LayerData, index: any) => <Layer key={index} layerData={layerData} showLocationForBuildable={showLocationForBuildable} />);
        else return "Loading...";
    })();

    return (
        <div ref={world} onMouseMove={mouseMoveHandler} className="world">
            <div className="layers">{layers}</div>
            <div className="buildings">{buildablePlacements !== undefined && buildablePlacements.map((placement: BuildablePlacement, index: number) => <Building data={placement} key={index} />)}</div>
            <div className="buildingActionWrapper"></div>
        </div>
    );
};

export default World;
