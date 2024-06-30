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

    if (req.query.output === "jpeg") {
        const image = await meteors({
            width: 800,
            height: 300,
            background: {
                colors: ["#222299", "#13137f"],
            },
            color: "#952E9D",
            output: {
                type: "jpeg",
                quality: req.query.quality ? parseInt(req.query.quality as string) : undefined,
            },
        });

        res.setHeader("Content-Type", "image/jpeg");
        res.send(image);
    } else {
        const svg = await meteors({
            width: 800,
            height: 300,
            background: {
                colors: ["#000000", "#13137f"],
            },
            color: "#ba8003",
        });

        res.setHeader("Content-Type", "text/html");
        res.send(
            template({
                title: "meteors",
                svg,
            }),
        );
    }
});

app.get("/rain", async (req, res) => {
    const html = await fs.readFile(path.resolve(process.cwd(), "preview/preview.html"), "utf-8");
    const template = handlebars.compile(html);

    if (req.query.output === "jpeg") {
        const image = await rain({
            width: 800,
            height: 300,
            background: {
                colors: ["#081e46", "#181f74"],
            },
            color: "#8f97c1",
            output: {
                type: "jpeg",
                quality: req.query.quality ? parseInt(req.query.quality as string) : undefined,
            },
        });

        res.setHeader("Content-Type", "image/jpeg");
        res.send(image);
    } else {
        const svg = await rain({
            width: 800,
            height: 300,
            background: {
                colors: ["#27274c", "#121242"],
            },
            color: "#8f97c1",
        });

        res.setHeader("Content-Type", "text/html");
        res.send(
            template({
                title: "rain",
                svg,
            }),
        );
    }
});

app.listen(PORT, () => {
    console.log(`👀 Preview server started at http://localhost:${PORT}.`);
});
