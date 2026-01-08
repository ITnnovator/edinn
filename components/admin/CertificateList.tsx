'use client';

import React from 'react';
import { revokeCertificateAction, restoreCertificateAction, deleteCertificateAction } from '@/app/actions/certificate';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Certificate {
    id: string;
    studentName: string;
    designation: string;
    verifyCode: string;
    status: string;
    pdfPath: string | null;
    createdAt: string;
}

interface CertificateListProps {
    initialCertificates: Certificate[];
}

export default function CertificateList({ initialCertificates }: CertificateListProps) {
    const router = useRouter();

    const handleRevoke = async (verifyCode: string) => {
        if (!confirm('Are you sure you want to revoke this certificate?')) return;

        const result = await revokeCertificateAction(verifyCode);
        if (result.success) {
            toast.success('Certificate revoked');
            router.refresh(); // Refresh stored data
        } else {
            toast.error('Failed to revoke');
        }
    };

    const handleRestore = async (verifyCode: string) => {
        const result = await restoreCertificateAction(verifyCode);
        if (result.success) {
            toast.success('Certificate restored');
            router.refresh();
        } else {
            toast.error('Failed to restore');
        }
    };

    const handleDelete = async (verifyCode: string) => {
        if (!confirm('Are you sure you want to PERMANENTLY delete this certificate? This action cannot be undone.')) return;

        const result = await deleteCertificateAction(verifyCode);
        if (result.success) {
            toast.success('Certificate deleted permanently');
            router.refresh(); // Refresh stored data
        } else {
            toast.error('Failed to delete certificate');
        }
    };

    return (
        <div className="bg-white p-6 rounded-[20px] shadow-[0_3px_11px_0_rgb(0,0,0,0.02)]">
            <h2 className="text-xl font-bold mb-6 text-[#2B3674]">Recent Certificates</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#E0E5F2]">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#A3AED0] uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#A3AED0] uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#A3AED0] uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-[#A3AED0] uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E0E5F2]">
                        {initialCertificates.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-[#A3AED0] font-medium">No certificates generated yet.</td>
                            </tr>
                        ) : (
                            initialCertificates.map((cert) => (
                                <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#2B3674]">{cert.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${cert.status === 'VALID' ? 'bg-[#05CD99] bg-opacity-10 text-[#ffffff]' : 'bg-[#EE5D50] bg-opacity-10 text-[#ffffff]'}`}>
                                            {cert.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2B3674]">{cert.createdAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        {cert.pdfPath && (
                                            <a href={cert.pdfPath} target="_blank" className="text-[#4318FF] hover:text-[#2B3674] transition font-bold text-xs bg-[#F4F7FE] p-2 rounded-lg">
                                                <i className="fas fa-eye mr-1"></i> View
                                            </a>
                                        )}
                                        {cert.status === 'VALID' ? (
                                            <button onClick={() => handleRevoke(cert.verifyCode)} className="text-[#EE5D50] hover:text-red-700 transition font-bold text-xs bg-red-50 p-2 rounded-lg">
                                                Revoke
                                            </button>
                                        ) : (
                                            <button onClick={() => handleRestore(cert.verifyCode)} className="text-[#05CD99] hover:text-green-700 transition font-bold text-xs bg-green-50 p-2 rounded-lg">
                                                Restore
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(cert.verifyCode)} className="text-[#EE5D50] hover:text-red-700 transition font-bold text-xs bg-red-50 p-2 rounded-lg" title="Delete Permanently">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
