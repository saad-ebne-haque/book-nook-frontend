"use client";

import { authClient } from "@/lib/auth-client";

export async function authenticatedFetch(
    input: RequestInfo | URL,
    init: RequestInit = {},
): Promise<Response> {
    const { data, error } = await authClient.token();

    if (error) {
        throw new Error(error.message || "Unable to get an authentication token.");
    }

    if (!data?.token) {
        throw new Error("Please sign in to continue.");
    }

    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${data.token}`);

    return fetch(input, {
        ...init,
        headers,
    });
}
