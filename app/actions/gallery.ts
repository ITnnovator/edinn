
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function getGalleryImages(category: string = "general") {
    try {
        const images = await prisma.galleryImage.findMany({
            where: { category },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: images };
    } catch (error) {
        console.error("Failed to fetch images:", error);
        return { success: false, error: "Failed to fetch images" };
    }
}

export async function uploadGalleryImage(formData: FormData) {
    try {
        const files = formData.getAll("image") as File[];
        const category = (formData.get("category") as string) || "general";
        
        if (!files || files.length === 0) {
            return { success: false, error: "No image files provided" };
        }

        // Limit Check for 'home' category
        if (category === "home") {
            const currentCount = await prisma.galleryImage.count({
                where: { category: "home" }
            });
            if (currentCount + files.length > 10) {
                return { success: false, error: `Home Page Gallery limit (10) exceeded. You can only add ${10 - currentCount} more images.` };
            }
        }

        const uploadDir = join(process.cwd(), "public", "uploads", "gallery");
        await mkdir(uploadDir, { recursive: true });

        const savedImages = [];

        for (const file of files) {
            if (file.size === 0) continue;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Ensure unique filename
            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
            const filepath = join(uploadDir, filename);
            await writeFile(filepath, buffer);

            const url = `/uploads/gallery/${filename}`;

            const newImage = await prisma.galleryImage.create({
                data: {
                    url,
                    title: file.name, // Use filename as default title
                    category,
                    width: 0,
                    height: 0,
                },
            });
            savedImages.push(newImage);
        }

        revalidatePath("/admin/gallery");
        revalidatePath("/");
        revalidatePath("/gallery");
        return { success: true, data: savedImages };

    } catch (error: any) {
        console.error("Upload failed:", error);
        return { success: false, error: error.message || "Upload failed" };
    }
}

export async function deleteGalleryImage(id: string) {
    try {
        const image = await prisma.galleryImage.findUnique({ where: { id } });
        if (!image) return { success: false, error: "Image not found" };

        // Delete from DB
        await prisma.galleryImage.delete({ where: { id } });

        // Try to delete local file
        try {
            const filePath = join(process.cwd(), "public", image.url.replace(/^\//, "").replace(/\//g, "\\")); // Adjust for Windows path if needed, or just use forward slashes which join handles
             // Actually join handles separators, but we need to strip leading slash from url
            const localPath = join(process.cwd(), "public", ...image.url.split("/").filter(Boolean));
            
            if (existsSync(localPath)) {
                await unlink(localPath);
            }
        } catch (filesErr) {
            console.warn("Could not delete file from disk:", filesErr);
            // Non-blocking, continue
        }

        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Delete failed:", error);
        return { success: false, error: "Delete failed" };
    }
}

export async function deleteBulkGalleryImages(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: "No images selected" };

        const images = await prisma.galleryImage.findMany({
            where: { id: { in: ids } }
        });

        // Delete from DB
        await prisma.galleryImage.deleteMany({
            where: { id: { in: ids } }
        });

        // Delete local files
        for (const image of images) {
            try {
                // Determine local path safely
                const localPath = join(process.cwd(), "public", ...image.url.split("/").filter(Boolean));
                
                if (existsSync(localPath)) {
                    await unlink(localPath);
                }
            } catch (err) {
                console.warn(`Failed to delete file for image ${image.id}:`, err);
            }
        }

        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Bulk delete failed:", error);
        return { success: false, error: "Bulk delete failed" };
    }
}

