import { auth } from "./auth"
import { NextRequest } from "next/server"

export async function proxy(req: NextRequest) {
  const session = await auth();
  
  if (!session && req.nextUrl.pathname.startsWith("/profile")) {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
