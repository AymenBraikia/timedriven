export type Visitor = {
    id: string;
    timestamp: Date;

    // Client
    ip?: string;
    userAgent: string;
    referer?: string;

    // Device/browser
    device?: "desktop" | "mobile" | "tablet" | "unknown";
    browser?: string;
    os?: string;

    visits: number;
};
