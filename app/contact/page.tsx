"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    phone: "",
    Message: ""
  });
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await res.json();
        setStatus({ ok: result.ok, msg: result.message });
        if (result.ok) {
          setFormData({ Name: "", email: "", phone: "", Message: "" });
        }
      } else {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        setStatus({ ok: false, msg: "Server error (non-JSON response). Check console." });
      }

    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ ok: false, msg: "An error occurred: " + (error as Error).message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="pager-section">
        <div className="container">
          <div className="pager-content text-center">
            <h2>Contact Us </h2>
            <ul>
              <li><Link href="/" title="Home">Home</Link></li>
              <li><span>Contact Us</span></li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="mdp-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.4913969072113!2d66.9820026!3d24.949390599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36b7e3b8774b5%3A0xd8796c65c9b54a7b!2sEngineers%20%26%20Doctors%20Inn%20(E%26D)%20Campus%201!5e0!3m2!1sen!2s!4v1736839585095!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* mdp-map end */}
          <div className="mdp-contact">
            <div className="row">
              <div className="col-lg-8 col-md-7">
                <div className="comment-area">
                  <h3>Leave Your Message</h3>
                  <form id="contact-form" onSubmit={handleSubmit}>

                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="fl-field">
                          <input type="text" name="Name" id="Name" placeholder=" " required value={formData.Name} onChange={handleChange} />
                          <label htmlFor="Name"> Name</label>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="fl-field">
                          <input type="email" name="email" id="email" placeholder=" " required value={formData.email} onChange={handleChange} />
                          <label htmlFor="email">Email</label>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="fl-field">
                          <input type="tel" name="phone" id="phone" placeholder=" " required value={formData.phone} onChange={handleChange} />
                          <label htmlFor="phone">Phone</label>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="fl-field">
                          <textarea name="Message" id="Message" placeholder=" " required value={formData.Message} onChange={handleChange}></textarea>
                          <label htmlFor="Message">Message</label>
                        </div>
                      </div>

                      {/* Status Message */}
                      {status && (
                        <div className="col-lg-12 mb-3">
                          <div className={`alert ${status.ok ? "alert-success" : "alert-danger"}`}>
                            {status.msg}
                          </div>
                        </div>
                      )}

                      <div className="col-lg-12">
                        <div className="form-submit">
                          <button type="submit" id="submit" className="btn-default" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Now"} <i className="fa fa-long-arrow-alt-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* comment-area end */}
              </div>
              <div className="col-lg-4 col-md-5">
                <div className="mdp-our-contacts">
                  <h3>Our Contact</h3>
                  <ul>
                    <li>
                      <div className="d-flex flex-wrap">
                        <div className="icon-v">
                          <i className="fa-solid fa-phone-volume"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>Call</h4>
                          <span>
                            <a href="tel:+923032660229">+92 303 2660229</a>
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-wrap">
                        <div className="icon-v">
                          <i className="fa-regular fa-envelope"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>Email</h4>
                          <span>
                            <a href="mailto:info@edschool.pk">info@edschool.pk</a>
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-wrap">
                        <div className="icon-v">
                          <i className="fa-regular fa-clock"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>Work Time</h4>
                          <span>8:00am - 2:00pm Mon - Fri</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flexwrap">
                        <div className="icon-v">
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>Address</h4>
                          <span>
                            KESC # 187, L Block Road, Islam Nagar, Sector 11, Orangi Town Karachi.
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* mdp-our-contacts end */}
              </div>
            </div>
          </div>
          {/* mdp-contact end */}
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
