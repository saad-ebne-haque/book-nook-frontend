"use client";

import { Input, Label, Spinner, TextField, toast } from "@heroui/react";
import { useId, useState } from "react";

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

interface BookCoverFieldProps {
    value: string;
    onChange: (value: string) => void;
    onUploadingChange: (isUploading: boolean) => void;
}

export default function BookCoverField({
    value,
    onChange,
    onUploadingChange,
}: BookCoverFieldProps) {
    const fileInputId = useId();
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (image?: File) => {
        if (!image) {
            return;
        }

        onChange("");

        if (!allowedImageTypes.includes(image.type)) {
            toast.danger("Choose a JPEG, PNG, or WebP image.");
            return;
        }

        if (image.size > maxImageSize) {
            toast.danger("The image must be 5 MB or smaller.");
            return;
        }

        const uploadData = new FormData();
        uploadData.set("image", image);
        setIsUploading(true);
        onUploadingChange(true);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: uploadData,
            });
            const result = await response.json() as { url?: string; message?: string };

            if (!response.ok || !result.url) {
                throw new Error(result.message || "Failed to upload the book cover.");
            }

            onChange(result.url);
            toast.success("Book cover uploaded successfully.");
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to upload the book cover."
            );
        } finally {
            setIsUploading(false);
            onUploadingChange(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <Label htmlFor={fileInputId} className="font-medium text-[#464940]">
                    Upload a cover image
                </Label>
                <input
                    id={fileInputId}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={isUploading}
                    onChange={(event) => {
                        const image = event.currentTarget.files?.[0];
                        event.currentTarget.value = "";
                        void handleImageUpload(image);
                    }}
                    className="min-h-11 w-full rounded-xl border border-[#e9e2d5] bg-white px-3 py-2 text-sm text-[#464940] file:mr-3 file:rounded-full file:border-0 file:bg-[#eaf0e9] file:px-3 file:py-1 file:text-sm file:font-semibold file:text-[#315c4d]"
                />
                <p className="text-sm text-[#85867c]">
                    JPEG, PNG, or WebP; maximum size 5 MB.
                </p>
            </div>

            <TextField
                name="image"
                type="url"
                isRequired
                isDisabled={isUploading}
                className="w-full"
            >
                <Label className="font-medium text-[#464940]">Or paste an image URL</Label>
                <Input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="https://example.com/book-cover.jpg"
                    autoComplete="url"
                />
            </TextField>

            {isUploading && (
                <div role="status" className="flex items-center gap-2 text-sm text-[#315c4d]">
                    <Spinner size="sm" />
                    Uploading book cover...
                </div>
            )}

            {value && !isUploading && (
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#315c4d] underline"
                >
                    View selected cover
                </a>
            )}
        </div>
    );
}
