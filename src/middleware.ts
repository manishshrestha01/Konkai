import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_LOCALE = "en";

/**
 * The site is served at the root of a domain that already belongs to the
 * restaurant, so a bare `/` is redirected to a language edition rather than
 * being published as a fourth, content-identical URL. Unknown first segments
 * are left alone; the page calls notFound() for them.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
