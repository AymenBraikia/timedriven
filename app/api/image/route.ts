// import { NextRequest, NextResponse } from "next/server";
// import { avif, mozjpeg, png, resize, webp } from "@squoosh-kit/core";
// import type { ImageInput } from "@squoosh-kit/core";

// export const runtime = "nodejs";
// export const maxDuration = 10;

// const MAX_WIDTH = 2400;
// const MIN_WIDTH = 16;

// const DEFAULT_WIDTH = 800;

// const MAX_INPUT_BYTES = 12 * 1024 * 1024; // 12 MB
// const MAX_INPUT_PIXELS = 40_000_000; // 40 MP

// const DEFAULT_QUALITY = 75;

// type OutputFormat = "avif" | "webp" | "jpeg";

// function clamp(value: number, min: number, max: number) {
//     return Math.min(Math.max(value, min), max);
// }

// function parseNumber(value: string | null, fallback: number) {
//     const n = Number(value);

//     return Number.isFinite(n) ? n : fallback;
// }

// function accepts(header: string, type: string) {
//     return header.split(",").some((part) => {
//         const [mime, ...params] = part.trim().toLowerCase().split(";");

//         if (mime !== type) {
//             return false;
//         }

//         const q = params.find((p) => p.trim().startsWith("q="))?.split("=")[1];

//         return q === undefined || Number(q) > 0;
//     });
// }

// function negotiateFormat(accept: string): OutputFormat {
//     if (accepts(accept, "image/avif")) {
//         return "avif";
//     }

//     if (accepts(accept, "image/webp")) {
//         return "webp";
//     }

//     return "jpeg";
// }

// /**
//  * Detect image format from magic bytes.
//  *
//  * This is more trustworthy than blindly
//  * trusting Content-Type.
//  */
// function detectImageFormat(data: Uint8Array): "jpeg" | "png" | "webp" | "avif" | null {
//     // JPEG
//     if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
//         return "jpeg";
//     }

//     // PNG
//     if (data.length >= 8 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47 && data[4] === 0x0d && data[5] === 0x0a && data[6] === 0x1a && data[7] === 0x0a) {
//         return "png";
//     }

//     // WebP
//     if (
//         data.length >= 12 &&
//         data[0] === 0x52 && // R
//         data[1] === 0x49 && // I
//         data[2] === 0x46 && // F
//         data[3] === 0x46 && // F
//         data[8] === 0x57 && // W
//         data[9] === 0x45 && // E
//         data[10] === 0x42 && // B
//         data[11] === 0x50 // P
//     ) {
//         return "webp";
//     }

//     /*
//      * AVIF / ISO-BMFF:
//      *
//      * bytes 4-7 = "ftyp"
//      * followed by brands such as:
//      * avif, avis, mif1
//      */
//     if (
//         data.length >= 12 &&
//         data[4] === 0x66 && // f
//         data[5] === 0x74 && // t
//         data[6] === 0x79 && // y
//         data[7] === 0x70 // p
//     ) {
//         const brand = String.fromCharCode(data[8], data[9], data[10], data[11]);

//         if (brand === "avif" || brand === "avis" || brand === "mif1" || brand === "msf1") {
//             return "avif";
//         }
//     }

//     return null;
// }

// /**
//  * Some decoders can produce images larger than
//  * our configured pixel limit.
//  *
//  * Check the decoded image before allocating
//  * additional processing buffers.
//  */
// function validateImageInput(image: ImageInput) {
//     if (!Number.isInteger(image.width) || !Number.isInteger(image.height) || image.width <= 0 || image.height <= 0) {
//         throw new Error("Invalid decoded image dimensions");
//     }

//     const pixels = image.width * image.height;

//     if (!Number.isSafeInteger(pixels) || pixels > MAX_INPUT_PIXELS) {
//         throw new Error("Image exceeds pixel limit");
//     }

//     const expectedBytes = pixels * 4;

//     if (image.data.byteLength < expectedBytes) {
//         throw new Error("Decoded image buffer is too small");
//     }
// }

// export async function GET(request: NextRequest) {
//     const { searchParams } = new URL(request.url);

//     const imagePath = searchParams.get("url");

//     if (!imagePath) {
//         return new NextResponse("Missing URL parameter", {
//             status: 400,
//         });
//     }

//     const width = clamp(Math.floor(parseNumber(searchParams.get("w"), DEFAULT_WIDTH)), MIN_WIDTH, MAX_WIDTH);

//     const quality = clamp(Math.floor(parseNumber(searchParams.get("q"), DEFAULT_QUALITY)), 20, 90);

//     /*
//      * Only permit local paths.
//      *
//      * Example:
//      * /images/photo.jpg
//      *
//      * This prevents arbitrary external fetches.
//      */
//     if (!imagePath.startsWith("/")) {
//         return new NextResponse("Invalid image URL", {
//             status: 400,
//         });
//     }

//     /*
//      * Prevent recursive calls to this endpoint.
//      */
//     if (imagePath === "/api/image" || imagePath.startsWith("/api/image/") || imagePath.startsWith("/api/image?")) {
//         return new NextResponse("Recursive image request", {
//             status: 400,
//         });
//     }

//     const sourceUrl = new URL(imagePath, request.url);

//     const controller = new AbortController();

//     const timeout = setTimeout(() => controller.abort(), 8000);

//     try {
//         /*
//          * Fetch original image.
//          */
//         const response = await fetch(sourceUrl, {
//             signal: controller.signal,
//             cache: "force-cache",
//         });

//         if (!response.ok) {
//             return new NextResponse("Failed to fetch image", {
//                 status: 400,
//             });
//         }

//         /*
//          * Reject using Content-Length
//          * when the origin provides it.
//          */
//         const contentLengthHeader = response.headers.get("content-length");

//         const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;

//         if (Number.isFinite(contentLength) && contentLength > MAX_INPUT_BYTES) {
//             return new NextResponse("Image too large", {
//                 status: 413,
//             });
//         }

//         /*
//          * Read body.
//          */
//         const arrayBuffer = await response.arrayBuffer();

//         /*
//          * Enforce the real size as well.
//          *
//          * Content-Length can be missing.
//          */
//         if (arrayBuffer.byteLength > MAX_INPUT_BYTES) {
//             return new NextResponse("Image too large", {
//                 status: 413,
//             });
//         }

//         const input = new Uint8Array(arrayBuffer);

//         /*
//          * Detect original format.
//          */
//         const inputFormat = detectImageFormat(input);

//         if (!inputFormat) {
//             return new NextResponse("Unsupported image format", {
//                 status: 415,
//             });
//         }

//         /*
//          * Select browser-compatible output.
//          */
//         const accept = request.headers.get("accept") || "";

//         const format = negotiateFormat(accept);

//         /*
//          * Decode into raw RGBA pixels.
//          *
//          * Squoosh-Kit codecs operate on
//          * ImageInput rather than encoded
//          * image bytes.
//          */
//         let decoded: ImageInput;

//         switch (inputFormat) {
//             case "jpeg": {
//                 decoded = await mozjpeg.decode(input);

//                 break;
//             }

//             case "png": {
//                 decoded = await png.decode(input);

//                 break;
//             }

//             case "webp": {
//                 decoded = await webp.decode(input);

//                 break;
//             }

//             case "avif": {
//                 decoded = await avif.decode(input);

//                 break;
//             }

//             default:
//                 return new NextResponse("Unsupported image format", {
//                     status: 415,
//                 });
//         }

//         /*
//          * Make sure the decoded image
//          * stays within your pixel limit.
//          */
//         validateImageInput(decoded);

//         /*
//          * Don't enlarge smaller images.
//          *
//          * Sharp's withoutEnlargement behavior
//          * is reproduced here by calculating
//          * whether resize is actually needed.
//          */
//         const targetWidth = Math.min(width, decoded.width);

//         let processed: ImageInput = decoded;

//         if (targetWidth < decoded.width) {
//             /*
//              * Aspect ratio is maintained
//              * automatically when only width
//              * is supplied.
//              */
//             processed = await resize.resize(
//                 decoded,
//                 {
//                     width: targetWidth,

//                     method: "lanczos3",

//                     /*
//                      * Keep alpha correct for
//                      * transparent PNG/WebP/AVIF.
//                      */
//                     premultiply: true,
//                 },
//                 controller.signal,
//             );
//         }

//         validateImageInput(processed);

//         /*
//          * Encode the resized pixels.
//          */
//         let output: Uint8Array;

//         let contentType: string;

//         switch (format) {
//             case "avif": {
//                 output = await avif.encode(
//                     processed,
//                     {
//                         quality,
//                     },
//                     controller.signal,
//                 );

//                 contentType = "image/avif";

//                 break;
//             }

//             case "webp": {
//                 output = await webp.encode(
//                     processed,
//                     {
//                         quality,
//                         lossless: false,
//                     },
//                     controller.signal,
//                 );

//                 contentType = "image/webp";

//                 break;
//             }

//             case "jpeg":
//             default: {
//                 output = await mozjpeg.encode(
//                     processed,
//                     {
//                         quality,
//                     },
//                     controller.signal,
//                 );

//                 contentType = "image/jpeg";

//                 break;
//             }
//         }

//         /*
//          * Make sure we actually return a
//          * Uint8Array that NextResponse accepts.
//          */
//         const body = new Uint8Array(output);

//         return new NextResponse(body, {
//             status: 200,

//             headers: {
//                 "Content-Type": contentType,

//                 /*
//                  * URL + width + quality +
//                  * Accept determine the result.
//                  */
//                 "Cache-Control": "public, max-age=31536000, immutable",

//                 "CDN-Cache-Control": "public, max-age=31536000, immutable",

//                 Vary: "Accept",

//                 "X-Image-Format": format,

//                 "X-Image-Width": String(processed.width),

//                 "X-Image-Height": String(processed.height),
//             },
//         });
//     } catch (error) {
//         if (error instanceof Error && error.name === "AbortError") {
//             return new NextResponse("Image processing timed out", {
//                 status: 504,
//             });
//         }

//         console.error("Image optimization error:", error);

//         return new NextResponse("Error optimizing image", {
//             status: 500,
//         });
//     } finally {
//         clearTimeout(timeout);
//     }
// }
