import { useSelector } from "react-redux";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticCompanyData from "../../../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../../../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../../../types/interfaces/static/StaticHouseData";
import Modal from "../Modal";
import CompanyDataCard from "./CompanyDataCard";
import HouseDataCard from "./HouseDataCard";
import React, { useState } from "react";

const BuildModal = () => {
    const [selectedType, setSelectedType] = useState<string>("HOUSES");
    const houseData: Array<StaticHouseData> = useSelector((state: CombinedState) => state.staticDataState.staticHouseData);
    const companyData: Array<StaticCompanyData> = useSelector((state: CombinedState) => state.staticDataState.staticCompanyData);
    const decorationData: Array<StaticDecorationData> = useSelector((state: CombinedState) => state.staticDataState.staticDecorationData);

    const handleSelectTypeClick = (event: React.MouseEvent) => {
        const type = (event.target as Element).innerHTML.toUpperCase();
        setSelectedType(type);
    };

    return (
        <Modal title="Build" imageSource="./assets/ui/modal.png">
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
                        </ul>
                    </nav>
                </div>
                <div className="buildModal__buildingSelector">
                    {selectedType === "HOUSES" && houseData.map((houseData: StaticHouseData, index: number) => <HouseDataCard key={index} houseData={houseData} />)}
                    {selectedType === "COMPANIES" && companyData.map((companyData: StaticCompanyData, index: number) => <CompanyDataCard key={index} companyData={companyData} />)}
                </div>
            </div>
        </Modal>
    );
};

export default BuildModal;
