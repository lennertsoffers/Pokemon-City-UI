const BuildableUtils = (() => {
    const getMinutesSinceLastCollection = (lastCollected: string) => {
        const milisecondsSinceLastCollection = new Date().getTime() - new Date(lastCollected).getTime();
        const minutesSinceLastCollection = Math.round(milisecondsSinceLastCollection / 1000 / 60);

        return minutesSinceLastCollection;
    };

    return {
        getMinutesSinceLastCollection,
    };
})();

export default BuildableUtils;
