import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { verifyJwt } from "./app/[local]/(auth)/auth/jwt";
import { sanitizeRef } from "./i18n/brand";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["/cart", "/thank_you", "/checkout"];
const adminRoutes = ["/admin"];

function matches(pathname: string, routes: string[]): boolean {
    return routes.some((route) => {
        if (pathname === route || pathname.startsWith(`${route}/`)) return true;
        return routing.locales.some((locale) => pathname === `/${locale}${route}` || pathname.startsWith(`/${locale}${route}/`));
    });
}

export default function proxy(request: NextRequest) {
    const { searchParams } = new URL(request.headers.get("referer") || request.nextUrl.href);
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) return NextResponse.next();

    const BOT = /facebookexternalhit|facebookcatalog|Instagram|WhatsApp|Twitterbot|Slackbot|Discordbot|TelegramBot|LinkedInBot|Googlebot|bingbot|Applebot|SkypeUriPreview|redditbot|Iframely|embedly/i;

    if (BOT.test(request.headers.get("user-agent") || "")) return handleI18nRouting(request);
    if (request.headers.get("purpose") == "prefetch") return handleI18nRouting(request);

    for (const [name, value] of searchParams.entries()) request.nextUrl.searchParams.set(name, value);

    const isAdminRoute = matches(pathname, adminRoutes);
    const isProtectedRoute = isAdminRoute || matches(pathname, protectedRoutes);

    if (isProtectedRoute) {
        const token = request.cookies.get("accessToken")?.value;

        const loginUrl = new URL("/auth/log_in", request.url);

        for (const [name, value] of searchParams.entries()) loginUrl.searchParams.set(name, value);

        loginUrl.searchParams.set("redirect", pathname);

        if (!token) return NextResponse.redirect(loginUrl);

        try {
            const payload = verifyJwt(token);
            if (!payload) return NextResponse.redirect(loginUrl);

            if (isAdminRoute && !payload.admin) return NextResponse.redirect(new URL("/not_found", request.url));
        } catch {
            return NextResponse.redirect(loginUrl);
        }
    }

    const response = handleI18nRouting(request);

    const ref = sanitizeRef(request.nextUrl.searchParams.get("ref"));
    if (ref) {
        response.cookies.set("ref", ref, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
    } else if (request.nextUrl.searchParams.has("ref")) {
        response.cookies.delete("ref"); // ?ref= with nothing clears it
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
