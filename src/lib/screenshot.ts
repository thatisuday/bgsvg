import puppeteer from "puppeteer";
import { OutputType } from "./types";

export const screenshot = async ({
    svg,
    width,
    height,
    output,
}: {
    svg: string;
    width: number;
    height: number;
    output: Exclude<OutputType, { type: "svg" }>;
}): Promise<Buffer> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setViewport({
        width,
        height,
    });

    const htmlContent = `<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>bgsvg</title><style>html,body{padding:0;margin:0}</style></head><body>${svg}</body></html>`;

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0",
    });

    const buffer = await page.screenshot({
        type: output.type,
        quality: output.type === "jpeg" ? output.quality : 100,
    });

    await browser.close();

    return buffer;
};
