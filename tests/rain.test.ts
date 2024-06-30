import { Window } from "happy-dom";
import { rain } from "../src/rain";

describe("rain", () => {
    it("should match the snapshot", async () => {
        const svg = await rain({
            width: 500,
            height: 200,
            background: "#000",
            color: "#fff",
        });

        const { document } = new Window();
        document.body.innerHTML = svg;
        const svgElement = document.querySelector("svg");

        expect(svgElement).not.toBeNull();
        expect(svgElement.getAttribute("width")).toBe("500");
        expect(svgElement.getAttribute("height")).toBe("200");

        const svgRectElement = svgElement.querySelector("rect");
        expect(svgRectElement).not.toBeNull();
        expect(svgRectElement.getAttribute("fill")).toBe("#000");
    });
});
