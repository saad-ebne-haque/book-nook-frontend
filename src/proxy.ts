import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  // Check user session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // User is not logged in
  if (!session) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  // User is logged in
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/books/:id",
  ],
};