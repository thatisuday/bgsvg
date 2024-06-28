import { Window, type SVGSVGElement } from "happy-dom";
import { CanvasBackground, getCanvas } from "./lib/canvas";
import { SVG_NS } from "./lib/const";
import { randomNumber, get2dPoints } from "./lib/random";
import chroma from "chroma-js";
import { createSvgGradient } from "./lib/svg";
import type { OutputType, OutputTypeSvg } from "./lib/types";
import { getOutput } from "./lib/output";

/**
 * Add a rain drop to the SVG.
 */
const addDrop = ({
    svg,
    start,
    end,
    thickness,
    gradientId,
}: {
    svg: SVGSVGElement;
    start: [number, number];
    end: [number, number];
    thickness: number;
    gradientId: string;
}) => {
    const { document } = new Window();

    const meteor = document.createElementNS(SVG_NS, "line");
    const [x1, y1] = start;
    const [x2, y2] = end;

    meteor.setAttribute("x1", x1.toString());
    meteor.setAttribute("y1", y1.toString());
    meteor.setAttribute("x2", x2.toString());
    meteor.setAttribute("y2", y2.toString());
    meteor.setAttribute("stroke-width", thickness.toString());
    meteor.setAttribute("stroke-linecap", "round");

    meteor.setAttribute("stroke", `url(#${gradientId})`);
    svg.appendChild(meteor);
};

export async function rain(options: {
    width: number;
    height: number;
    background: CanvasBackground;
    color: string;
    dropsX?: number;
    dropsY?: number;
    thickness?: number;
    output?: OutputTypeSvg;
}): Promise<string>;

export async function rain(options: {
    width: number;
    height: number;
    background: CanvasBackground;
    color: string;
    dropsX?: number;
    dropsY?: number;
    thickness?: number;
    output: Exclude<OutputType, OutputTypeSvg>;
}): Promise<Buffer>;

/**
 * Generate an SVG with rain.
 */
export async function rain({
    width,
    height,
    background,
    color,
    densityX = 20,
    densityY = 15,
    thickness = 1,
    randomness = 4,
    output = {
        type: "svg",
    },
}: {
    width: number;
    height: number;
    background: CanvasBackground;
    color: string;
    densityX?: number;
    densityY?: number;
    thickness?: number;
    randomness?: number;
    output?: OutputType;
}): Promise<string | Buffer> {
    const { document } = new Window();
    const svg = getCanvas({ width, height, background });

    // generate coordinate points for drops
    const points = get2dPoints({
        width,
        height,
        densityX,
        densityY,
        varianceFactor: randomness,
    });

    for (const [x, y] of points) {
        const x1 = x;
        const y1 = y;
        const length = Math.round(randomNumber(height / densityY / 2, (2 * height) / densityY / 3));
        const x2 = x1 + length;
        const y2 = y1 + length;
        const gradientId = `gradient_${randomNumber(1, 10000000)}`;

        const gradient = createSvgGradient({
            id: gradientId,
            startColor: chroma(color).alpha(randomNumber(0, 0.25)).css(),
            endColor: chroma(color).alpha(randomNumber(0.25, 1)).css(),
        });

        const defs = svg.getElementsByTagName("defs")?.[0];
        if (!defs) {
            const defs = document.createElementNS(SVG_NS, "defs");
            defs.appendChild(gradient);
            svg.appendChild(defs);
        } else {
            defs.appendChild(gradient);
        }

        addDrop({
            svg,
            start: [x1, y1],
            end: [x2, y2],
            thickness: randomNumber(thickness, thickness + (Math.random() - 0.25) * thickness),
            gradientId,
        });
    }

    return getOutput({
        width,
        height,
        svg,
        output,
    });
}
