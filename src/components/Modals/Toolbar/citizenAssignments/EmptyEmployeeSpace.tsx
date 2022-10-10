const EmptyEmployeeSpace = ({ companyId }: { companyId: number }) => {
    const handleClick = () => {
        console.log(companyId);
    };

    return <div onClick={handleClick} className="emptyEmployeeSpace"></div>;
};

export default EmptyEmployeeSpace;
