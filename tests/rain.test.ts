import { rain } from "../src/rain";

describe("rain", () => {
    it("should match the snapshot", async () => {
        const svg = await rain({
            width: 500,
            height: 200,
            background: "#000",
            color: "#fff",
        });

        expect(svg).toMatch("svg");
    });
});
