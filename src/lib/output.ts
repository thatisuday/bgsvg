import type { SVGSVGElement } from "happy-dom";
import type { OutputType } from "./types";
import { screenshot } from "./screenshot";

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
    const svgCode = svg.outerHTML;

    if (output.type === "svg") {
        return svgCode;
    }

    return await screenshot({
        width,
        height,
        svg: svgCode,
        output: output,
    });
};
