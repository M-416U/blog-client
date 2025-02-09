import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { cookieName, fallbackLng, languages } from "@/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|.well-known).*)",
  ],
};

export function middleware(req: NextRequest) {
  let lng: string | null = null;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);

  // if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));

  if (!lng) lng = fallbackLng;

  if (req.nextUrl.pathname.startsWith("/.well-known")) {
    return NextResponse.next();
  }

  // Redirect if lng in path is not supported
  if (
    // @ts-expect-error: Unreachable code error
    !languages.some((loc: any) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }

  // const referer = req.headers.get("referer");
  // if (referer) {
  //   const refererUrl = new URL(referer);
  //   const lngInReferer = languages.find((l) =>
  //     refererUrl.pathname.startsWith(`/${l}`)
  //   );
  //   const response = NextResponse.next();
  //   if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  //   return response;
  // }

  return NextResponse.next();
}
