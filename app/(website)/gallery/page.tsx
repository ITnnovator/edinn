import Link from "next/link";
import LightBoxGallery from "@/components/LightBoxGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Engineers & Doctors School Campus & Activities",
  description: "View the Engineers & Doctors School gallery—campus highlights, classrooms, events, student activities, and memorable moments from our Karachi school community.",
  alternates: {
    canonical: "https://edschool.pk/gallery"
  }
};

// Server Component
import { getGalleryImages } from "@/app/actions/gallery";

export default async function Gallery() {
  const { data: dbImages } = await getGalleryImages("main");
  const images = dbImages || [];

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
            {images.length > 0 ? (
                <LightBoxGallery
                className="insta-flex"
                layout="insta"
                images={images.map((img, index) => ({
                    src: img.url,
                    alt: img.title || `Gallery Image ${index + 1}`,
                    className: "insta-item"
                }))}
                />
            ) : (
                <div className="text-center py-5">
                    <p>No images found in the gallery.</p>
                </div>
            )}
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
