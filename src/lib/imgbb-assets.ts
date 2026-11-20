import type { Db } from "mongodb";

interface ImgBBAsset {
    _id: string;
    deleteUrl: string;
    ownerEmail: string;
    createdAt: Date;
}

export async function saveImgBBAsset(
    database: Db,
    imageUrl: string,
    deleteUrl: string,
    ownerEmail: string
) {
    await database.collection<ImgBBAsset>("imgbbAssets").updateOne(
        { _id: imageUrl },
        {
            $set: {
                deleteUrl,
                ownerEmail,
                createdAt: new Date(),
            },
        },
        { upsert: true }
    );
}

export async function deleteImgBBImage(deleteUrl: string) {
    let url: URL;
    try {
        url = new URL(deleteUrl);
    } catch {
        throw new Error("ImgBB returned an invalid image deletion URL.");
    }

    if (
        url.protocol !== "https:"
        || !["ibb.co", "www.ibb.co"].includes(url.hostname)
        || url.username
        || url.password
    ) {
        throw new Error("ImgBB returned an unsupported image deletion URL.");
    }

    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`ImgBB image deletion failed with status ${response.status}.`);
    }
}

export async function deleteAccountProfileImage(
    database: Db,
    imageUrl: string | null | undefined,
    ownerEmail: string
) {
    if (!imageUrl) {
        return;
    }

    const assets = database.collection<ImgBBAsset>("imgbbAssets");
    const asset = await assets.findOne({ _id: imageUrl, ownerEmail });
    if (!asset) {
        return;
    }

    const [bookReferences, otherUserReferences] = await Promise.all([
        database.collection("books").countDocuments({ image: imageUrl }),
        database.collection("user").countDocuments({
            image: imageUrl,
            email: { $ne: ownerEmail },
        }),
    ]);

    if (bookReferences > 0 || otherUserReferences > 0) {
        return;
    }

    await deleteImgBBImage(asset.deleteUrl);
    await assets.deleteOne({ _id: imageUrl });
}
