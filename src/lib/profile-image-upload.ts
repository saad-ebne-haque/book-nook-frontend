export async function uploadProfileImage(image: File) {
    const formData = new FormData();
    formData.set("image", image);

    const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
    });

    let result: { url?: string; message?: string };
    try {
        result = await response.json() as { url?: string; message?: string };
    } catch {
        throw new Error("The image upload returned an invalid response.");
    }

    if (!response.ok || !result.url) {
        throw new Error(result.message || "Failed to upload the profile photo.");
    }

    return result.url;
}
