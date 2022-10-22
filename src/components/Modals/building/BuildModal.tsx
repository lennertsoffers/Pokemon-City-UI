import { useDispatch, useSelector } from "react-redux";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticCompanyData from "../../../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../../../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../../../types/interfaces/static/StaticHouseData";
import Modal from "../Modal";
import CompanyDataCard from "./CompanyDataCard";
import HouseDataCard from "./HouseDataCard";
import React, { useState } from "react";
import BuildableCard from "./BuildableCard";
import { SELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";

/**
 * Modal container for building that lists the buildables of all types in different tabs
 * Also provides a menu option to build roads
 *
 * Extends - {@link Modal}
 */
const BuildModal = () => {
    const dispatch = useDispatch();
    const [selectedType, setSelectedType] = useState<string>("HOUSES");
    const houseData: Array<StaticHouseData> = useSelector((state: CombinedState) => state.staticDataState.staticHouseData);
    const companyData: Array<StaticCompanyData> = useSelector((state: CombinedState) => state.staticDataState.staticCompanyData);
    const decorationData: Array<StaticDecorationData> = useSelector((state: CombinedState) => state.staticDataState.staticDecorationData);

    /**
     * Shows and selects buildable of the clicked type
     */
    const handleSelectTypeClick = (event: React.MouseEvent) => {
        // The type of the buildable is the text in the clicked element to uppercase
        const type = (event.target as Element).innerHTML.toUpperCase();
        setSelectedType(type);
    };

    /**
     * Selects the {@link ActionEnum.PLACE_ROAD} in the {@link SelectedActionState} and closes the modal
     */
    const handleRoadClick = () => {
        dispatch(SELECT_ACTION(ActionEnum.PLACE_ROAD));
        dispatch(CLOSE_MODAL);
    };

    return (
        <Modal imageSource="./assets/ui/modal.png">
            <div className="buildModal">
                <div className="buildModal__typeSelector">
                    <nav>
                        <ul>
                            <li>
                                <div>
                                    <button onClick={handleSelectTypeClick}>Houses</button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button onClick={handleSelectTypeClick}>Companies</button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button onClick={handleSelectTypeClick}>Decorations</button>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <button onClick={handleRoadClick}>Road</button>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="buildModal__buildingSelector">
                    {selectedType === "HOUSES" && houseData.map((houseData: StaticHouseData, index: number) => <HouseDataCard key={index} houseData={houseData} />)}
                    {selectedType === "COMPANIES" && companyData.map((companyData: StaticCompanyData, index: number) => <CompanyDataCard key={index} companyData={companyData} />)}
                    {selectedType === "DECORATIONS" && decorationData.map((decorationData: StaticDecorationData, index: number) => <BuildableCard buildableData={decorationData} key={index} />)}
                </div>
            </div>
        </Modal>
    );
};

export default BuildModal;
