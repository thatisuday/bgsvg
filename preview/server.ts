import express from "express";
import { meteors } from "../src";
import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import { rain } from "../src/rain";

const app = express();
const PORT = 3003;

app.get("/", async (_, res) => {
    const html = await fs.readFile(path.resolve(process.cwd(), "preview/index.html"), "utf-8");
    const template = handlebars.compile(html);

    res.setHeader("Content-Type", "text/html");
    res.send(
        template({
            routes: ["meteors", "rain"],
        }),
    );
});

app.get("/meteors", async (req, res) => {
    const html = await fs.readFile(path.resolve(process.cwd(), "preview/preview.html"), "utf-8");
    const template = handlebars.compile(html);

    const svg = meteors({
        width: 800,
        height: 300,
        color: "#952E9D",
        background: {
            colors: ["#222299", "#13137f"],
        },
    });

    if (req.query.generate_asset_file) {
        const assetFile = path.resolve(process.cwd(), "assets/meteors.svg");
        await fs.writeFile(assetFile, svg);
    }

    res.setHeader("Content-Type", "text/html");
    res.send(
        template({
            title: "meteors",
            svg,
        }),
    );
});

app.get("/rain", async (req, res) => {
    const html = await fs.readFile(path.resolve(process.cwd(), "preview/preview.html"), "utf-8");
    const template = handlebars.compile(html);

    const svg = rain({
        width: 800,
        height: 300,
        background: {
            colors: ["#081e46", "#181f74"],
        },
        color: "#8f97c1",
    });

    if (req.query.generate_asset_file) {
        const assetFile = path.resolve(process.cwd(), "assets/rain.svg");
        await fs.writeFile(assetFile, svg);
    }

    res.setHeader("Content-Type", "text/html");
    res.send(
        template({
            title: "rain",
            svg,
        }),
    );
});

app.listen(PORT, () => {
    console.log(`👀 Preview server started at http://localhost:${PORT}.`);
});
