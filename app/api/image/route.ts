import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_WIDTH = 2400;
const MIN_WIDTH = 16;

const DEFAULT_WIDTH = 800;

const MAX_INPUT_BYTES = 12 * 1024 * 1024; // 12 MB
const MAX_INPUT_PIXELS = 40_000_000; // 40 MP

const DEFAULT_QUALITY = 75;

type OutputFormat = "avif" | "webp" | "jpeg";

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function parseNumber(value: string | null, fallback: number) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

function accepts(header: string, type: string) {
    return header.split(",").some((part) => {
        const [mime, ...params] = part.trim().toLowerCase().split(";");

        if (mime !== type) return false;

        const q = params.find((p) => p.trim().startsWith("q="))?.split("=")[1];

        return q === undefined || Number(q) > 0;
    });
}

function negotiateFormat(accept: string): OutputFormat {
    if (accepts(accept, "image/avif")) {
        return "avif";
    }

    if (accepts(accept, "image/webp")) {
        return "webp";
    }

    return "jpeg";
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const imagePath = searchParams.get("url");

    if (!imagePath) {
        return new NextResponse("Missing URL parameter", {
            status: 400,
        });
    }

    const width = clamp(Math.floor(parseNumber(searchParams.get("w"), DEFAULT_WIDTH)), MIN_WIDTH, MAX_WIDTH);

    const quality = clamp(Math.floor(parseNumber(searchParams.get("q"), DEFAULT_QUALITY)), 20, 90);

    /*
     * Only allow local paths.
     *
     * Example:
     * /images/photo.jpg
     *
     * Do NOT blindly allow arbitrary external URLs here
     * unless you add SSRF protection / an allowlist.
     */
    if (!imagePath.startsWith("/")) {
        return new NextResponse("Invalid image URL", {
            status: 400,
        });
    }

    /*
     * Prevent recursive calls to this endpoint.
     */
    if (imagePath.startsWith("/api/image")) {
        return new NextResponse("Recursive image request", {
            status: 400,
        });
    }

    const sourceUrl = new URL(imagePath, request.url);

    const controller = new AbortController();

    const timeout = setTimeout(controller.abort, 8000);

    try {
        const response = await fetch(sourceUrl, {
            signal: controller.signal,
            cache: "force-cache",
        });

        if (!response.ok) {
            return new NextResponse("Failed to fetch image", {
                status: 400,
            });
        }

        const contentLength = Number(response.headers.get("content-length") || 0);

        if (contentLength && contentLength > MAX_INPUT_BYTES) {
            return new NextResponse("Image too large", {
                status: 413,
            });
        }

        const arrayBuffer = await response.arrayBuffer();

        if (arrayBuffer.byteLength > MAX_INPUT_BYTES) {
            return new NextResponse("Image too large", {
                status: 413,
            });
        }

        const input = Buffer.from(arrayBuffer);

        const accept = request.headers.get("accept") || "";

        const format = negotiateFormat(accept);

        let pipeline = sharp(input, {
            limitInputPixels: MAX_INPUT_PIXELS,
            sequentialRead: true,
        })
            .rotate()
            .resize({
                width,
                withoutEnlargement: true,
                fit: "inside",
                fastShrinkOnLoad: true,
            });

        switch (format) {
            case "avif":
                pipeline = pipeline.avif({
                    quality,
                    effort: 4,
                });
                break;

            case "webp":
                pipeline = pipeline.webp({
                    quality,
                    effort: 4,
                    smartSubsample: true,
                });
                break;

            case "jpeg":
                pipeline = pipeline.jpeg({
                    quality,
                    progressive: true,
                    mozjpeg: true,
                });
                break;
        }

        const output = await pipeline.toBuffer();

        return new NextResponse(new Uint8Array(output), {
            status: 200,
            headers: {
                "Content-Type": `image/${format}`,

                "Cache-Control": "public, max-age=31536000, immutable",

                "CDN-Cache-Control": "public, max-age=31536000, immutable",

                Vary: "Accept",

                "X-Image-Format": format,
            },
        });
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            return new NextResponse("Image fetch timed out", { status: 504 });
        }

        console.error("Image optimization error:", error);

        return new NextResponse("Error optimizing image", { status: 500 });
    } finally {
        clearTimeout(timeout);
    }
}
