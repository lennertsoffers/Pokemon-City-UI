import StaticCompanyData from "../../../types/interfaces/static/StaticCompanyData";
import StringUtils from "../../../utils/StringUtils";
import BuildableCard from "./BuildableCard";

const CompanyDataCard = ({ companyData }: { companyData: StaticCompanyData }) => {
    const displaySpecialisationType = companyData.specialisationType.charAt(0) + companyData.specialisationType.toLowerCase().substring(1);

    return (
        <BuildableCard buildableData={companyData}>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Profit:</div>
                <div>{StringUtils.simplify(companyData.profitPerMinute)} €/min</div>
            </div>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Specialisation:</div>
                <div>{displaySpecialisationType}</div>
            </div>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Employees:</div>
                <div>{companyData.maxAssignedCitizens}</div>
            </div>
        </BuildableCard>
    );
};

export default CompanyDataCard;
