'use server';

import { prisma } from '@/lib/prisma';
import { generateCertificatePDF } from '@/lib/certificate-utils';
import { z } from 'zod';
import { put, del } from '@vercel/blob';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

const generateSchema = z.object({
    studentName: z.string().min(1, 'Student Name is required'),
    designation: z.string().min(1, 'Designation is required'),
    universityName: z.string().min(1, 'University Name is required'),
});

export async function generateCertificateAction(formData: FormData) {
    const rawData = {
        studentName: formData.get('studentName'),
        designation: formData.get('designation'),
        universityName: formData.get('universityName'),
    };

    const validatedFields = generateSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: 'Invalid input', details: validatedFields.error.flatten() };
    }

    const { studentName, designation, universityName } = validatedFields.data;

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
            designation,
            universityName,
            verifyCode
        }, baseUrl);

        let pdfUrl = '';

        // Check if Vercel Blob is configured
        if (process.env.BLOB_READ_WRITE_TOKEN) {
             const fileName = `${verifyCode}.pdf`;
            // Upload to Vercel Blob
            const blob = await put(`certificates/${fileName}`, Buffer.from(pdfBytes), {
                access: 'public',
                contentType: 'application/pdf',
            });
            pdfUrl = blob.url;
        } else {
            // Fallback: Save locally to public/certificates
            const fs = await import('fs');
            const path = await import('path');
            
            const certDir = path.join(process.cwd(), 'public', 'certificates');
            if (!fs.existsSync(certDir)) {
                fs.mkdirSync(certDir, { recursive: true });
            }
            
            const fileName = `${verifyCode}.pdf`;
            const filePath = path.join(certDir, fileName);
            fs.writeFileSync(filePath, Buffer.from(pdfBytes));
            
            // Construct URL relative to public
            pdfUrl = `/certificates/${fileName}`;
        }

        // Save to DB
        const certificate = await prisma.certificate.create({
            data: {
                studentName,
                designation,
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
            if (cert.pdfPath.startsWith('http')) {
                // Vercel Blob
                try {
                    await del(cert.pdfPath);
                } catch (blobError) {
                    console.warn("Failed to delete certificate from blob:", blobError);
                }
            } else {
                // Local File
                try {
                    const fs = await import('fs');
                    const path = await import('path');
                    // Remove leading slash to join correctly
                    const relativePath = cert.pdfPath.startsWith('/') ? cert.pdfPath.substring(1) : cert.pdfPath;
                    const filePath = path.join(process.cwd(), 'public', relativePath);
                    
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                } catch (localError) {
                    console.warn("Failed to delete local certificate file:", localError);
                }
            }
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
