"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

import { GalleryImage } from "@prisma/client";

type GalleryResponse = {
  success: boolean;
  data?: GalleryImage[];
  error?: string;
};

type SingleGalleryResponse = {
  success: boolean;
  data?: GalleryImage;
  error?: string;
};

export async function getGalleryImages(category: string): Promise<GalleryResponse> {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: images };
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return { success: false, error: "Failed to fetch images" };
  }
}

export async function uploadGalleryImage(formData: FormData): Promise<SingleGalleryResponse> {
  try {
    const file = formData.get("image") as File;
    const category = formData.get("category") as string || "general";

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;

    // Upload to Vercel Blob
    const blob = await put(`gallery/${filename}`, file, {
      access: 'public',
    });

    const imageUrl = blob.url;

    const newImage = await prisma.galleryImage.create({
      data: {
        url: imageUrl,
        category,
        title: file.name,
      },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    revalidatePath("/"); // For home gallery

    return { success: true, data: newImage };
  } catch (error) {
    console.error("Failed to upload image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}

export async function deleteGalleryImage(id: string): Promise<GalleryResponse> {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return { success: false, error: "Image not found" };
    }

    // Attempt to delete file from blob storage
    try {
      if (image.url.startsWith('http')) {
        await del(image.url);
      }
    } catch (blobError) {
      console.warn("Failed to delete file from blob storage:", blobError);
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete image:", error);
    return { success: false, error: "Failed to delete image" };
  }
}

export async function deleteBulkGalleryImages(ids: string[]): Promise<GalleryResponse> {
  try {
    for (const id of ids) {
      await deleteGalleryImage(id);
    }

    // Bulk revalidation is handled inside deleteGalleryImage, but specific checks technically safer
    revalidatePath("/admin/gallery");

    return { success: true };
  } catch (error) {
    console.error("Failed to bulk delete images:", error);
    return { success: false, error: "Failed to bulk delete images" };
  }
}
