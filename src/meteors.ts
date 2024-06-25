import { Window, type SVGSVGElement } from "happy-dom";
import { getCanvas } from "./lib/canvas";
import { SVG_NS } from "./lib/const";
import { randomNumber, randomNumbers, randomElement } from "./lib/random";
import chroma from "chroma-js";
import { createSvgGradient } from "./lib/svg";

/**
 * Add meteors to the SVG.
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

/**
 * Generate an SVG with meteors.
 *
 * ## Arguments:
 * @param width - width of the SVG
 * @param height - height of the SVG
 * @param backgroundColor - background color of the SVG
 * @param color - color of the meteors
 * @param min - min number of meteors
 * @param max - max number of meteors
 * @param thickness - thickness of the meteor
 * @param bidirectional - should meteors reverse direction
 */
export const meteors = ({
    width,
    height,
    backgroundColor,
    color,
    min = 20,
    max = 25,
    thickness = 5,
    bidirectional,
}: {
    width: number;
    height: number;
    backgroundColor: string;
    color: string;
    min?: number;
    max?: number;
    thickness?: number;
    bidirectional?: boolean;
}): string => {
    const svg = getCanvas({ width, height, backgroundColor });
    const count = Math.floor(randomNumber(min, max));

    const values = randomNumbers({
        min: 0,
        max: width,
        count,
    });

    const gradient = createSvgGradient({
        id: "gradient",
        startColor: chroma(color).alpha(0).css(),
        endColor: chroma(color).alpha(1).css(),
    });

    svg.appendChild(gradient);

    // add reverse gradient
    if (bidirectional) {
        const gradientRev = createSvgGradient({
            id: "gradient_rev",
            startColor: chroma(color).alpha(1).css(),
            endColor: chroma(color).alpha(0).css(),
        });

        svg.appendChild(gradientRev);
    }

    for (const value of values) {
        const x1 = value;
        const y1 = randomNumber(-height / 5, height + height / 5);
        const length = randomNumber(height / 3, (2 * height) / 3);
        const x2 = x1 + length;
        const y2 = y1 + length;

        const meteorGradientId = bidirectional ? randomElement("gradient", "gradient_rev") : "gradient";

        addMeteor({
            svg,
            start: [x1, y1],
            end: [x2, y2],
            thickness: randomNumber(thickness, thickness + (Math.random() - 0.25) * thickness),
            gradientId: meteorGradientId,
        });
    }

    return svg.outerHTML;
};
