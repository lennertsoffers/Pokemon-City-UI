const StringUtils = (() => {
    const toConstantName = (name: string): string => {
        return name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase();
    };

    return {
        toConstantName,
    };
})();

export default StringUtils;
