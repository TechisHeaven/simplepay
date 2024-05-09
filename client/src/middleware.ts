import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authHeader = request.headers
    .get("cookie")
    ?.includes("next-auth.session-token");
  const isAuthenticated = authHeader ? true : false;

  const CurrentUrlIsLogin = request.url.includes("/login");
  const CurrentUrlIsRegister = request.url.includes("/register");
  // If authenticated, continue
  if (isAuthenticated) {
    if (
      (isAuthenticated && CurrentUrlIsLogin) ||
      (isAuthenticated && CurrentUrlIsRegister)
    ) {
      const returnUrl = request.nextUrl.searchParams.get("returnUrl") || "/";
      if (returnUrl) {
        return NextResponse.redirect(new URL(returnUrl, request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (request.url.includes("/login") || request.url.includes("/register")) {
    // Check if user is already accessing login or register pages
    return NextResponse.next();
  }

  // Redirect with choice for registration or login
  const returnUrl = new URL(request.nextUrl).href;
  const url = new URL("/login", request.url); // Replace with actual login/register page
  url.searchParams.set("returnUrl", returnUrl); // Save intended destination
  return NextResponse.redirect(url);
}

export { default } from "next-auth/middleware";

// export default clerkMiddleware();

export const config = {
  matcher: [
    "/:path",
    "/login",
    "/register",
    // "/((?!.+.[w]+$|_next).*)",
    // "/",
    // "/(api|trpc)(.*)",
  ],
};
