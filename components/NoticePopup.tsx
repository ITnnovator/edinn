"use client";
import React, { useEffect, useState } from 'react';
import { getNotice } from "@/app/actions/notice";
import Image from 'next/image';

export default function NoticePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [notice, setNotice] = useState<{
        content: string;
        image: string | null;
        isActive: boolean;
        id: string; // Added ID to type
    } | null>(null);

    useEffect(() => {
        async function fetchNotice() {
            try {
                const res = await getNotice();
                if (res.success && res.data && res.data.isActive) {
                    setNotice(res.data as any); 
                    setTimeout(() => setIsVisible(true), 1000); 
                }
            } catch (err) {
                console.error("Error loading notice:", err);
            }
        }
        fetchNotice();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!notice || !isVisible) return null;

    return (
        <div className="notice-overlay">
            <div className="notice-popup">
                <div className="popup-header">
                    <span className="notice-label">NOTICE BOARD</span>
                    <button onClick={handleClose} className="close-btn">×</button>
                </div>
                
                <div className="popup-body">
                    {notice.image && (
                        <div className="popup-image-container">
                            <Image 
                                src={notice.image} 
                                alt="Notice" 
                                width={500} 
                                height={300} 
                                className="popup-image"
                                unoptimized
                            />
                        </div>
                    )}
                    <div className="popup-content">
                        <p>{notice.content}</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .notice-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(4px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease-out;
                    padding: 20px;
                }

                .notice-popup {
                    background: white;
                    width: 100%;
                    max-width: 500px;
                    border: none;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    animation: slideUp 0.4s ease-out;
                    overflow: hidden;
                    position: relative;
                    border-radius: 12px;
                }

                .popup-header {
                    background: linear-gradient(90deg, #01ffff, #63f101);
                    color: #000;
                    padding: 12px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .notice-label {
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    font-size: 14px;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: #000;
                    font-size: 28px;
                    line-height: 1;
                    cursor: pointer;
                    padding: 0;
                    transition: transform 0.2s;
                }
                
                .close-btn:hover {
                    transform: scale(1.1);
                }

                .popup-body {
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .popup-image-container {
                    width: 100%;
                    background: #f5f5f5;
                }

                .popup-image {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .popup-content {
                    padding: 30px;
                    text-align: center;
                }

                .popup-content p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #000;
                    margin: 0;
                    white-space: pre-wrap; /* Preserve line breaks */
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
