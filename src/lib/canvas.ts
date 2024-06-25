import { Window, type SVGSVGElement } from "happy-dom";
import { SVG_NS } from "./const";

export type CanvasBackground =
    | string
    | {
          x1?: string;
          y1?: string;
          x2?: string;
          y2?: string;
          colors: [string, string];
      };

/**
 * Generate an SVG element to draw stuff on (canvas).
 */
export const getCanvas = ({
    width,
    height,
    background,
}: {
    width: number;
    height: number;
    background: CanvasBackground;
}): SVGSVGElement => {
    console.log("background", background);
    const { document } = new Window();

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("xmlns", SVG_NS);
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
    svg.setAttribute("viewbox", `0 0 ${width} ${height}`);

    const backgroundRect = document.createElementNS(SVG_NS, "rect");
    backgroundRect.setAttribute("width", width.toString());
    backgroundRect.setAttribute("height", height.toString());

    if (typeof background === "string") {
        backgroundRect.setAttribute("fill", background);
    } else {
        const { x1 = "0%", y1 = "0%", x2 = "100%", y2 = "100%", colors } = background;

        const linearGradient = document.createElementNS(SVG_NS, "linearGradient");
        linearGradient.setAttribute("id", "backgroundGradient");
        linearGradient.setAttribute("x1", x1);
        linearGradient.setAttribute("y1", y1);
        linearGradient.setAttribute("x2", x2);
        linearGradient.setAttribute("y2", y2);

        const [startColor, endColor] = colors;

        const stop1 = document.createElementNS(SVG_NS, "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("style", `stop-color: ${startColor}; stop-opacity: 1`);

        const stop2 = document.createElementNS(SVG_NS, "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("style", `stop-color: ${endColor}; stop-opacity: 1`);

        linearGradient.appendChild(stop1);
        linearGradient.appendChild(stop2);

        svg.appendChild(linearGradient);

        backgroundRect.setAttribute("fill", "url(#backgroundGradient)");
    }

    svg.appendChild(backgroundRect);

    return svg;
};
