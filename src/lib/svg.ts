import { Window, type SVGElement } from "happy-dom";
import { SVG_NS } from "./const";

export const createSvgGradient = ({
    id,
    startColor,
    endColor,
}: {
    id: string;
    startColor: string;
    endColor: string;
}): SVGElement => {
    const { document } = new Window();

    const gradient = document.createElementNS(SVG_NS, "linearGradient");
    gradient.id = id;

    const colorStop1 = document.createElementNS(SVG_NS, "stop");
    colorStop1.setAttribute("offset", "0%");
    colorStop1.setAttribute("stop-color", startColor);

    const colorStop2 = document.createElementNS(SVG_NS, "stop");
    colorStop2.setAttribute("offset", "100%");
    colorStop2.setAttribute("stop-color", endColor);

    gradient.appendChild(colorStop1);
    gradient.appendChild(colorStop2);

    return gradient;
};
