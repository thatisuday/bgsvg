import { Window, type SVGSVGElement } from "happy-dom";
import { CanvasBackground, getCanvas } from "./lib/canvas";
import { SVG_NS } from "./lib/const";
import { randomNumber, randomElement, get2dPoints } from "./lib/random";
import chroma from "chroma-js";
import { createSvgGradient } from "./lib/svg";
import type { OutputType, OutputTypeSvg } from "./lib/types";
import { getOutput } from "./lib/output";

/**
 * Add a meteor to the SVG.
 */
const addMeteor = ({
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

export async function meteors(options: {
    width: number;
    height: number;
    background: CanvasBackground;
    color: string;
    min?: number;
    max?: number;
    thickness?: number;
    bidirectional?: boolean;
    output?: OutputTypeSvg;
}): Promise<string>;

export async function meteors(options: {
    width: number;
    height: number;
    background: CanvasBackground;
    color: string;
    min?: number;
    max?: number;
    thickness?: number;
    bidirectional?: boolean;
    output: Exclude<OutputType, OutputTypeSvg>;
}): Promise<Buffer>;

/**
 * Generate an SVG with meteors.
 */
export async function meteors({
    width,
    height,
    background,
    color,
    densityX = 20,
    densityY = 1,
    thickness = 4,
    bidirectional = true,
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
    bidirectional?: boolean;
    output?: OutputType;
}): Promise<string | Buffer> {
    const { document } = new Window();
    const svg = getCanvas({ width, height, background });
    const defs = svg.getElementsByTagName("defs")?.[0];

    const gradient = createSvgGradient({
        id: "gradient",
        startColor: chroma(color).alpha(0).css(),
        endColor: chroma(color).alpha(1).css(),
    });

    if (!defs) {
        const defs = document.createElementNS(SVG_NS, "defs");
        defs.appendChild(gradient);
        svg.appendChild(defs);
    } else {
        defs.appendChild(gradient);
    }

    // add reverse gradient
    if (bidirectional) {
        const gradientRev = createSvgGradient({
            id: "gradient_rev",
            startColor: chroma(color).alpha(1).css(),
            endColor: chroma(color).alpha(0).css(),
        });

        if (!defs) {
            const defs = document.createElementNS(SVG_NS, "defs");
            defs.appendChild(gradientRev);
            svg.appendChild(defs);
        } else {
            defs.appendChild(gradientRev);
        }
    }

    // generate coordinate points for drops
    const points = get2dPoints({
        width,
        height,
        densityX,
        densityY,
        varianceFactor: 4,
    });

    for (const [x, y] of points) {
        const x1 = x;
        const y1 = y;
        const length = Math.round(randomNumber(height / densityY / 2, (2 * height) / densityY / 3));
        const x2 = x1 + length;
        const y2 = y1 + length;

        const meteorGradientId = bidirectional ? randomElement("gradient", "gradient_rev") : "gradient";

        addMeteor({
            svg,
            start: [x1, y1],
            end: [x2, y2],
            thickness: Math.round(randomNumber(thickness, thickness + (Math.random() - 0.25) * thickness)),
            gradientId: meteorGradientId,
        });
    }

    return getOutput({
        width,
        height,
        svg,
        output,
    });
}
