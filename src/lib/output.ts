import type { SVGSVGElement } from "happy-dom";
import type { OutputType } from "./types";
import { screenshot } from "./screenshot";
import { logger } from "./logger";

export const getOutput = async ({
    width,
    height,
    svg,
    output,
}: {
    width: number;
    height: number;
    svg: SVGSVGElement;
    output: OutputType;
}) => {
    // prettier-ignore
    logger.trace(`[OUTPUT] getOutput(${JSON.stringify({ width, height, output })})`);

    const svgCode = svg.outerHTML;

    if (output.type === "svg") {
        return svgCode;
    }

    return await screenshot({
        width,
        height,
        svg: svgCode,
        output,
    });
};
