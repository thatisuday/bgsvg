import express from "express";
import { meteors } from "../src";
import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = 3000;

app.get("/", async (_, res) => {
    const html = await fs.readFile(path.resolve(process.cwd(), "preview/index.html"), "utf-8");
    const template = handlebars.compile(html);

    res.setHeader("Content-Type", "text/html");
    res.send(
        template({
            routes: ["meteors"],
        }),
    );
});

app.get("/meteors", async (_, res) => {
    const html = await fs.readFile(path.resolve(process.cwd(), "preview/preview.html"), "utf-8");
    const template = handlebars.compile(html);

    const svg = meteors({
        width: 800,
        height: 300,
        backgroundColor: "#222299",
        color: "#952E9D",
        thickness: 4,
        min: 35,
        max: 40,
        bidirectional: true,
    });

    res.setHeader("Content-Type", "text/html");
    res.send(
        template({
            title: "meteors",
            svg,
        }),
    );
});

app.listen(PORT, () => {
    console.log(`👀 Preview server started at https://localhost:${PORT}.`);
});
