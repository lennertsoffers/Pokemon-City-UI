import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MAP_DATA } from "../../redux/actions/MapActions";
import BuildingPlacementType from "../../types/BuildingPlacementType";
import LayerType from "../../types/LayerType";
import Building from "./Building";
import { CHUNK_PIXELS } from "./Constants";
import Layer from "./Layer";
import MapData from "./map";

const World = () => {
    const world = useRef<any>(null);
    const dispatch = useDispatch();
    const mapData = useSelector((state: any) => state.mapData);
    const buildings = useSelector((state: any) => state.building.buildingMap);

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
        dispatch(LOAD_MAP_DATA(MapData));
    }, [dispatch]);

    useEffect(() => {
        if (world.current == null) return;
        if (mapData == null) return;

        const worldElement = world.current;
        worldElement.style.display = "block";
        worldElement.scrollTo((CHUNK_PIXELS * mapData.chunksX) / 2 - window.innerWidth / 2, (CHUNK_PIXELS * mapData.chunksY) / 2 - window.innerHeight / 2);
    }, [mapData]);

    const data: JSX.Element[] | String = (() => {
        if (mapData != null) return mapData.layers.map((layer: any, index: any) => <Layer key={index} layerData={layer} />);
        else return "Loading...";
    })();

    return (
        <div ref={world} onMouseMove={mouseMoveHandler} className="world">
            {data}
            <div className="buildings">{buildings !== undefined && buildings.map((placement: BuildingPlacementType, index: number) => <Building data={placement} key={index} />)}</div>
        </div>
    );
};

export default World;
