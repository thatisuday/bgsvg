import { logger } from "./logger";

/**
 * Calculate variance of a value.
 */
export const getVariance = (value: number, factor: number = 4): number => {
    // prettier-ignore
    logger.trace(`[RANDOM] getVariance(${JSON.stringify({ value, factor })})`);

    return (Math.random() - 0.5) * 2 * (value / factor);
};

/**
 * Get random nearly equally distributed random points in 2D plane.
 */
export const get2dPoints = ({
    width,
    height,
    densityX,
    densityY,
    varianceFactor,
}: {
    width: number;
    height: number;
    densityX: number;
    densityY: number;
    varianceFactor: number;
}): [number, number][] => {
    // prettier-ignore
    logger.trace(`[RANDOM] get2dPoints(${JSON.stringify({ width, height, densityX, densityY, varianceFactor })})`);

    const stepX = width / densityX;
    const stepY = height / densityY;

    const points: [number, number][] = [];

    for (let i = 0; i < densityX + 1; i++) {
        for (let j = 0; j < densityY + 1; j++) {
            const x = i * stepX + getVariance(stepX, varianceFactor);
            const y = j * stepY + getVariance(stepY, varianceFactor);

            points.push([Math.round(x), Math.round(y)]);
        }
    }

    return points;
};

/**
 * Generate <count> numbers between <min> and <max> with approximate even distribution.
 */
export const randomNumbers = ({ min, max, count }: { min: number; max: number; count: number }) => {
    logger.trace(`[RANDOM] get2dPoints(${JSON.stringify({ min, max, count })})`);

    const step = (max - min) / count;

    return Array.from({ length: count }, (_, index) => {
        const variance = getVariance(step);
        return index * step + variance;
    });
};

/**
 * Pick a random element between between arguments list.
 */
export const randomElement = <T>(...list: T[]): T | undefined => {
    // prettier-ignore
    logger.trace("[RANDOM] randomElement()");

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
    // prettier-ignore
    logger.trace("[RANDOM] randomizeList()");

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
    // prettier-ignore
    logger.trace(`[RANDOM] get2dPoints(${JSON.stringify({ min, max })})`);

    return Math.random() * (max - min) + min;
};
