"use client";

import { authClient } from "@/lib/auth-client";

export async function getClientAuthToken(): Promise<string> {
    const { data, error } = await authClient.token();

    if (error) {
        throw new Error(error.message || "Unable to get an authentication token.");
    }

    if (!data?.token) {
        throw new Error("Please sign in to continue.");
    }

    return data.token;
}
