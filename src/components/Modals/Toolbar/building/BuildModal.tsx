import { useSelector } from "react-redux";
import CombinedState from "../../../../types/interfaces/states/CombinedState";
import StaticCompanyData from "../../../../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../../../../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../../../../types/interfaces/static/StaticHouseData";
import Modal from "../../Modal";
import CompanyDataCard from "./CompanyDataCard";
import HouseDataCard from "./HouseDataCard";

const BuildModal = () => {
    const houseData: Array<StaticHouseData> = useSelector((state: CombinedState) => state.staticDataState.staticHouseData);
    const companyData: Array<StaticCompanyData> = useSelector((state: CombinedState) => state.staticDataState.staticCompanyData);
    const decorationData: Array<StaticDecorationData> = useSelector((state: CombinedState) => state.staticDataState.staticDecorationData);

    return (
        <Modal title="Build">
            <div className="buildModal--inner">
                <div>
                    <h2>Houses</h2>
                    <div className="buildingSelector">
                        {houseData.map((houseData: StaticHouseData, index) => (
                            <HouseDataCard key={index} houseData={houseData} />
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Companies</h2>
                    <div className="buildingSelector">
                        {companyData.map((companyData: StaticCompanyData, index) => (
                            <CompanyDataCard key={index} companyData={companyData} />
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BuildModal;
