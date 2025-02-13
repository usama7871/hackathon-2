import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",
  "/contact",
  "/shop",  // Making main shop page public
  "/blog",  // Making main blog page public
];

export default clerkMiddleware(async (auth, req) => {
  // If the route is public, allow access
  if (publicRoutes.some(pattern => createRouteMatcher(pattern)(req))) {
    return;
  }

  // For all other routes, protect with authentication
  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};