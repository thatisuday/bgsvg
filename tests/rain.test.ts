import { Window } from "happy-dom";
import { fileTypeFromBuffer } from "file-type";
import imageSize from "image-size";
import { rain } from "../src/rain";

describe("rain", () => {
    it("should match the snapshot", async () => {
        const svg = await rain({
            width: 500,
            height: 200,
            background: "#000",
            color: "#fff",
            dropsX: 30,
            dropsY: 20,
            thickness: 2,
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

    it("should generate valid PNG image", async () => {
        const image = await rain({
            width: 500,
            height: 200,
            background: "#000",
            color: "#fff",
            output: {
                type: "png",
            },
        });

        const { mime } = await fileTypeFromBuffer(image);
        expect(mime).toBe("image/png");

        const { width, height } = imageSize(image);
        expect(width).toBe(500);
        expect(height).toBe(200);
    });

    it("should generate valid Webp image", async () => {
        const image = await rain({
            width: 500,
            height: 200,
            background: "#000",
            color: "#fff",
            output: {
                type: "webp",
            },
        });

        const { mime } = await fileTypeFromBuffer(image);
        expect(mime).toBe("image/webp");

        const { width, height } = imageSize(image);
        expect(width).toBe(500);
        expect(height).toBe(200);
    });

    it("should generate valid JPEG image", async () => {
        const image = await rain({
            width: 500,
            height: 200,
            background: "#000",
            color: "#fff",
            output: {
                type: "jpeg",
                quality: 50,
            },
        });

        const { mime } = await fileTypeFromBuffer(image);
        expect(mime).toBe("image/jpeg");

        const { width, height } = imageSize(image);
        expect(width).toBe(500);
        expect(height).toBe(200);
    });
});
