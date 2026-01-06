"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function getNotice() {
    try {
        let notice = await prisma.notice.findFirst();

        if (!notice) {
            notice = await prisma.notice.create({
                data: {
                    content: "Welcome to our website!",
                    isActive: false
                }
            });
        }

        return { success: true, data: notice };
    } catch (error) {
        console.error("Failed to fetch notice:", error);
        return { success: false, error: "Failed to fetch notice" };
    }
}

export async function updateNotice(formData: FormData) {
    try {
        const content = formData.get("content") as string;
        const isActive = formData.get("isActive") === "true";
        const imageFile = formData.get("image") as File | null;

        // Get existing notice ID
        const existingNotice = await prisma.notice.findFirst();
        const id = existingNotice?.id;

        // @ts-ignore
        let imageUrl = existingNotice?.image;

        // Handle Image Upload
        if (imageFile && imageFile.size > 0) {
            const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
            const blob = await put(`notices/${filename}`, imageFile, {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN,
            });
            imageUrl = blob.url;
        }

        if (id) {
            await prisma.notice.update({
                where: { id },
                data: {
                    content,
                    isActive,
                    // @ts-ignore
                    image: imageUrl
                }
            });
        } else {
            // New notice creation
            // If they are creating a notice, they should probably upload an image or content.
            // If image is uploaded it's in imageUrl.
            await prisma.notice.create({
                data: {
                    content,
                    isActive,
                    // @ts-ignore
                    image: imageUrl
                }
            });
        }

        // Handle image removal if explicitly requested and no new image uploaded
        if (formData.get("removeImage") === "true" && !imageFile?.size && id) {
            await prisma.notice.update({
                where: { id },
                data: {
                    // @ts-ignore
                    image: null
                }
            });
        }
        revalidatePath("/");
        revalidatePath("/admin/notices");
        return { success: true };

    } catch (error: any) {
        console.error("Failed to update notice:", error);
        return { success: false, error: error.message || "Failed to update notice" };
    }
}
