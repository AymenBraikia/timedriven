import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { verifyJwt } from "./app/[local]/(auth)/auth/jwt";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["/cart", "/thank_you", "/checkout"];
const adminRoutes = ["/admin"];

/** Matches /admin, /admin/..., /en/admin, /de/admin/... */
function matches(pathname: string, routes: string[]): boolean {
    return routes.some((route) => {
        if (pathname === route || pathname.startsWith(`${route}/`)) return true;
        return routing.locales.some((locale) => pathname === `/${locale}${route}` || pathname.startsWith(`/${locale}${route}/`));
    });
}

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) return NextResponse.next();

    if (request.headers.get("purpose") == "prefetch") return handleI18nRouting(request);

    const isAdminRoute = matches(pathname, adminRoutes);
    const isProtectedRoute = isAdminRoute || matches(pathname, protectedRoutes);

    if (isProtectedRoute) {
        const token = request.cookies.get("accessToken")?.value;

        const loginUrl = new URL("/auth/log_in", request.url);
        loginUrl.searchParams.set("redirect", pathname);

        if (!token) return NextResponse.redirect(loginUrl);

        try {
            const payload = verifyJwt(token);
            if (!payload) return NextResponse.redirect(loginUrl);

            // Cheap early exit only. The admin layout re-checks against the database,
            // because this claim is baked into a token that lives for 7 days.
            if (isAdminRoute && !payload.admin) return NextResponse.redirect(new URL("/not_found", request.url));
        } catch {
            return NextResponse.redirect(loginUrl);
        }
    }

    return handleI18nRouting(request);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
