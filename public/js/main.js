$(window).on("load", function () {
    $(function () {
        var n = $(".masonary");
        n.isotope({ masonry: { columnWidth: 0.5 } }),
            $(".option-set")
                .find("a")
                .on("click", function () {
                    var t = $(this);
                    if (t.hasClass("selected")) return !1;
                    var e = t.parents(".option-set");
                    e.find(".selected").removeClass("selected"), t.addClass("selected");
                    var i = {},
                        o = e.attr("data-option-key"),
                        e = "false" !== (e = t.attr("data-option-value")) && e;
                    return (
                        (i[o] = e),
                        "layoutMode" === o && "function" == typeof changeLayoutMode
                            ? changeLayoutMode(t, i)
                            : n.isotope(i),
                        !1
                    );
                });
    });
});
768 < $(window).width() &&
    $(window).on("load", function () {
        "use strict";
        new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !1,
            live: !0,
            callback: function (t) { },
            scrollContainer: null,
            resetAnimation: !0,
        }).init();
    });


jQuery(function ($) {
    var $c = $(".classes-carousel");

    // Prevent double init
    if ($c.hasClass("slick-initialized")) {
        $c.slick("unslick");
    }

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

    var $t = $(".teachers-carousel");

    // Prevent double init
    if ($t.hasClass("slick-initialized")) {
        $t.slick("unslick");
    }

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
});


(function () {
    for (
        var t = document.getElementsByTagName("script"), e = "", i = 0;
        i < t.length;
        i++
    )
        t[i].src &&
            t[i].src.match(/html5lightbox\.js/i) &&
            (e = t[i].src.substr(0, t[i].src.lastIndexOf("/") + 1));
    var o,
        n,
        s = !1;
    ("undefined" == typeof jQuery ||
        (o = jQuery.fn.jquery.split("."))[0] < 1 ||
        (1 == o[0] && o[1] < 6)) &&
        (s = !0),
        s
            ? ((s = document.getElementsByTagName("head")[0]),
                (n = document.createElement("script")).setAttribute(
                    "type",
                    "text/javascript"
                ),
                n.readyState
                    ? (n.onreadystatechange = function () {
                        ("loaded" != n.readyState && "complete" != n.readyState) ||
                            ((n.onreadystatechange = null), loadHtml5LightBox(e));
                    })
                    : (n.onload = function () {
                        loadHtml5LightBox(e);
                    }),
                n.setAttribute("src", e + "jquery.js"),
                s.appendChild(n))
            : loadHtml5LightBox(e);
})();

jQuery(".menu-btn").on("click", function () {
    jQuery(this).toggleClass("active"),
        jQuery(".responsive-menu").toggleClass("active"),
        jQuery("body").toggleClass("scroll-hide");
})

alertify.set('notifier', 'position', 'top-right');

// Switch active class on navbar links
// Function to update the active link

// Function to update the active link
// Function to update the active link
function updateActiveClass() {
    console.log("Current Page:", currentPage);

    // Get the current page URL (only the filename part, ignoring subdirectories)
    var currentPage = window.location.pathname.split("/").pop();

    // If the path is empty (home page), set it to "index.php"
    if (currentPage === "") {
        currentPage = "index";
    }

    // If the current page URL doesn't have .php (e.g., /about, /admission)
    // Append .php to it for matching with the links
    // if (!currentPage.includes(".php")) {
    //     currentPage += ".php";
    // }

    // Get all menu links (for both desktop and mobile)
    var menuLinks = document.querySelectorAll("nav ul li a, .responsive-menu ul li a");

    // Loop through each link
    menuLinks.forEach(function (link) {
        // Get the href of the link (only the filename part)
        var linkPage = link.getAttribute("href").split("/").pop();

        // If the link's page matches the current page, add the "active" class
        if (currentPage === linkPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Run the function when the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    updateActiveClass();
});

// Optional: Re-run the function on AJAX updates if your page uses AJAX
document.addEventListener("ajaxContentLoaded", function () {
    updateActiveClass();
});
