/** Module containing util functions concerning strings */
const StringUtils = (() => {
    // List containing abbreviations for thousand - million - billion and trillion
    const NUMBER_LETTERS = ["k", "m", "b", "t"];

    /**
     * Converts the capitalized name of a building containing special characters to the uppercase characters separated by underscores
     */
    const toConstantName = (name: string): string => {
        return name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase();
    };

    /**
     * Simplifies a number so that thousands are shown by letters instead of all zeros
     */
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
