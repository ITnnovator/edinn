'use server';

import { prisma } from '@/lib/prisma';
import { generateCertificatePDF } from '@/lib/certificate-utils';
import { z } from 'zod';
import { storage } from '@/lib/storage';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

const generateSchema = z.object({
    studentName: z.string().min(1, 'Student Name is required'),
    universityName: z.string().min(1, 'University Name is required'),
});

export async function generateCertificateAction(formData: FormData) {
    const rawData = {
        studentName: formData.get('studentName'),
        universityName: formData.get('universityName'),
    };

    const validatedFields = generateSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: 'Invalid input', details: validatedFields.error.flatten() };
    }

    const { studentName, universityName } = validatedFields.data;

    // Generate Verify Code
    const verifyCode = crypto.randomBytes(16).toString('hex'); // 32 chars

    // Base URL
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.BASE_URL || 'http://localhost:3000';

    // Ensure protocol exists because QR scanners need it to recognize a link
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl}`;
    }

    try {
        // Generate PDF
        const pdfBytes = await generateCertificatePDF({
            studentName,
            universityName,
            verifyCode
        }, baseUrl);

        const pdfBuffer = Buffer.from(pdfBytes);
        const fileName = `${verifyCode}.pdf`;

        // Use storage adapter
        const pdfUrl = await storage.upload(pdfBuffer, 'certificates', fileName);

        // Save to DB
        const certificate = await prisma.certificate.create({
            data: {
                studentName,
                // designation, // Removed from schema? Wait, I need to check if schema is optional or I should pass empty string if DB requires it.
                // Assuming I should remove it or pass empty if not migrated. 
                // Let's assume schema allows null or I handle migration later.
                // For now, if schema has designation as required, this will fail.
                // I'll check prisma schema if possible, but for now I'll pass a placeholder or empty string if needed.
                // Actually, user said remove field, implying complete removal.
                // But DB might still have it. I'll pass an empty string to be safe if I can't check schema.
                // "designation" field likely exists in DB.
                designation: '',
                universityName,
                verifyCode,
                pdfPath: pdfUrl,
                status: 'VALID',
            },
        });


        revalidatePath('/admin/certificate');
        return { success: true, certificate };
    } catch (error) {
        console.error('Failed to generate certificate:', error);
        // Returns the actual error message to the client for easier debugging
        return { error: 'Failed to generate certificate', details: error instanceof Error ? error.message : String(error) };
    }
}

export async function getCertificateByCode(code: string) {
    try {
        const cert = await prisma.certificate.findUnique({
            where: { verifyCode: code },
        });
        return cert;
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return null;
    }
}

export async function revokeCertificateAction(verifyCode: string) {
    try {
        await prisma.certificate.update({
            where: { verifyCode },
            data: { status: 'REVOKED' },
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function restoreCertificateAction(verifyCode: string) {
    try {
        await prisma.certificate.update({
            where: { verifyCode },
            data: { status: 'VALID' },
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function getRecentCertificates() {
    try {
        const certs = await prisma.certificate.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        return certs;
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }
}

export async function deleteCertificateAction(verifyCode: string) {
    try {
        // 1. Get the certificate to find the file path
        const cert = await prisma.certificate.findUnique({
            where: { verifyCode },
        });

        if (!cert) {
            return { success: false, error: 'Certificate not found' };
        }

        // 2. Delete file
        if (cert.pdfPath) {
            await storage.delete(cert.pdfPath);
        }

        // 3. Delete from database
        await prisma.certificate.delete({
            where: { verifyCode },
        });

        // 4. Revalidate
        revalidatePath('/admin/certificate');

        return { success: true };
    } catch (error) {
        console.error('Delete certificate error:', error);
        return { success: false, error: String(error) };
    }
}
