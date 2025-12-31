import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="top-footer">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="widget widget-about">
                  <img src="/webImages/logo.png" alt="Engineers & Doctors School Logo" />
                  <p>
                    Engineers & Doctors School offers a future-focused
                    education with STEM-based
                    learning, robotics, languages, arts and digital literacy in
                    a caring environment.
                  </p>
                </div>
                {/* widget-about end */}
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="widget widget-contact">
                  <ul className="contact-add">
                    <li>
                      <div className="contact-info">
                        <i className="fa-solid fa-phone-volume"></i>
                        <div className="contact-tt">
                          <h4>Call / WhatsApp</h4>
                          <span> <a href="tel:+923032660229">+92 303 2660229</a></span>
                        </div>
                      </div>
                      {/* contact-info end */}
                    </li>
                    <li>
                      <div className="contact-info">
                        <i className="fa-regular fa-envelope"></i>
                        <div className="contact-tt">
                          <h4>Email</h4>
                          <span> <a href="mailto:info@edschool.pk">info@edschool.pk</a></span>
                        </div>
                      </div>
                      {/* contact-info end */}
                    </li>
                    <li>
                      <div className="contact-info">
                        <i className="fa-regular fa-clock"></i>
                        <div className="contact-tt">
                          <h4>School Timings</h4>
                          <span>Mon – Fri · 8:00 AM – 2:00 PM</span>
                        </div>
                      </div>
                      {/* contact-info end */}
                    </li>
                    <li>
                      <div className="contact-info">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="contact-tt">
                          <h4>Address</h4>
                          <span> <a href="https://maps.app.goo.gl/VAhtzep2GzF4TZ4J7" target="_blank">KESC # 187, L Block Rd,
                            Islam Nagar, Orangi
                            Town, Karachi</a></span>
                        </div>
                      </div>
                      {/* contact-info end */}
                    </li>
                  </ul>
                </div>
                {/* widget-contact end */}
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="widget widget-links">
                  <h3 className="widget-title">Quick Links</h3>
                  <ul>
                    <li><Link href="/about" title="About Engineers & Doctors School">About Us</Link></li>
                    <li><Link href="/academics" title="Academic programs">Academics</Link></li>
                    <li><Link href="/admission" title="Facilities and student life">Admissions</Link></li>
                    <li><Link href="/gallery" title="Gallery">Gallery</Link></li>
                    <li><Link href="/contact" title="Contact">Contact</Link></li>
                    <li><Link href="/career" title="Career">Career</Link></li>
                  </ul>
                </div>
                {/* widget-links end */}
              </div>
            </div>
          </div>
          {/* top-footer end */}

          <div className="bottom-footer">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 ">
                <p>© Copyrights 2025 Engineers & Doctors School. All rights
                  reserved.</p>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="copy-itnovator">
                  <div>
                    <p>Design & Developed by :</p>
                  </div>
                  <a href="https://itnnovator.com/" target="_blank">
                    <img src="/webImages/footer-logo.png" alt="image" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* bottom-footer end */}
        </div>
      </footer>
      {/* footer end */}
    </>
  );
}
