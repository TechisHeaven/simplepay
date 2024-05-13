import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const auth = await req.cookies.get("next-auth.session-token")?.value;
  const CurrentUrlIsLogin = url.pathname.startsWith("/login");
  const CurrentUrlIsRegister = url.pathname.startsWith("/register");

  if (!auth) {
    if (!CurrentUrlIsLogin && !CurrentUrlIsRegister) {
      const returnUrl = new URL(req.nextUrl).href;
      const url = new URL("/login", req.url);
      url.searchParams.set("returnUrl", returnUrl);
      return NextResponse.redirect(url);
    }
  }
  if (auth) {
    if (CurrentUrlIsLogin || CurrentUrlIsRegister) {
      const returnUrl = new URL(req.nextUrl).href;
      const url = new URL("/", req.url);
      url.searchParams.set("returnUrl", returnUrl);
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
}

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
