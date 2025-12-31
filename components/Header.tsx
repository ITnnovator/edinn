"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
    // Include the body scroll-hide toggle to match original behavior
    if (!isMenuOpen) {
      document.body.classList.add("scroll-hide");
    } else {
      document.body.classList.remove("scroll-hide");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("scroll-hide");
  };

  // Helper to check if link is active
  const isActive = (path: string) => pathname === path ? "active" : "";

  return (
    <header>
      <div className="container">
        <div className="header-content d-flex flex-wrap align-items-center">
          <div className="logo">
            <Link href="/" title="Engineers & Doctors School - Home" onClick={closeMenu}>
              <img
                src="/webImages/logo.png"
                alt="Engineers & Doctors School Logo"
              />
            </Link>
          </div>
          {/* logo end */}

          <ul className="contact-add d-flex flex-wrap">
            <li>
              <div className="contact-info">
                <i className="fa-solid fa-phone-volume"></i>
                <div className="contact-tt">
                  <h4>Call / WhatsApp</h4>
                  <span>
                    {" "}
                    <a href="tel:+923032660229">+92 303 2660229</a>
                  </span>
                </div>
              </div>
              {/* contact-info end */}
            </li>
            <li>
              <div className="contact-info">
                <i className="fa fa-envelope"></i>
                <div className="contact-tt">
                  <h4>Email</h4>
                  <span>
                    {" "}
                    <a href="mailto:info@edschool.pk">info@edschool.pk</a>
                  </span>
                </div>
              </div>
              {/* contact-info end */}
            </li>
          </ul>
          {/* contact-information end */}

          <div className="menu-btn" onClick={toggleMenu}>
            <a href="#" className={isMenuOpen ? "active" : ""}>
              <span className="bar1"></span> <span className="bar2"></span>{" "}
              <span className="bar3"></span>
            </a>
          </div>
          {/* menu-btn end */}
        </div>
        {/* header-content end */}

        <div className="navigation-bar d-flex flex-wrap align-items-center">
          <nav>
            <ul>
              <li>
                <Link href="/" title="Home" className={isActive("/")} onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" title="About Us" className={isActive("/about")} onClick={closeMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" title="academics" className={isActive("/academics")} onClick={closeMenu}>
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admission" title="Admissions" className={isActive("/admission")} onClick={closeMenu}>
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/gallery" title="Gallery" className={isActive("/gallery")} onClick={closeMenu}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" title="Contact" className={isActive("/contact")} onClick={closeMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          {/* nav end */}
        </div>
        {/* navigation-bar end */}
      </div>

      <div className={`responsive-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link className={isActive("/")} href="/" title="Home" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link className={isActive("/about")} href="/about" title="About Engineers & Doctors School" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link className={isActive("/academics")} href="/academics" title="Academic Programs" onClick={closeMenu}>
              Academics
            </Link>
          </li>
          <li>
            <Link className={isActive("/admission")} href="/admission" title="Admissions" onClick={closeMenu}>
              Admissions
            </Link>
          </li>
          <li>
            <Link className={isActive("/gallery")} href="/gallery" title="Admissions" onClick={closeMenu}>
              Gallery
            </Link>
          </li>
          <li>
            <Link className={isActive("/contact")} href="/contact" title="Contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
