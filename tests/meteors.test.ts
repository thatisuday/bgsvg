import { meteors } from "../src/meteors";

describe("meteors", () => {
    it("should match the snapshot", async () => {
        const svg = await meteors({
            width: 500,
            height: 200,
            background: "#000",
            color: "#fff",
        });

        expect(svg).toMatchSnapshot();
    });
});
