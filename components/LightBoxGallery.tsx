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
        // Initialize Isotope only for 'masonry' mode if needed, or 'insta' if it uses isotope too?
        // The user's code for LightBoxGallery previously had Isotope logic.
        // The 'insta' classes typically imply an Instagram feed style, possibly grid or flex.
        // We'll preserve the Isotope init for now as it was in the user's provided file.
        
        if (typeof window !== "undefined" && window.jQuery) {
            const $ = window.jQuery;
            // logic...
             // We only run isotope if it's the masonry layout or if the user explicitly provided logic for it.
             // The user's provided code ran it unconditionally on the container ref.
             // Let's keep it safe.
            const $container = $(containerRef.current);
             
            const init = () => {
                if ($container.length > 0 && $.fn.isotope) {
                    // Check if we verify imagesLoaded
                    if ($container.imagesLoaded) {
                        $container.imagesLoaded(() => {
                            $container.isotope({ masonry: { columnWidth: 0.5 } });
                        });
                    } else {
                        setTimeout(() => {
                            $container.isotope({ masonry: { columnWidth: 0.5 } });
                        }, 500);
                    }
                }
            };
            
            // Only run isotope if we are in a mode that needs it? 
            // The Home page (masonry) definitely used it.
            // Check if 'insta-flex' uses it? Probably not, usually just flexbox.
            // But running it might break flex.
            // Let's only run it if layout === 'masonry'.
            
            if (effectiveLayout === 'masonry') {
                init();
                const timer = setTimeout(init, 200);
                return () => clearTimeout(timer);
            }
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
