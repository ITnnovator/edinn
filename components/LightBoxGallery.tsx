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
    className?: string; // For the container ul/div
}

declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

export default function LightBoxGallery({ images, className = "masonary" }: LightBoxGalleryProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // Initialize Isotope after images are loaded
        if (typeof window !== "undefined" && window.jQuery) {
            const $ = window.jQuery;
            const $container = $(containerRef.current);

            const init = () => {
                if ($container.length > 0 && $.fn.isotope) {
                    // If imagesLoaded is available, use it
                    if ($container.imagesLoaded) {
                        $container.imagesLoaded(() => {
                            $container.isotope({ masonry: { columnWidth: 0.5 } });
                        });
                    } else {
                        // Fallback
                        setTimeout(() => {
                            $container.isotope({ masonry: { columnWidth: 0.5 } });
                        }, 500);
                    }
                }
            };

            // Try to init immediately (in case scripts are ready)
            init();

            // Also waiting for a bit in case scripts are lazy loading
            const timer = setTimeout(init, 200);
            return () => clearTimeout(timer);
        }
    }, [images]);

    const handleClick = (i: number, e: React.MouseEvent) => {
        e.preventDefault();
        setIndex(i);
        setOpen(true);
    };

    return (
        <>
            <ul className={className} ref={containerRef}>
                {images.map((img, i) => (
                    <li key={i} className={img.className || `width${(i % 10) + 1} wow zoomIn`} data-wow-duration="1000ms">
                        <a
                            href={img.src}
                            onClick={(e) => handleClick(i, e)}
                            className="html5lightbox" // Maintaining class for any potential legacy CSS styling on the anchor, though not for functionality
                            title={img.title || ""}
                        >
                            <img src={img.src} alt={img.alt} />
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
