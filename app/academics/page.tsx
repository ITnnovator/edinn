import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics at Engineers & Doctors School | Curriculum & Learning",
  description: "Explore academics at Engineers & Doctors School in Karachi, offering a well-structured curriculum, qualified faculty, and a student-focused learning approach.",
  alternates: {
      canonical: "https://edschool.pk/academics"
  }
};

export default function Academics() {
  return (
    <>
      <section className="pager-section">
        <div className="container">
          <div className="pager-content text-center">
            <h2>Academics</h2>
            <ul>
              <li>
                <Link href="/" title="Home">
                  Home
                </Link>
              </li>
              <li><span>Academics</span></li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>
      {/* pager-section end */}

      <section className="classes-page">
        <div className="container">
          <div className="classes-banner">
            <span>Academics</span>
            <h2>Explore Our Academic Programs</h2>
            <Link href="/admission" className="btn-default">
              I want Admission <i className="fa fa-long-arrow-alt-right"></i>
            </Link>
          </div>
          {/* classes-banner end */}

          <div className="classes-section">
            <div className="classes-sec">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="classes-col">
                    <div className="class-thumb">
                      <img src="/webImages/class1.jpg" alt="Montessori" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">Montessori / Early Years</a></h3>
                      <p>Play-based learning to build strong foundations.</p>
                      <span>Montessori</span> <span>Foundation</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                          <i className="fas fa-chalkboard-teacher"></i>
                          <a href="#">Early Years Team</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="classes-col">
                    <div className="class-thumb">
                      <img src="/webImages/class2.jpg" alt="Primary" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">Primary Section (Grade I–V)</a></h3>
                      <p>Core academics with confidence-building activities.</p>
                      <span>Grades</span> <span>I – V</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                          <i className="fas fa-book-open"></i>
                          <a href="#">Primary Faculty</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="classes-col">
                    <div className="class-thumb">
                       <img src="/webImages/class3.jpg" alt="Secondary" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">Secondary Section (VI–X)</a></h3>
                      <p>Structured learning with strong exam preparation.</p>
                      <span>Grades</span> <span>VI – X</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                          <i className="fas fa-graduation-cap"></i>
                          <a href="#">Secondary Faculty</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="classes-col">
                    <div className="class-thumb">
                      <img src="/webImages/class4.jpg" alt="STEM" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">STEM &amp; Robotics</a></h3>
                      <p>Hands-on STEM projects for future innovators.</p>
                      <span>STEM</span> <span>Robotics</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                          <i className="fas fa-robot"></i>
                          <a href="#">STEM Lab</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="classes-col">
                    <div className="class-thumb">
                      <img src="/webImages/class5.jpg" alt="Language" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">Language Development</a></h3>
                      <p>Speaking, grammar and confident communication skills.</p>
                      <span>English</span> <span>Urdu</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                          <i className="fas fa-comments"></i>
                          <a href="#">Language Faculty</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="classes-col">
                    <div className="class-thumb">
                      <img src="/webImages/class6.jpg" alt="Computer" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">Computer &amp; Digital Literacy</a></h3>
                      <p>Modern computer skills for smarter learning.</p>
                      <span>Computers</span> <span>Digital</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                           <i className="fas fa-laptop-code"></i>
                          <a href="#">Computer Lab</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="classes-col">
                    <div className="class-thumb">
                      <img src="/webImages/class7.jpg" alt="Art" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">Art &amp; Craft</a></h3>
                      <p>Creativity through art, craft and activities.</p>
                      <span>Art</span> <span>Craft</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                          <i className="fas fa-palette"></i>
                          <a href="#">Creative Studio</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                   <div className="classes-col">
                    <div className="class-thumb">
                      <img src="/webImages/class8.jpg" alt="Co-Curricular" className="w-100" />
                      <a href="#" className="crt-btn"><i className="fas fa-arrow-right"></i></a>
                    </div>
                    <div className="class-info">
                      <h3><a href="#">Co-Curricular Activities</a></h3>
                      <p>Sports, events and clubs for leadership.</p>
                      <span>Sports</span> <span>Clubs</span>
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="posted-by">
                          <i className="fas fa-futbol"></i>
                          <a href="#">Student Life</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* classes-col end */}
                </div>
              </div>
            </div>
            {/* classes-sec end */}
          </div>
        </div>
      </section>
      {/* classes-page end */}

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
