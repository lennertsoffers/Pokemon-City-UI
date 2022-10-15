import CompanyInfoData from "../../../types/interfaces/world/CompanyInfoData";

const CompanyInfo = ({ companyInfo }: { companyInfo: CompanyInfoData }) => {
    return (
        <div className="buildableInfo companyInfo">
            <div className="companyInfo__name">{companyInfo.name}</div>
            <div className="companyInfo__profit">{companyInfo.profit}</div>
            <div className="companyInfo__specialisationType">{companyInfo.specialisationType.toLowerCase()}</div>
            <div className="companyInfo__employeeMultiplier">Employee multiplier: {companyInfo.employeeMultiplier}</div>
            <div className="companyInfo__employees">
                {companyInfo.assignedCitizens}/{companyInfo.maxAssignedCitizens}
            </div>
        </div>
    );
};

export default CompanyInfo;
