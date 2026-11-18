import { auth } from "@/lib/auth";

const maxImageSize = 5 * 1024 * 1024;
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

interface ImgBBResponse {
    success?: boolean;
    data?: {
        url?: string;
    };
}

export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return Response.json({ message: "Please sign in to upload an image." }, { status: 401 });
    }

    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return Response.json({ message: "Choose an image file to upload." }, { status: 400 });
    }

    const image = formData.get("image");
    if (!(image instanceof File)) {
        return Response.json({ message: "Choose an image file to upload." }, { status: 400 });
    }

    if (!allowedImageTypes.includes(image.type)) {
        return Response.json({ message: "Use a JPEG, PNG, or WebP image." }, { status: 400 });
    }

    if (image.size > maxImageSize) {
        return Response.json({ message: "The image must be 5 MB or smaller." }, { status: 413 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
        console.error("IMGBB_API_KEY is not configured.");
        return Response.json({ message: "Image upload is not configured." }, { status: 500 });
    }

    const uploadUrl = new URL("https://api.imgbb.com/1/upload");
    uploadUrl.searchParams.set("key", apiKey);

    const uploadData = new FormData();
    uploadData.set("image", image);

    let uploadResponse: Response;
    try {
        uploadResponse = await fetch(uploadUrl, {
            method: "POST",
            body: uploadData,
        });
    } catch (error) {
        console.error("ImgBB upload request failed.", error);
        return Response.json({ message: "Could not reach the image host." }, { status: 502 });
    }

    let result: ImgBBResponse;
    try {
        result = await uploadResponse.json() as ImgBBResponse;
    } catch (error) {
        console.error("ImgBB returned an invalid response.", error);
        return Response.json({ message: "The image host returned an invalid response." }, { status: 502 });
    }

    if (!uploadResponse.ok || !result.success || !result.data?.url) {
        console.error("ImgBB did not accept the image.", uploadResponse.status);
        return Response.json({ message: "ImgBB could not upload this image." }, { status: 502 });
    }

    return Response.json({ url: result.data.url });
}
