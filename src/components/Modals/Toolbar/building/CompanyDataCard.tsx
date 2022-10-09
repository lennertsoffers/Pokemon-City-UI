import { COOKING_SPRITESHEET, SELLING_SPRITESHEET, SERVICE_SPRITESHEET, SOCIAL_SPRITESHEET } from "../../../../config/config";
import StaticCompanyData from "../../../../types/interfaces/static/StaticCompanyData";
import BuildableCard from "./BuildableCard";

const CompanyDataCard = ({ companyData }: { companyData: StaticCompanyData }) => {
    const handleClick = () => {
        switch (companyData.specialisationType) {
            case "COOKING":
                companyData.spritesheet = COOKING_SPRITESHEET;
                break;
            case "SELLING":
                companyData.spritesheet = SELLING_SPRITESHEET;
                break;
            case "SERVICE":
                companyData.spritesheet = SERVICE_SPRITESHEET;
                break;
            case "SOCIAL":
                companyData.spritesheet = SOCIAL_SPRITESHEET;
                break;
        }
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
