<?php include_once 'header.php'; ?>

<section class="pager-section">
    <div class="container">
        <div class="pager-content text-center">
            <h2>Career Form</h2>
            <ul>
                <li><a href="index.php" title>Home</a></li>
                <li><span>Career Form</span></li>
            </ul>
        </div><!--pager-content end-->
        <h2 class="page-titlee">E&D</h2>
    </div>
</section>


<section class="admission-form-section">
    <div class="container">
        <div class="admission-form-wrap">
            <div class="section-title text-center">
                <h2> Career Form</h2>
                <p>Please fill in the details below to register your child.</p>
            </div>

            <form class="admission-form" action="#" method="post" autocomplete="on">
                <div class="row">
                    <!-- Class -->
                    <div class="col-lg-12">
                        <div class="fl-field">
                            <select name="class" id="class" required>
                                <option value selected disabled></option>
                                <option>Montessori (Pre-Primary)</option>
                                <option>Prep I (Pre-Primary)</option>
                                <option>Prep II (Pre-Primary)</option>
                                <option>Grade I (Primary)</option>
                                <option>Grade II (Primary)</option>
                                <option>Grade III (Primary)</option>
                                <option>Grade IV (Primary)</option>
                                <option>Grade V (Primary)</option>
                                <option>Grade VI (Secondary)</option>
                                <option>Grade VII (Secondary)</option>
                                <option>Grade VIII (Secondary)</option>
                                <option>Grade IX (Secondary)</option>
                                <option>Grade X (Secondary)</option>
                            </select>
                            <label for="class">Which class do you want to enroll your
                                child in?</label>
                        </div>
                    </div>

                    <!-- Student Name -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="student_name" id="student_name" placeholder=" " required />
                            <label for="student_name">Student’s Name</label>
                        </div>
                    </div>

                    <!-- Gender -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <select name="class" id="class" required>
                                <option value selected disabled></option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Custom</option>

                            </select>
                            <label for="class">Gender</label>
                        </div>
                    </div>

                    <!-- DOB -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="date" name="dob" id="dob" placeholder=" " required />
                            <label for="dob">Date of Birth</label>
                        </div>
                    </div>

                    <!-- Last school -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="last_school" id="last_school" placeholder=" " required />
                            <label for="last_school">Name of the last school
                                attended</label>
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="col-lg-12">
                        <div class="fl-field">
                            <textarea name="address" id="address" placeholder=" " rows="3" required></textarea>
                            <label for="address">Residential Address</label>
                        </div>
                    </div>


                    <!-- Submit -->
                    <div class="col-lg-12">
                        <button type="submit" class="btn-default fl-submit">
                            Submit Form <i class="fa fa-long-arrow-alt-right"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>


<!--newsletter-sec starts-->
<section class="newsletter-section">
    <div class="container">
        <div class="newsletter-sec">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="newsz-ltr-text">
                        <h2>Build Your Career<br />With Us</h2>
                    </div>
                    <!--newsz-ltr-text end-->
                </div>

                <div class="col-lg-6">
                    <a href="career.php" title="Career Opportunities" class="btn-default">
                        Career Opportunities <i class="fa fa-long-arrow-alt-right"></i>
                    </a>
                    <!--newsletter-form end-->
                </div>
            </div>
        </div>
        <!--newsletter-sec end-->
    </div>
</section>
<!--newsletter-sec end-->

<?php include_once 'footer.php'; ?>