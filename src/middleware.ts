/** middleware can only be used with nextjs api */

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.rewrite("/");
//   console.log("OKAWDOAKWOD", request);
//   if (request.nextUrl.pathname.startsWith("/tournament")) {
//     return NextResponse.redirect(new URL("/tournament", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/*", "/tournament/:path*"],
// };
