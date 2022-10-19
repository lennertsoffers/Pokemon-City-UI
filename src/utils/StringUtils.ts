const StringUtils = (() => {
    const NUMBER_LETTERS = ["k", "m", "b", "t"];

    const toConstantName = (name: string): string => {
        return name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase();
    };

    const simplify = (number: number) => {
        let divisionsBy1000 = 0;

        while (number >= 10000) {
            number = Math.round(number / 1000);

            divisionsBy1000++;
        }

        const letter = divisionsBy1000 > 0 ? NUMBER_LETTERS.at(divisionsBy1000 - 1) : "";

        return `${number}${letter}`;
    };

    return {
        toConstantName,
        simplify,
    };
})();

export default StringUtils;
