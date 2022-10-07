import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHUNK_PIXELS } from "../../../config/config";
import { LOAD_MAP_DATA } from "../../../redux/actions/MapActions";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildablePlacement from "../../../types/interfaces/world/BuildablePlacement";
import LayerData from "../../../types/interfaces/world/LayerData";
import Building from "../building/Building";
import Layer from "./Layer";
import map from "./map";

const World = () => {
    const world = useRef<any>(null);
    const dispatch = useDispatch();
    const mapData = useSelector((state: CombinedState) => state.mapState.mapData);
    const buildablePlacements = useSelector((state: CombinedState) => state.buildablePlacementState.buildablePlacements);

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
        if (mapData != null) return mapData.layers.map((layerData: LayerData, index: any) => <Layer key={index} layerData={layerData} />);
        else return "Loading...";
    })();

    return (
        <div ref={world} onMouseMove={mouseMoveHandler} className="world">
            <div>{layers}</div>
            <div className="buildings">{buildablePlacements !== undefined && buildablePlacements.map((placement: BuildablePlacement, index: number) => <Building data={placement} key={index} />)}</div>
        </div>
    );
};

export default World;
