"use client";

import { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

interface GalleryImage {
    src: string;
    alt: string;
    title?: string;
    className?: string;
}

interface LightBoxGalleryProps {
    images: GalleryImage[];
    className?: string; // For the container
    enableMasonry?: boolean; // Legacy prop
    layout?: 'masonry' | 'insta' | 'grid';
}

declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

export default function LightBoxGallery({ 
    images, 
    className, 
    enableMasonry = false,
    layout 
}: LightBoxGalleryProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | HTMLUListElement>(null);

    // Determine effective layout mode
    // If layout is explicit, use it.
    // If layout is undefined, default to 'masonry' because that is the legacy behavior expected by the Home page.
    // (enableMasonry prop is kept for backward compatibility if it's ever explicitly passed as true/false, but we lean towards masonry default).
    
    // Logic: 
    // 1. layout prop takes precedence.
    // 2. if enableMasonry is explicitly true, use masonry.
    // 3. functional default is masonry.
    
    const effectiveLayout = layout || (enableMasonry ? 'masonry' : 'masonry');

    useEffect(() => {
        if (effectiveLayout !== 'masonry') return;

        let intervalId: NodeJS.Timeout;
        let attempts = 0;
        const maxAttempts = 20; // 4 seconds total polling

        const initMasonry = () => {
            if (typeof window !== "undefined" && window.jQuery && window.jQuery.fn.isotope && window.jQuery.fn.imagesLoaded) {
                const $ = window.jQuery;
                const $container = $(containerRef.current);

                if ($container.length > 0) {
                    $container.imagesLoaded(() => {
                        $container.isotope({
                            itemSelector: 'li',
                            masonry: {
                                columnWidth: 'li' // Use li as column width reference
                            }
                        });
                        // Forced layout after a small delay to catch any missed updates
                        setTimeout(() => {
                            $container.isotope('layout');
                        }, 500);
                    });
                    
                    clearInterval(intervalId);
                    return true;
                }
            }
            return false;
        };

        // Try immediately
        if (!initMasonry()) {
            intervalId = setInterval(() => {
                attempts++;
                if (initMasonry() || attempts >= maxAttempts) {
                    clearInterval(intervalId);
                }
            }, 200);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [images, effectiveLayout]);

    const handleClick = (i: number, e: React.MouseEvent) => {
        e.preventDefault();
        setIndex(i);
        setOpen(true);
    };

    if (effectiveLayout === 'insta') {
        return (
             <>
                <div className="insta-flex" ref={containerRef as React.RefObject<HTMLDivElement>}>
                    {images.map((img, i) => (
                        <div key={i} className="insta-item">
                            <a
                                href={img.src}
                                onClick={(e) => handleClick(i, e)}
                                className="insta-slide html5lightbox"
                                title={img.title || ""}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <Image 
                                    src={img.src} 
                                    alt={img.alt}
                                    width={0} 
                                    height={0} 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ width: '100%'}}
                                />
                            </a>
                        </div>
                    ))}
                </div>

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    index={index}
                    slides={images.map((img) => ({ src: img.src, alt: img.alt, title: img.title }))}
                />
            </>
        );
    }

    // Default / Masonry Legacy Mode
    // Default className was "masonary" in the user's pasted file.
    const containerClass = className || "masonary";

    return (
        <>
            <style jsx>{`
                .masonary {
                    display: flex;
                    flex-wrap: wrap;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                }
                /* Once isotope-layout is active, it will use position absolute */
                .masonary.isotope {
                    display: block;
                }
            `}</style>
            <ul className={containerClass} ref={containerRef as React.RefObject<HTMLUListElement>}>
                {images.map((img, i) => (
                    <li key={i} className={img.className || `width${(i % 10) + 1} wow zoomIn`} data-wow-duration="1000ms">
                        <a
                            href={img.src}
                            onClick={(e) => handleClick(i, e)}
                            className="html5lightbox"
                            title={img.title || ""}
                        >
                            <Image 
                                src={img.src} 
                                alt={img.alt} 
                                width={0} 
                                height={0} 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ width: '100%' }}
                            />
                        </a>
                    </li>
                ))}
            </ul>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map((img) => ({ src: img.src, alt: img.alt, title: img.title }))}
            />
        </>
    );
}
