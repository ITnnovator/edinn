import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Engineers & Doctors School Campus & Activities",
  description: "View the Engineers & Doctors School gallery—campus highlights, classrooms, events, student activities, and memorable moments from our Karachi school community.",
  alternates: {
      canonical: "https://edschool.pk/gallery"
  }
};

export default function Gallery() {
  // Array of 54 images as seen in the legacy file (gallery01.jpg to gallery54.jpg)
  const images = Array.from({ length: 54 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/webImages/gallery_edmin/gallery${num}.jpg`;
  });

  return (
    <>
      <section className="pager-section">
        <div className="container">
          <div className="pager-content text-center">
            <h2>Gallery</h2>
            <ul>
              <li><Link href="/" title="Home">Home</Link></li>
              <li><span>Gallery</span></li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>

      <section className="insta-section classes-page">
        <div className="container content-standard">
          <div className="insta-flex">
            {images.map((imgSrc, index) => (
              <div className="insta-item" key={index}>
                <a href={imgSrc} data-group="set1" className="insta-slide html5lightbox">
                  <img src={imgSrc} alt={`Gallery Image ${index + 1}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* newsletter-sec starts */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-sec">
            <div className="row align-items-center">
              <div className="col-lg-6">
                 <div className="newsz-ltr-text">
                  <h2>Build Your Career<br />With Us</h2>
                </div>
                {/* newsz-ltr-text end */}
              </div>

              <div className="col-lg-6">
                <Link href="/career" title="Career Opportunities" className="btn-default">
                   Career Opportunities <i className="fa fa-long-arrow-alt-right"></i>
                </Link>
                {/* newsletter-form end */}
              </div>
            </div>
          </div>
          {/* newsletter-sec end */}
        </div>
      </section>
      {/* newsletter-sec end */}
    </>
  );
}
