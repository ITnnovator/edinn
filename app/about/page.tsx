import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Engineers & Doctors School | Vision, Mission & Values",
  description: "Discover Engineers & Doctors School in Karachi—our vision, mission, teaching approach, and commitment to academic excellence and student development.",
  alternates: {
      canonical: "https://edschool.pk/about"
  }
};

export default function About() {
  return (
    <>
      <section className="pager-section">
        <div className="container">
          <div className="pager-content text-center">
            <h2>About Us</h2>
            <ul>
              <li>
                <Link href="/" title="Home">
                  Home
                </Link>
              </li>
              <li>
                <span>About</span>
              </li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>
      {/* pager-section end */}

      <section className="about-page-content">
        <div className="container">
          <div className="abt-page-row">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="section-title">
                  <h2>
                    Welcome to<br />
                    <span>Engineers &amp; Doctors</span> School
                  </h2>
                  <p className="mw-100">
                    Engineers &amp; Doctors School is a future-focused learning environment where students grow through
                    STEM-based education, robotics and technology integration, strong language development, arts and
                    creativity, and digital literacy — all within a caring and supportive culture.
                  </p>
                  <Link href="/admission" title="Admissions" className="btn-default">
                    Admissions <i className="fa fa-long-arrow-alt-right"></i>
                  </Link>
                </div>
                {/* section-title end */}
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="avt-img">
                  <img src="/webImages/abt1.png" alt="About Image 1" />
                </div>
                {/* avt-img end */}
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="avt-img">
                  <img src="/webImages/abt2.png" alt="About Image 2" />
                </div>
                {/* avt-img end */}
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="act-inffo">
                  <span>ABOUT US</span>
                  <h2>Our Mission</h2>
                  <p>
                    Our mission is to provide quality education that develops confident learners, strong character,
                    and real-world skills through modern teaching methods and a nurturing environment.
                  </p>
                  <ul>
                    <li>Build critical thinking through STEM-based learning</li>
                    <li>Encourage creativity with arts, craft, and activities</li>
                    <li>Support every child with care, discipline, and guidance</li>
                  </ul>
                </div>
                {/* act-inffo end */}
              </div>
            </div>
          </div>
          {/* abt-page-row end */}
        </div>
      </section>
      {/* about-page-content end */}

      <section className="benifit-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title">
                <h2>Why Choose Us</h2>
                <p>
                  Engineers &amp; Doctors School provides a balanced, future-focused education where students learn
                  through modern teaching methods, strong academic foundations, and a caring environment that supports
                  every child’s growth in and beyond the classroom.
                </p>
                <Link href="/contact" title="Contact Engineers & Doctors School" className="btn-default">
                  Contact Us <i className="fa fa-long-arrow-alt-right"></i>
                </Link>
              </div>
              {/* section-title end */}
            </div>

            <div className="col-lg-6">
              <div className="about-us-section p-0">
                <div className="about-sec">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="abt-col">
                        <img src="/webImages/icon5.png" alt="Qualified Teachers" />
                        <h3>Qualified Teachers</h3>
                        <p>Experienced and caring teachers who guide every student.</p>
                      </div>
                      {/* abt-col end */}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="abt-col">
                        <img src="/webImages/icon7.png" alt="STEM-Based Learning" />
                        <h3>STEM-Based Learning</h3>
                        <p>Hands-on STEM activities that strengthen critical thinking skills.</p>
                      </div>
                      {/* abt-col end */}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="abt-col">
                        <img src="/webImages/icon9.png" alt="Student Support" />
                        <h3>Student Support</h3>
                        <p>A safe, supportive environment focused on every child.</p>
                      </div>
                      {/* abt-col end */}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="abt-col">
                        <img src="/webImages/icon8.png" alt="Robotics & Technology" />
                        <h3>Robotics &amp; Technology</h3>
                        <p>Technology integration that prepares students for the future.</p>
                      </div>
                      {/* abt-col end */}
                    </div>
                  </div>
                </div>
                {/* about-rw end */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* benifit-section end */}

      {/* classes-section start */}
      <section className="classes-section">
        <div className="container">
          <div className="sec-title">
            <h2>Events &amp; Student Activities</h2>
            <p>
              At Engineers &amp; Doctors School, students take part in engaging event projects, sports
              activities, art and cultural programs, and STEM-based competitions that build confidence,
              teamwork, and real-world skills beyond the classroom.
            </p>
          </div>
          {/* sec-title end */}

          <div className="classes-sec">
            <div className="row classes-carousel">
               {/* Card 1 */}
              <div className="col-lg-12">
                <div className="classes-col wow fadeInUp" data-wow-duration="1000ms">
                  <div className="class-thumb">
                    <img src="/webImages/img1.jpg" alt="Robotics Fair" className="w-100" />
                    <Link href="/academics" title="Robotics Fair & Science Projects" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Robotics Fair & Science Projects">
                        Robotics Fair &amp; Science Projects
                      </Link>
                    </h3>
                    <p>Robotics projects spark curiosity and love for science.</p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

               {/* Card 2 */}
              <div className="col-lg-12">
                <div className="classes-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="200ms">
                  <div className="class-thumb">
                    <img src="/webImages/img2.jpg" alt="Art Exhibitions" className="w-100" />
                    <Link href="/academics" title="Art Exhibitions & Cultural Festivals" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Art Exhibitions & Cultural Festivals">
                        Art Exhibitions &amp; Cultural Festivals
                      </Link>
                    </h3>
                    <p>Art events grow confidence, celebrate culture and creativity.</p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

               {/* Card 3 */}
               <div className="col-lg-12">
                <div className="classes-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">
                  <div className="class-thumb">
                    <img src="/webImages/img3.jpg" alt="Sports Day" className="w-100" />
                     <Link href="/academics" title="Sports Day & Outdoor Games" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Sports Day & Outdoor Games">
                       Sports Day &amp; Outdoor Games
                      </Link>
                    </h3>
                    <p>Sports activities build fitness, discipline, teamwork and resilience.</p>
                  </div>
                </div>
              </div>

               {/* Card 4 */}
               <div className="col-lg-12">
                <div className="classes-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="600ms">
                  <div className="class-thumb">
                    <img src="/webImages/img4.jpg" alt="Clubs & Trips" className="w-100" />
                     <Link href="/academics" title="Clubs, Trips & Co-Curriculars" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Clubs, Trips & Co-Curriculars">
                       Clubs, Trips &amp; Co-Curriculars
                      </Link>
                    </h3>
                    <p>Clubs and trips explore interests, friendships and experiences.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lnk-dv text-center">
              <Link href="/academics" title="View all events and activities" className="btn-default">
                View All Events &amp; Activities <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
            </div>
          </div>
          {/* classes-sec end */}
        </div>
      </section>
      {/* classes-section end */}

      {/* teachers-section start */}
      <section className="teachers-section">
        <div className="container">
          <div className="section-title text-center">
            <h2>
              Meet Our<br />
              Teachers
            </h2>
            <p>
              Our teaching team combines strong subject expertise with care and guidance,
              helping students learn confidently through modern, student-centered methods.
            </p>
          </div>
          {/* section-title end */}

          <div className="teachers">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-6 full-wdth">
                <div className="teacher">
                  <div className="teacher-img">
                    <img src="/webImages/img5.jpg" alt="Sir Gohar" className="w-100" />
                    <div className="sc-div">
                      <ul>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      </ul>
                      <span><img src="/webImages/plus.png" alt="plus" /></span>
                    </div>
                  </div>
                  <div className="teacher-info">
                    <h3><a href="#">Sir Gohar</a></h3>
                    <span>Math Teacher</span>
                  </div>
                </div>
                {/* teacher end */}
              </div>

               <div className="col-lg-3 col-md-3 col-sm-6 col-6 full-wdth">
                <div className="teacher">
                  <div className="teacher-img">
                    <img src="/webImages/img6.jpg" alt="Miss Ayesha" className="w-100" />
                    <div className="sc-div">
                      <ul>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      </ul>
                      <span><img src="/webImages/plus.png" alt="plus" /></span>
                    </div>
                  </div>
                  <div className="teacher-info">
                    <h3><a href="#">Miss Ayesha</a></h3>
                    <span>English Teacher</span>
                  </div>
                </div>
              </div>

               <div className="col-lg-3 col-md-3 col-sm-6 col-6 full-wdth">
                <div className="teacher">
                  <div className="teacher-img">
                     <img src="/webImages/img7.jpg" alt="Miss Sumaiqa" className="w-100" />
                    <div className="sc-div">
                      <ul>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      </ul>
                      <span><img src="/webImages/plus.png" alt="plus" /></span>
                    </div>
                  </div>
                  <div className="teacher-info">
                    <h3><a href="#">Miss Sumaiqa</a></h3>
                    <span>Biology Teacher</span>
                  </div>
                </div>
              </div>

               <div className="col-lg-3 col-md-3 col-sm-6 col-6 full-wdth">
                <div className="teacher">
                   <div className="teacher-img">
                    <img src="/webImages/img8.jpg" alt="Miss Afsha" className="w-100" />
                    <div className="sc-div">
                      <ul>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      </ul>
                       <span><img src="/webImages/plus.png" alt="plus" /></span>
                    </div>
                  </div>
                  <div className="teacher-info">
                    <h3><a href="#">Miss Afsha</a></h3>
                    <span>Islamiat Teacher</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* teachers end */}
        </div>
      </section>
      {/* teachers-section end */}

      {/* newsletter-sec starts here */}
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
