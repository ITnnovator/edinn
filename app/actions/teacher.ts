
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { teachers as staticTeachers } from "@/lib/teachers";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function getTeachers() {
    try {
        const teachers = await prisma.teacher.findMany({
            include: {
                skills: true,
                socials: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: teachers };
    } catch (error) {
        console.error("Failed to fetch teachers:", error);
        return { success: false, error: "Failed to fetch teachers" };
    }
}

export async function getTeacherBySlug(slug: string) {
    try {
        const teacher = await prisma.teacher.findUnique({
            where: { slug },
            include: {
                skills: true,
                socials: true,
            },
        });
        return { success: true, data: teacher };
    } catch (error) {
        console.error("Failed to fetch teacher:", error);
        return { success: false, error: "Failed to fetch teacher" };
    }
}

export async function getTeacherById(id: string) {
    try {
        const teacher = await prisma.teacher.findUnique({
            where: { id },
            include: {
                skills: true,
                socials: true,
            },
        });
        return { success: true, data: teacher };
    } catch (error) {
        console.error("Failed to fetch teacher:", error);
        return { success: false, error: "Failed to fetch teacher" };
    }
}

export async function createTeacher(data: FormData) {
    try {
        const name = data.get("name") as string;
        const slug = data.get("slug") as string;
        const role = data.get("role") as string;
        const email = data.get("email") as string;
        const bio = data.get("bio") as string;
        const dob = data.get("dob") as string;
        const education = data.get("education") as string;
        const experience = data.get("experience") as string;

        // JSON parsed fields
        const skills = JSON.parse(data.get("skills") as string || "[]");
        const socials = JSON.parse(data.get("socials") as string || "{}");

        // Image Handling
        const imageFile = data.get("image") as File;

        let imagePath = "";
        let detailImagePath = ""; // Mirror main image

        if (imageFile && imageFile.size > 0) {
            imagePath = await saveImage(imageFile);
            detailImagePath = imagePath;
        }

        // Use provided slug or fallback generation (though form requires it)
        const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-4);

        // Validating Uniqueness
        const existingTeacher = await prisma.teacher.findUnique({ where: { slug: finalSlug } });
        if (existingTeacher) {
            return { success: false, error: "Slug already exists. Please choose a unique one." };
        }

        const calculateColor = (p: number) => {
            const percentage = Number(p);
            if (percentage > 80) return "#39ff14"; // Parrot Green
            if (percentage >= 40) return "#ffeb3b"; // Yellow
            return "#ff0000"; // Red
        };

        const cleanSocials = {
            facebook: socials.facebook || "",
            twitter: socials.twitter || "",
            linkedin: socials.linkedin || "",
            instagram: socials.instagram || "",
        };

        await prisma.teacher.create({
            data: {
                name,
                role,
                slug: finalSlug,
                email,
                bio,
                dob,
                education,
                experience,
                image: imagePath,
                detailImage: detailImagePath,
                skills: {
                    create: skills.map((s: any) => ({
                        name: s.name,
                        percentage: Number(s.percentage),
                        color: calculateColor(s.percentage)
                    }))
                },
                socials: {
                    create: cleanSocials
                }
            },
        });

        revalidatePath("/admin/teachers");
        revalidatePath("/about");
        return { success: true };
    } catch (error) {
        console.error("Failed to create teacher:", error);
        return { success: false, error: "Failed to create teacher" };
    }
}

export async function updateTeacher(id: string, data: FormData) {
    try {
        const name = data.get("name") as string;
        const slug = data.get("slug") as string;
        const role = data.get("role") as string;
        const email = data.get("email") as string;
        const bio = data.get("bio") as string;
        const dob = data.get("dob") as string;
        const education = data.get("education") as string;
        const experience = data.get("experience") as string;

        try {
            const skills = JSON.parse(data.get("skills") as string || "[]");
            const socials = JSON.parse(data.get("socials") as string || "{}");
            console.log("Parsed skills/socials");

            const imageFile = data.get("image") as File;

            console.log("Updating teacher:", id);
            console.log("New Email:", email);
            console.log("New Name:", name);
            console.log("New Slug:", slug);

            const teacher = await prisma.teacher.findUnique({ where: { id } });
            if (!teacher) return { success: false, error: "Teacher not found" };

            // Uniqueness check for update
            if (slug && slug !== teacher.slug) {
                const existingTeacher = await prisma.teacher.findUnique({ where: { slug } });
                if (existingTeacher) {
                    return { success: false, error: "Slug already exists. Please choose a unique one." };
                }
            }

            let imagePath = teacher.image;
            let detailImagePath = teacher.detailImage;

            if (imageFile && imageFile.size > 0) {
                console.log("Saving new image...");
                imagePath = await saveImage(imageFile);
                detailImagePath = imagePath; // Mirror main image to detail image
            }

            const cleanSocials = {
                facebook: socials.facebook || "",
                twitter: socials.twitter || "",
                linkedin: socials.linkedin || "",
                instagram: socials.instagram || "",
            };

            const calculateColor = (p: number) => {
                const percentage = Number(p);
                if (percentage > 80) return "#39ff14"; // Parrot Green
                if (percentage >= 40) return "#ffeb3b"; // Yellow
                return "#ff0000"; // Red
            };

            console.log("Executing DB transaction...");
            // Transaction to update teacher and replace skills/socials
            await prisma.$transaction([
                prisma.teacher.update({
                    where: { id },
                    data: {
                        name,
                        slug,
                        role,
                        email,
                        bio,
                        dob,
                        education,
                        experience,
                        image: imagePath,
                        detailImage: detailImagePath,
                        socials: {
                            upsert: {
                                create: cleanSocials,
                                update: cleanSocials
                            }
                        }
                    }
                }),
                prisma.skill.deleteMany({ where: { teacherId: id } }),
                prisma.skill.createMany({
                    data: skills.map((s: any) => ({
                        teacherId: id,
                        name: s.name,
                        percentage: Number(s.percentage),
                        color: calculateColor(s.percentage)
                    }))
                })
            ]);
            console.log("Transaction successful");

            revalidatePath("/admin/teachers");
            revalidatePath(`/admin/teachers/${id}`);
            revalidatePath("/about");
            revalidatePath(`/teachers/${teacher.slug}`);
            return { success: true };
        } catch (e: any) {
            console.error("Inner update error:", e);
            throw e; // Rethrow to outer catch
        }
    } catch (error: any) {
        console.error("Failed to update teacher:", error);
        return { success: false, error: error.message || "Failed to update teacher" };
    }
}

export async function deleteTeacher(id: string) {
    try {
        await prisma.teacher.delete({ where: { id } });
        revalidatePath("/admin/teachers");
        revalidatePath("/about");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete teacher:", error);
        return { success: false, error: "Failed to delete teacher" };
    }
}

export async function seedTeachers() {
    try {
        console.log("Seeding teachers...");
        for (const t of staticTeachers) {
            const exists = await prisma.teacher.findUnique({ where: { slug: t.slug } });
            if (!exists) {
                await prisma.teacher.create({
                    data: {
                        name: t.name,
                        slug: t.slug,
                        role: t.role,
                        image: t.image,
                        detailImage: t.detailImage,
                        email: t.email,
                        bio: t.bio,
                        dob: t.dob,
                        education: t.education,
                        experience: t.experience,
                        skills: {
                            create: t.skills
                        },
                        socials: {
                            create: t.socials
                        }
                    }
                });
            }
        }
        revalidatePath("/admin/teachers");
        return { success: true, message: "Teachers seeded successfully" };
    } catch (error: any) {
        console.error("Seeding failed:", error);
        return { success: false, error: error.message };
    }
}

// Helper to save uploaded images
async function saveImage(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const uploadDir = join(process.cwd(), "public", "uploads", "teachers");

    // Create dir if not exists
    await mkdir(uploadDir, { recursive: true });

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return `/uploads/teachers/${filename}`;
}
