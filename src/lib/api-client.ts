"use client";

import { getClientAuthToken } from "@/lib/auth-token-client";

export async function authenticatedFetch(
    input: RequestInfo | URL,
    init: RequestInit = {},
): Promise<Response> {
    const token = await getClientAuthToken();

    const headers = new Headers(init.headers);
    headers.set("authorization", `Bearer ${token}`);

    return fetch(input, {
        ...init,
        headers,
    });
}
