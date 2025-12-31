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
    // 1. Initialize WOW.js
    if (typeof window !== "undefined" && window.WOW) {
      new window.WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: false,
        live: true,
        scrollContainer: null,
        resetAnimation: true,
      }).init();
    }

    // 2. Initialize Slick Carousel (if appearing on the page)
    // We wrap this in a timeout or check specifically to ensure DOM is ready or after navigation
    if (typeof window !== "undefined" && window.jQuery) {
      const $ = window.jQuery;

      const initSlick = () => {
        const $c = $(".classes-carousel");
        if ($c.length > 0) {
          // Prevent double init
          if ($c.hasClass("slick-initialized")) {
            $c.slick("unslick");
          }
          if (typeof $c.slick === "function") {
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
      };

      // 3. Initialize Masonry / Isotope (if appearing on the page)
      const initIsotope = () => {
        const $n = $(".masonary");
        if ($n.length > 0 && $.fn.isotope) {
          $n.isotope({ masonry: { columnWidth: 0.5 } });

          $(".option-set").find("a").off("click").on("click", function (this: HTMLElement) {
            const t = $(this);
            if (t.hasClass("selected")) return false;
            const e = t.parents(".option-set");
            e.find(".selected").removeClass("selected");
            t.addClass("selected");

            const i: any = {};
            const attrKey = e.attr("data-option-key");
            let attrValue: any = t.attr("data-option-value");

            if (attrValue === "false") attrValue = false;

            if (attrKey) {
              i[attrKey] = attrValue;
              $n.isotope(i);
            }
            return false;
          });
        }
      };

      // Delay initialization slightly to let React render
      setTimeout(() => {
        initSlick();
        initIsotope();
      }, 100);
    }

  }, [pathname]); // Re-run on route change

  return null;
}
