/**
 * Generate <count> numbers between <min> and <max> with approximate even distribution.
 */
export const randomNumbers = ({ min, max, count }: { min: number; max: number; count: number }) => {
    const step = (max - min) / count;

    return Array.from({ length: count }, (_, index) => {
        const variance = (Math.random() - 0.5) * (step / 2);
        const value = min + index * step + variance;
        return Math.max(min, Math.min(value, max));
    });
};

/**
 * Pick a random element between between arguments list.
 */
export const randomElement = <T>(...list: T[]): T | undefined => {
    if (list.length === 0) {
        return undefined;
    }

    const randomIndex = Math.floor(Math.random() * list.length);

    return list[randomIndex];
};

/**
 * Randomize list elements (shuffle).
 */
export const randomizeList = <T>(...list: T[]): T[] | undefined => {
    for (let i = list.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
};

/**
 * Pick a random number between <min> and <max>.
 */
export const randomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};
