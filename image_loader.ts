export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    // If using relative paths, prepend your production domain
    const fullSrc = src.startsWith("http") ? src : `${process.env.NODE_ENV == "production" ? "https://arvell.vercel.app" : "http://localhost:3000"}${src}`;

    return `https://wsrv.nl/?url=${encodeURIComponent(fullSrc)}&w=${width}&q=${quality || 75}&output=webp`;
}
