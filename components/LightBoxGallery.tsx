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
        // Function to check and initialize Isotope
        const checkAndInit = () => {
            if (typeof window !== "undefined" && window.jQuery && window.jQuery.fn.isotope) {
                const $ = window.jQuery;
                const $container = $(containerRef.current);

                if ($container.length > 0 && !$container.hasClass('isotope-initialized')) {
                    const initIsotope = () => {
                        $container.isotope({
                            itemSelector: 'li', // Assuming list items are the grid elements, adjust if needed based on usage
                            masonry: { columnWidth: 0.5 }
                        });
                        $container.addClass('isotope-initialized');
                    };

                    if ($container.imagesLoaded) {
                        $container.imagesLoaded(initIsotope);
                    } else {
                        // Fallback if imagesLoaded is not available or taking time
                        setTimeout(initIsotope, 500);
                    }
                    return true; // Initialized successfully
                }
            }
            return false; // Not yet initialized
        };

        if (effectiveLayout === 'masonry') {
            // Check immediately
            if (checkAndInit()) return;

            // Poll for scripts
            const intervalId = setInterval(() => {
                if (checkAndInit()) {
                    clearInterval(intervalId);
                }
            }, 200);

            // Stop polling after 5 seconds to prevent infinite checking
            const timeoutId = setTimeout(() => {
                clearInterval(intervalId);
            }, 5000);

            return () => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
            };
        }
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
                                    style={{ width: '100%' }}
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
