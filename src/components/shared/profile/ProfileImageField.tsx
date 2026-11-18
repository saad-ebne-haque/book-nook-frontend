"use client";

import { Input, Label, Spinner, TextField, toast } from "@heroui/react";
import { useId, useState } from "react";
import { uploadProfileImage } from "@/lib/profile-image-upload";

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

interface ProfileImageFieldProps {
    value: string;
    onChange: (value: string) => void;
    onUploadingChange?: (isUploading: boolean) => void;
    deferUploadUntilRegistration?: boolean;
    onFileSelected?: (image: File | null) => void;
    validate?: (value: string) => string | null;
}

export default function ProfileImageField({
    value,
    onChange,
    onUploadingChange,
    deferUploadUntilRegistration = false,
    onFileSelected,
    validate,
}: ProfileImageFieldProps) {
    const fileInputId = useId();
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleImageUpload = async (image?: File) => {
        if (!image) {
            return;
        }

        if (!allowedImageTypes.includes(image.type)) {
            toast.danger("Choose a JPEG, PNG, or WebP image.");
            return;
        }

        if (image.size > maxImageSize) {
            toast.danger("The image must be 5 MB or smaller.");
            return;
        }

        onChange("");

        if (deferUploadUntilRegistration) {
            setSelectedFileName(image.name);
            onFileSelected?.(image);
            return;
        }

        setSelectedFileName("");
        onFileSelected?.(null);
        setIsUploading(true);
        onUploadingChange?.(true);

        try {
            const imageUrl = await uploadProfileImage(image);
            onChange(imageUrl);
            toast.success("Profile photo uploaded successfully.");
        } catch (error) {
            toast.danger(
                error instanceof Error ? error.message : "Failed to upload the profile photo."
            );
        } finally {
            setIsUploading(false);
            onUploadingChange?.(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <Label htmlFor={fileInputId} className="font-medium text-[#464940]">
                    Upload a profile photo
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
                    {deferUploadUntilRegistration
                        ? selectedFileName
                            ? `${selectedFileName} will upload after account creation.`
                            : "JPEG, PNG, or WebP; the photo uploads after account creation."
                        : "JPEG, PNG, or WebP; maximum size 5 MB."}
                </p>
            </div>

            <TextField
                name="image"
                type="url"
                isDisabled={isUploading}
                className="w-full"
                validate={validate}
            >
                <Label className="font-medium text-[#464940]">Or paste a profile photo URL</Label>
                <Input
                    value={value}
                    onChange={(event) => {
                        onChange(event.target.value);
                        setSelectedFileName("");
                        onFileSelected?.(null);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    autoComplete="url"
                />
            </TextField>

            {isUploading && (
                <div role="status" className="flex items-center gap-2 text-sm text-[#315c4d]">
                    <Spinner size="sm" />
                    Uploading profile photo...
                </div>
            )}

            {value && !isUploading && (
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#315c4d] underline"
                >
                    View selected photo
                </a>
            )}
        </div>
    );
}
