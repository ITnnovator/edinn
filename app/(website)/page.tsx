import Link from 'next/link';
import Image from 'next/image';
import DynamicHomeGallery from '@/components/DynamicHomeGallery';

export default function Home() {
  return (
    <>
      <div className="main-section">
        {/* main-banner starts */}
        <section className="main-banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-7">
                <div className="banner-text wow fadeInLeft" data-wow-duration="1000ms">
                  <h2>
                    A School That Builds
                    <span>Future Innovators</span>
                  </h2>
                  <p>
                    At Engineers & Doctors School, we provide a
                    future-focused education that blends
                    STEM-based learning, multilingual education, robotics and
                    technology, art and craft,
                    and computer literacy helping every child think critically,
                    create boldly, and grow
                    in a nurturing environment.
                  </p>

                  <div className="lnk-dv">
                    <Link href="/admission" title="Apply for admission" className="btn-default">
                      Apply for Admission <i className="fa fa-long-arrow-alt-right"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-5">
                <div className="banner-img wow zoomIn" data-wow-duration="1000ms">
                  <Image 
                    src="/webImages/banner-img.png" 
                    alt="Students learning at Engineers & Doctors School"
                    width={500}
                    height={375} // Aspect ratio estimation
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </div>
                {/* banner-img end */}
                <div className="elements-bg wow zoomIn" data-wow-duration="1000ms"></div>
              </div>
            </div>
          </div>
        </section>
        {/* main-banner end */}
        <h2 className="main-title">E&D</h2>
      </div>
      {/* main-section end */}

      {/* About Section starts */}
      <section className="about-us-section">
        <div className="container">
          <div className="section-title text-center">
            <h2>Welcome to <span>Engineers & Doctors School</span></h2>
            <p>
              A future-focused school where STEM-based learning, robotics,
              languages, arts, and
              digital literacy come together to help every child discover their
              potential in a
              caring and nurturing environment.
            </p>
          </div>
          {/* section-title end */}

          <div className="about-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="abt-col wow fadeInUp" data-wow-duration="1000ms">
                    <Image src="/webImages/icon5.png" alt="" width={64} height={64} />
                    <h3>Qualified & Caring Teachers</h3>
                    <p>
                      Dedicated teachers who provide individual attention,
                      guidance, and support
                      to help every student grow with confidence.
                    </p>
                  </div>
                  {/* abt-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="abt-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="200ms">
                    <Image src="/webImages/icon7.png" alt="" width={64} height={64} />
                    <h3>STEM & Robotics Focus</h3>
                    <p>
                      Hands-on learning through STEM activities, robotics, and
                      technology
                      integration to prepare students for tomorrow world.
                    </p>
                  </div>
                  {/* abt-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="abt-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">
                    <Image src="/webImages/icon8.png" alt="" width={64} height={64} />
                    <h3>Languages & Communication</h3>
                    <p>
                      Strong focus on language skills and communication to help
                      students express
                      themselves confidently in and beyond the classroom.
                    </p>
                  </div>
                  {/* abt-col end */}
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="abt-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="600ms">
                    <Image src="/webImages/icon9.png" alt="" width={64} height={64} />
                    <h3>Holistic Student Support</h3>
                    <p>
                      A nurturing environment that balances academics, character
                      building,
                      co-curricular activities, and student well-being.
                    </p>
                  </div>
                  {/* abt-col end */}
                </div>
              </div>
            </div>
          </div>
          {/* about-rw end */}

          <div className="abt-img">
            {/* Dynamic Gallery: Home */}
            <DynamicHomeGallery />
          </div>
          {/* abt-img end */}
        </div>
      </section>
      {/* about-us-section end */}

      {/* classes-section start */}
      <section className="classes-section">
        <div className="container">
          <div className="sec-title">
            <h2>Events & Student Activities</h2>
            <p>
              At Engineers & Doctors School, students take part in engaging
              event projects, sports
              activities, art and cultural programs, and STEM-based competitions
              that build confidence,
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
                    <Image src="/webImages/img1.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Robotics Fair & Science Projects" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Robotics Fair & Science Projects">
                        Robotics Fair & Science Projects
                      </Link>
                    </h3>
                    <p>
                      Robotics projects spark curiosity and love for science.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

              {/* Card 2 */}
              <div className="col-lg-12">
                <div className="classes-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="200ms">
                  <div className="class-thumb">
                    <Image src="/webImages/img2.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Art Exhibitions & Cultural Festivals" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Art Exhibitions & Cultural Festivals">
                        Art Exhibitions & Cultural Festivals
                      </Link>
                    </h3>
                    <p>
                      Art events grow confidence, celebrate culture and
                      creativity.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

              {/* Card 3 */}
              <div className="col-lg-12">
                <div className="classes-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">
                  <div className="class-thumb">
                    <Image src="/webImages/img3.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Sports Day & Outdoor Games" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Sports Day & Outdoor Games">
                        Sports Day & Outdoor Games
                      </Link>
                    </h3>
                    <p>
                      Sports activities build fitness, discipline, teamwork and
                      resilience.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

              {/* Card 4 */}
              <div className="col-lg-12">
                <div className="classes-col wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="600ms">
                  <div className="class-thumb">
                    <Image src="/webImages/img4.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Clubs, Trips & Co-Curriculars" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Clubs, Trips & Co-Curriculars">
                        Clubs, Trips & Co-Curriculars
                      </Link>
                    </h3>
                    <p>
                      Clubs and trips explore interests, friendships and
                      experiences.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

              {/* Card 5 */}
              <div className="col-lg-12">
                <div className="classes-col">
                  <div className="class-thumb">
                    <Image src="/webImages/img1.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Science & Robotics Exhibitions" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Science & Robotics Exhibitions">
                        Science & Robotics Exhibitions
                      </Link>
                    </h3>
                    <p>
                      Science exhibitions showcase experiments, ideas and
                      student innovation.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

              {/* Card 6 */}
              <div className="col-lg-12">
                <div className="classes-col">
                  <div className="class-thumb">
                    <Image src="/webImages/img2.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Stage Shows & Cultural Nights" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Stage Shows & Cultural Nights">
                        Stage Shows & Cultural Nights
                      </Link>
                    </h3>
                    <p>
                      Stage shows develop expression, confidence and
                      communication skills.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

              {/* Card 7 */}
              <div className="col-lg-12">
                <div className="classes-col">
                  <div className="class-thumb">
                    <Image src="/webImages/img3.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Inter-School Sports & Games" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Inter-School Sports & Games">
                        Inter-School Sports & Games
                      </Link>
                    </h3>
                    <p>
                      Inter-school games teach teamwork, discipline, respect and
                      sportsmanship.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>

              {/* Card 8 */}
              <div className="col-lg-12">
                <div className="classes-col">
                  <div className="class-thumb">
                    <Image src="/webImages/img4.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <Link href="/academics" title="Club Activities & Educational Tours" className="crt-btn">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="class-info">
                    <h3>
                      <Link href="/academics" title="Club Activities & Educational Tours">
                        Club Activities & Educational Tours
                      </Link>
                    </h3>
                    <p>
                      Educational tours connect classroom learning with
                      real-world understanding.
                    </p>
                  </div>
                </div>
                {/* classes-col end */}
              </div>
            </div>

            <div className="lnk-dv text-center">
              <Link href="/academics" title="View all events and activities" className="btn-default">
                View All Events & Activities <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
            </div>
          </div>
          {/* classes-sec end */}
        </div>
      </section>
      {/* classes-section end */}

      {/* course-section start */}
      <section className="course-section">
        <div className="container">
          <div className="row">
            {/* Left column: Admissions & Contact */}
            <div className="col-lg-6">
              <div className="find-course">
                <div className="sec-title">
                  <h2>Admissions & Information</h2>
                  <p>
                    A future-focused school offering STEM-based learning,
                    multilingual education,
                    robotics, arts, and digital literacy in a nurturing
                    environment for students
                    from Montessori to Grade X.
                  </p>
                  <h3>
                    <i className="fa-solid fa-phone"></i>Call / WhatsApp:
                    <strong><a href="tel:+923032660229">+92 303 2660229</a></strong>
                  </h3>
                </div>
                {/* sec-title end */}
                <div className="course-img">
                  <Image src="/webImages/course-img.png" alt="Students at Engineers & Doctors School" width={500} height={300} style={{ width: '100%'}} />
                </div>
                {/* course-img end */}
              </div>
              {/* find-course end */}
            </div>

            {/* Right column: Quick Highlights / Info Cards */}
            <div className="col-lg-6">
              <div className="courses-list">
                {/* Card 1 */}
                <div className="course-card wow fadeInLeft" data-wow-duration="1000ms">
                  <div className="d-flex flex-wrap align-items-center">
                    <ul className="course-meta">
                      <li>
                        <i className="fa-solid fa-calendar"></i> Montessori –
                        Primary
                      </li>
                      <li>Early Years & Foundation</li>
                    </ul>
                    <span>Age 3–10</span>
                  </div>
                  <h3>
                    <Link href="/academics" title="Montessori & Primary Section">
                      Montessori & Primary Section
                    </Link>
                  </h3>
                  <div className="d-flex flex-wrap">
                    <div className="posted-by">
                      <Image src="/webImages/ico2.png" alt="" width={24} height={24} />
                      <Link href="/about" title="Caring & Qualified Teachers">
                        Caring & Qualified Teachers
                      </Link>
                    </div>
                    <span className="locat">
                      <i className="fa-solid fa-location-dot"></i>Islam Nagar Campus,
                      Karachi
                    </span>
                  </div>
                </div>
                {/* course-card end */}

                {/* Card 2 */}
                <div className="course-card wow fadeInLeft" data-wow-duration="1000ms" data-wow-delay="400ms">
                  <div className="d-flex flex-wrap align-items-center">
                    <ul className="course-meta">
                      <li>
                        <i className="fa-solid fa-calendar"></i> Grade VI – X
                      </li>
                      <li>Secondary Section</li>
                    </ul>
                    <span>Age 11–16</span>
                  </div>
                  <h3>
                    <Link href="/academics" title="Secondary School Program">
                      Secondary School Program
                    </Link>
                  </h3>
                  <div className="d-flex flex-wrap">
                    <div className="posted-by">
                      <Image src="/webImages/ico2.png" alt="" width={24} height={24} />
                      <Link href="/location" title="STEM, Labs & Facilities">
                        STEM, Labs & Facilities
                      </Link>
                    </div>
                    <span className="locat">
                      <i className="fa-solid fa-location-dot"></i>Digital, STEM &
                      Language Labs
                    </span>
                  </div>
                </div>
                {/* course-card end */}

                {/* Card 3 */}
                <div className="course-card wow fadeInLeft" data-wow-duration="1000ms" data-wow-delay="600ms">
                  <div className="d-flex flex-wrap align-items-center">
                    <ul className="course-meta">
                      <li>
                        <i className="fa-solid fa-calendar"></i> Mon–Fri
                      </li>
                      <li>8:00 AM – 2:00 PM</li>
                    </ul>
                    <span>On-Campus</span>
                  </div>
                  <h3>
                    <Link href="/admission" title="Admission Process & Requirements">
                      Admission Process & Requirements
                    </Link>
                  </h3>
                  <div className="d-flex flex-wrap">
                    <div className="posted-by">
                      <Image src="/webImages/ico2.png" alt="" width={24} height={24} />
                      <Link href="/faqs" title="Admission FAQs">
                        View Admission FAQs
                      </Link>
                    </div>
                    <span className="locat">
                      <i className="fa-solid fa-location-dot"></i>Visit Campus for Test
                      & Registration
                    </span>
                  </div>
                </div>
                {/* course-card end */}
              </div>
              {/* courses-list end */}

              <Link href="/admission" title="View full admission details" className="all-btn">
                View Admission Details <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
      {/* course-section end */}

      {/* blog-section start */}
      <section className="blog-section">
        <div className="container">
          <div className="section-title text-center">
            <h2>News & Updates</h2>
            <p>
              Stay informed about the latest events, achievements, announcements
              and
              activities happening at Engineers & Doctors School throughout
              the year.
            </p>
          </div>
          {/* section-title end */}

          <div className="blog-posts">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog-post">
                  <div className="blog-thumbnail">
                    <Image src="/webImages/blog1.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <span className="category">Admissions</span>
                  </div>
                  <div className="blog-info">
                    <ul className="meta">
                      <li><a href="#" title="">15/01/2025</a></li>
                      <li>
                        <i className="fa-solid fa-tags"></i>
                        <a href="#" title="">Announcements</a>
                        <a href="#" title="">Admissions</a>
                      </li>
                    </ul>
                    <h3>
                      <a href="#" title="">Admissions Open for Montessori to Grade
                        X</a>
                    </h3>
                    <p>
                      Registrations are now open for the new academic session.
                      Parents are invited
                      to visit the campus for details and admission guidance.
                    </p>
                  </div>
                </div>
                {/* blog-post end */}
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog-post">
                  <div className="blog-thumbnail">
                    <Image src="/webImages/blog2.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <span className="category">STEM</span>
                  </div>
                  <div className="blog-info">
                    <ul className="meta">
                      <li><a href="#" title="">10/12/2024</a></li>
                      <li>
                        <i className="fa-solid fa-tags"></i>
                        <a href="#" title="">Robotics</a>
                        <a href="#" title="">Science Fair</a>
                      </li>
                    </ul>
                    <h3>
                      <a href="#" title="">STEM & Robotics Exhibition
                        Highlights</a>
                    </h3>
                    <p>
                      Students presented creative projects in robotics, coding
                      and science, showcasing
                      their problem-solving skills and innovative thinking in
                      front of parents and guests.
                    </p>
                  </div>
                </div>
                {/* blog-post end */}
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog-post">
                  <div className="blog-thumbnail">
                    <Image src="/webImages/blog3.jpg" alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" className="w-100 h-auto" />
                    <span className="category">Student Life</span>
                  </div>
                  <div className="blog-info">
                    <ul className="meta">
                      <li><a href="#" title="">25/11/2024</a></li>
                      <li>
                        <i className="fa-solid fa-tags"></i>
                        <a href="#" title="">Sports Day</a>
                        <a href="#" title="">Activities</a>
                      </li>
                    </ul>
                    <h3>
                      <a href="#" title="">Annual Sports Day & Games
                        Festival</a>
                    </h3>
                    <p>
                      A full day of races, games and team events helped students
                      build confidence,
                      sportsmanship and a healthy competitive spirit on the
                      field.
                    </p>
                  </div>
                </div>
                {/* blog-post end */}
              </div>
            </div>
          </div>
          {/* blog-posts end */}
        </div>
      </section>
      {/* blog-section end */}

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
