import { NextResponse } from "next/server";

// Pages reachable without a session.
const PUBLIC = ["/login", "/signup"];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get("aastha_session")?.value);
  const isPublic = PUBLIC.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Not logged in → send to login (remember where they were headed).
  if (!hasSession && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    if (pathname !== "/") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  // Already logged in → don't show login/signup again.
  if (hasSession && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Run on all routes except APIs, Next internals and static SEO files.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|icon.svg).*)"],
};
