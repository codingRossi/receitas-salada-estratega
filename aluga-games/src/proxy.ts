import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);
const isAdminLoginRoute = createRouteMatcher(["/admin/login(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isAdminRoute(request) && !isAdminLoginRoute(request)) {
    await auth.protect({
      unauthenticatedUrl: "/admin/login",
    });
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
