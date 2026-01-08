"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    WOW: any;
    jQuery: any;
    $: any;
  }
}

export default function Scripts() {
  const pathname = usePathname();

  useEffect(() => {
    // Helper to check conditions and run init
    const checkAndInit = () => {
      // 1. Initialize WOW.js
      if (typeof window !== "undefined" && window.WOW && !document.body.classList.contains('wow-inited')) {
        new window.WOW({
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: false,
          live: true,
          scrollContainer: null,
          resetAnimation: true,
        }).init();
        document.body.classList.add('wow-inited');
      }

      // 2. Initialize Slick Carousel
      if (typeof window !== "undefined" && window.jQuery && window.jQuery.fn.slick) {
        const $ = window.jQuery;
        const $c = $(".classes-carousel");
        if ($c.length > 0) {
          if (!$c.hasClass("slick-initialized")) {
            $c.slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: false,
              arrows: true,
              autoplay: true,
              autoplaySpeed: 2000,
              infinite: true,
              responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3 } },
                { breakpoint: 991, settings: { slidesToShow: 3 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } },
                { breakpoint: 480, settings: { slidesToShow: 1 } }
              ]
            });
          }
        }

        const $t = $(".teachers-carousel");
        if ($t.length > 0) {
          if (!$t.hasClass("slick-initialized")) {
            $t.slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: false,
              arrows: true,
              autoplay: true,
              autoplaySpeed: 2000,
              infinite: true,
              responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3 } },
                { breakpoint: 991, settings: { slidesToShow: 3 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } },
                { breakpoint: 480, settings: { slidesToShow: 1 } }
              ]
            });
          }
        }
      }
    };

    // Run check immediately
    checkAndInit();

    // Poll for scripts for a few seconds
    const intervalId = setInterval(checkAndInit, 200);

    // Stop polling after 3 seconds to avoid infinite work
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };

  }, [pathname]); // Re-run on route change

  return null;
}
