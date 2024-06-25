import { Window, type SVGSVGElement } from "happy-dom";
import { SVG_NS } from "./const";

/**
 * Generate an SVG element to draw stuff on (canvas).
 */
export const getCanvas = ({
    width,
    height,
    backgroundColor,
}: {
    width: number;
    height: number;
    backgroundColor: string;
}): SVGSVGElement => {
    const { document } = new Window();

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("xmlns", SVG_NS);
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
    svg.setAttribute("viewbox", `0 0 ${width} ${height}`);

    svg.style.backgroundColor = backgroundColor;

    return svg;
};
