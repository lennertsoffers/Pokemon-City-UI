import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHUNK_PIXELS, FALLBACK_SPRITESHEET, TILE_WIDTH } from "../../../config/config";
import { LOAD_MAP_DATA } from "../../../redux/actions/MapActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import LayerData from "../../../types/interfaces/world/LayerData";
import Position from "../../../types/interfaces/world/Position";
import ChunkUtils from "../../../utils/ChunkUtils";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import Loading from "../../Loading";
import Buildable from "../buildable/Buildable";
import Layer from "./Layer";
import map from "./map";
import UserService from "../../../api/UserService";
import BuildableData from "../../../types/interfaces/world/BuildableData";
import RoadData from "../../../types/interfaces/world/RoadData";
import Road from "../buildable/Road";

/**
 * Component that wraps:
 * -> The background layer with the world map
 * -> The buildables placed in the world
 * -> The building preview that is shown when moving or building
 *
 * It makes the world movable by dragging over the screen
 */
const World = () => {
    const world = useRef<any>(null);
    const dispatch = useDispatch();
    const mapData = useSelector((state: CombinedState) => state.mapState.mapData);
    const buildableDataList = useSelector((state: CombinedState) => state.buildableDataState.buildableDataList);
    const roadDataList = useSelector((state: CombinedState) => state.roadState.roads);
    const selectedBuildable = useSelector((state: CombinedState) => state.buildableSelectorState.selectedBuildable);
    const selectedAction = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const [sessionTime, setSessionTime] = useState<number>(0);

    /**
     * Makes the world movable by adding the drag movement to the scoll position
     */
    const mouseMoveHandler = (event: React.MouseEvent) => {
        // The left mouse button must be pressed while moving to drag the world
        if (event.buttons !== 1) return;
        // If the ref is not loaded yet, we cannot move the world
        if (world.current == null) return;

        const worldElement = world.current;

        // We don't make a state because updating the state on every mouseMove event
        // is more demanding than reading the scroll position of the element
        const newX = worldElement.scrollLeft - event.movementX;
        const newY = worldElement.scrollTop - event.movementY;

        // Scroll to the new position
        world.current.scrollTo(newX, newY);
    };

    // Shows the preview for the selected buildable in the world
    const showLocationForBuildable = (tileIndex: number, chunkPosition: Position) => {
        if (world.current == null) return;
        if (selectedBuildable == null) return;
        if (selectedAction !== ActionEnum.BUILD && selectedAction !== ActionEnum.MOVE) return;

        const worldElement = world.current;

        // Create the tiled image
        const location = selectedBuildable.spritesheetLocation;
        const spritesheet = selectedBuildable.spritesheet ? selectedBuildable.spritesheet : FALLBACK_SPRITESHEET;
        const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
        const worldPosition: Position = ChunkUtils.toWorldPosition(chunkPosition, tileIndex);
        const bottomRightWorldPosition = ChunkUtils.toBottomRightWorldPosition(worldPosition, dimensions);
        const displayWidth = dimensions.width * TILE_WIDTH;
        const displayHeight = dimensions.height * TILE_WIDTH;

        // Add the preview to the preview wrapper
        worldElement.querySelector(".buildingActionWrapper").innerHTML = `
            <div style="
                background-position: ${-dimensions.offsetLeft * TILE_WIDTH}px ${-dimensions.offsetTop}px;
                background-image: url(./assets/spritesheets/${spritesheet}.png);
                transform: translate(${bottomRightWorldPosition.x * TILE_WIDTH - displayWidth + TILE_WIDTH}px, ${bottomRightWorldPosition.y * TILE_WIDTH - displayHeight + TILE_WIDTH}px);
                width: ${displayWidth}px;
                height: ${displayHeight}px;
                position: absolute;
                left: 50%;
                top: 50%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                opacity: 0.85;
                z-index: 800;
            ">
                <div style="
                    z-index: 801;
                    border: 4px dashed rgba(150, 0, 0, 0.8);
                    background-color: rgba(255, 0, 0, 0.3);
                    height: ${selectedBuildable.height * TILE_WIDTH}px;
                    width: ${selectedBuildable.width * TILE_WIDTH}px;
                "/>
            </div>
        `;
    };

    // Load the map layers if the world gets rendered
    useEffect(() => {
        dispatch(LOAD_MAP_DATA(map));
    }, [dispatch]);

    // If the map is loaded, scroll to the center of it
    useEffect(() => {
        if (world.current == null) return;
        if (mapData == null) return;

        const worldElement = world.current;
        worldElement.style.display = "block";
        worldElement.scrollTo((CHUNK_PIXELS * mapData.chunksX) / 2 - window.innerWidth / 2, (CHUNK_PIXELS * mapData.chunksY) / 2 - window.innerHeight / 2);
    }, [mapData]);

    // If a new buildable gets selected, the preview wrapper is emptied
    useEffect(() => {
        if (selectedBuildable != null) return;
        if (world.current == null) return;

        world.current.querySelector(".buildingActionWrapper").innerHTML = "";
    }, [selectedBuildable]);

    // Every minute, the playtime statistic gets updated by one minute
    useEffect(() => {
        setTimeout(() => {
            UserService.updateStatistics(1);
            setSessionTime(sessionTime + 1);
        }, 1000 * 60);
    }, [sessionTime]);

    // If the map is not loaded yet, show the loading animation
    if (!mapData) return <Loading />;
    return (
        <div ref={world} onMouseMove={mouseMoveHandler} className="world">
            <div className="layers">
                {mapData.layers.map((layerData: LayerData) => (
                    <Layer key={layerData.id} layerData={layerData} showLocationForBuildable={showLocationForBuildable} />
                ))}
            </div>
            <div className="buildings">
                {roadDataList !== undefined && roadDataList.map((roadData: RoadData) => <Road roadData={roadData} key={roadData.id} />)}
                {buildableDataList !== undefined && buildableDataList.map((buildableData: BuildableData) => <Buildable buildableData={buildableData} key={buildableData.id} />)}
            </div>
            <div className="buildingActionWrapper"></div>
        </div>
    );
};

export default World;
