import { DOMElement, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHUNK_PIXELS } from "../../../config/config";
import { LOAD_MAP_DATA } from "../../../redux/actions/MapActions";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import SpritesheetLocation from "../../../types/interfaces/spritesheet/SpritesheetLocation";
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

        const worldElement = world.current;

        const location: SpritesheetLocation = {
            topLeft: 144,
            bottomRight: 255,
        };
        const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);

        const worldPosition: Position = ChunkUtils.toWorldPosition(chunkPosition, tileIndex);

        const topLeftWorldPosition: Position = {
            x: worldPosition.x - Math.floor(dimensions.width / 2),
            y: worldPosition.y - Math.floor(dimensions.height / 2),
        };

        const bottomRightWorldPosition: Position = {
            x: worldPosition.x + Math.floor(dimensions.width / 2),
            y: worldPosition.y + Math.floor(dimensions.height / 2),
        };

        document.querySelectorAll(".tile").forEach((tile: any) => (tile.style.opacity = 1));

        for (let x = topLeftWorldPosition.x; x <= bottomRightWorldPosition.x; x++) {
            for (let y = topLeftWorldPosition.y; y <= bottomRightWorldPosition.y; y++) {
                const tileWorldPosition: Position = { x: x, y: y };
                const tileChunkAndIndex = ChunkUtils.toChunkPositionAndTileIndex(tileWorldPosition);
                // const tileDomElement = worldElement.querySelector(
                //     `.layer[data-id="1"] .chunk[data-x="${tileChunkAndIndex.chunkPosition.x}"][data-y="${tileChunkAndIndex.chunkPosition.y}"] .tile[data-index="${tileChunkAndIndex.tileIndex}"]`
                // );
                // tileDomElement.style.opacity = 0.5;
                console.log(1);
            }
        }

        // console.log({
        //     index: tileIndex,
        //     chunk: chunkPosition,
        //     buildable: selectedBuildable,
        // });
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
        </div>
    );
};

export default World;
