import StaticCompanyData from "../../../types/interfaces/static/StaticCompanyData";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import BuildableCard from "./BuildableCard";

const CompanyDataCard = ({ companyData }: { companyData: StaticCompanyData }) => {
    const handleClick = () => {
        companyData.spritesheet = SpritesheetUtils.getCorrespondingSpritesheet("COMPANY", companyData.specialisationType);
    };

    return (
        <BuildableCard buildableData={companyData} onClick={handleClick}>
            <div>{companyData.profitPerMinute} €/min</div>
            <div>{companyData.specialisationType}</div>
            <div>{companyData.maxAssignedCitizens}</div>
        </BuildableCard>
    );
};

export default CompanyDataCard;
