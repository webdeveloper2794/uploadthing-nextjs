import authConfig from "./auth.config";
import NextAuth from "next-auth";

// export const { auth: middleware } = NextAuth(authConfig);

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  const { pathname } = req.nextUrl;

  // Allow public access to the home page
  if (pathname === "/") {
    return null; // Continue with the request
  }

  // Redirect unauthenticated users to login
  if (!req.auth && (pathname === "/upload" || pathname === "/post-upload")) {
    return Response.redirect(new URL("/sign-in", req.nextUrl.origin));
  }

  // Redirect unauthenticated users to login, except for public routes
  if (req.auth && pathname === "/sign-in") {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }

  return null;
});

// export default auth((req) => {
//    // Continue with the request
// });

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
