import { Window, type SVGSVGElement } from "happy-dom";
import { CanvasBackground, getCanvas } from "./lib/canvas";
import { SVG_NS } from "./lib/const";
import { randomNumber, getVariance } from "./lib/random";
import chroma from "chroma-js";
import { createSvgGradient } from "./lib/svg";

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

/**
 * Generate an SVG with rain.
 *
 * ## Arguments:
 * @param width - width of the SVG
 * @param height - height of the SVG
 * @param backgroundColor - background color of the SVG
 * @param color - color of the rain
 * @param min - min number of rain
 * @param max - max number of rain
 * @param thickness - thickness of the meteor
 */
export const rain = ({
    width,
    height,
    background,
    color,
    dropsX = 20,
    dropsY = 15,
    thickness = 1,
}: {
    width: number;
    height: number;
    background: CanvasBackground;
    color: string;
    dropsX?: number;
    dropsY?: number;
    thickness?: number;
}): string => {
    const svg = getCanvas({ width, height, background });

    const stepX = width / dropsX;
    const stepY = height / dropsY;

    // generate coordinate points for drops
    const points: [number, number][] = [];

    for (let i = 0; i < dropsX + 1; i++) {
        for (let j = 0; j < dropsY; j++) {
            const x = i * stepX + getVariance(stepX);
            const y = j * stepY + getVariance(stepY);

            points.push([Math.round(x), Math.round(y)]);
        }
    }

    for (const [x, y] of points) {
        const x1 = x;
        const y1 = y;
        const length = Math.round(randomNumber(height / dropsY / 2, (2 * height) / dropsY / 3));
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
            defs.appendChild(gradient);
        } else {
            svg.appendChild(gradient);
        }

        addDrop({
            svg,
            start: [x1, y1],
            end: [x2, y2],
            thickness: randomNumber(thickness, thickness + (Math.random() - 0.25) * thickness),
            gradientId,
        });
    }

    return svg.outerHTML;
};
