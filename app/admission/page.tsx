"use client";

import Link from "next/link";
import { useState } from "react";

export default function Admission() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simplified handler since there are many fields; using native FormData for extraction
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await res.json();
        setStatus({ ok: result.ok, msg: result.message });
        if (result.ok) {
          e.currentTarget.reset();
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
            <h2>Admission</h2>
            <ul>
              <li><Link href="/" title="Home">Home</Link></li>
              <li><span>Admission</span></li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>
      {/* pager-section end */}

      {/* Admission Form Section */}
      <section className="admission-form-section">
        <div className="container">
          <div className="admission-form-wrap">
            <div className="section-title text-center">
              <h2> Admission Form</h2>
              <p>Please fill in the details below to register your child.</p>
            </div>

            <form className="admission-form" id="enrollment-form" onSubmit={handleSubmit} autoComplete="on">
              <div className="row">
                {/* Admission Info */}
                <div className="col-lg-12">
                  <div className="fl-divider">
                    <span>Admission Details</span>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <select name="admission_class" id="admission_class" required defaultValue="">
                      <option value="" disabled></option>
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
                    <label htmlFor="admission_class">Class to Enroll In</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <select name="session" id="session" required defaultValue="">
                      <option value="" disabled></option>
                      <option>2025-26</option>
                      <option>2026-27</option>
                    </select>
                    <label htmlFor="session">Admission Session</label>
                  </div>
                </div>

                {/* Student Details */}
                <div className="col-lg-12">
                  <div className="fl-divider">
                    <span>Student’s Details</span>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="student_name" id="student_name" placeholder=" " required />
                    <label htmlFor="student_name">Student’s Full Name</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <select name="gender" id="gender" required defaultValue="">
                      <option value="" disabled></option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <label htmlFor="gender">Gender</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="date" name="dob" id="dob" placeholder=" " required />
                    <label htmlFor="dob">Date of Birth</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="bform" id="bform" placeholder=" " />
                    <label htmlFor="bform">B-Form / CRC No. (Optional)</label>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="fl-field">
                    <input type="text" name="last_school" id="last_school" placeholder=" " />
                    <label htmlFor="last_school">Last School Attended (If Any)</label>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="fl-field">
                    <textarea name="address" id="address" placeholder=" " rows={3} required></textarea>
                    <label htmlFor="address">Residential Address</label>
                  </div>
                </div>

                {/* Father Details */}
                <div className="col-lg-12">
                  <div className="fl-divider">
                    <span>Father’s Details</span>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="father_name" id="father_name" placeholder=" " required />
                    <label htmlFor="father_name">Father’s Full Name</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="father_cnic" id="father_cnic" placeholder=" " required />
                    <label htmlFor="father_cnic">Father’s CNIC (12345-1234567-1)</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <select name="father_occupation" id="father_occupation" required defaultValue="">
                      <option value="" disabled></option>
                      <option>Business</option>
                      <option>Private Job</option>
                      <option>Government Job</option>
                      <option>Self-Employed</option>
                      <option>Unemployed</option>
                      <option>Other</option>
                    </select>
                    <label htmlFor="father_occupation">Father’s Occupation</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="tel" name="father_cell" id="father_cell" placeholder=" " maxLength={11} required />
                    <label htmlFor="father_cell">Father’s Mobile (11 digits)</label>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="fl-field">
                    <input type="email" name="email" id="email" placeholder=" " required />
                    <label htmlFor="email">Parent Email Address</label>
                  </div>
                </div>

                {/* Mother Details */}
                <div className="col-lg-12">
                  <div className="fl-divider">
                    <span>Mother’s Details</span>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="mother_name" id="mother_name" placeholder=" " />
                    <label htmlFor="mother_name">Mother’s Full Name (Optional)</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <select name="mother_occupation" id="mother_occupation" defaultValue="">
                      <option value="" disabled></option>
                      <option>Housewife</option>
                      <option>Private Job</option>
                      <option>Government Job</option>
                      <option>Self-Employed</option>
                      <option>Unemployed</option>
                      <option>Other</option>
                    </select>
                    <label htmlFor="mother_occupation">Mother’s Occupation (Optional)</label>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="fl-field">
                    <input type="tel" name="mother_cell" id="mother_cell" placeholder=" " maxLength={11} />
                    <label htmlFor="mother_cell">Mother’s Mobile (Optional)</label>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="col-lg-12">
                  <div className="fl-divider">
                    <span>Emergency Contact</span>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="emergency_name" id="emergency_name" placeholder=" " required />
                    <label htmlFor="emergency_name">Emergency Contact Name</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="tel" name="emergency_phone" id="emergency_phone" placeholder=" " maxLength={11} required />
                    <label htmlFor="emergency_phone">Emergency Contact Mobile (11 digits)</label>
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

                {/* Submit */}
                <div className="col-lg-12">
                  <button type="submit" className="btn-default fl-submit" id="enrollment-submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Enrollment"} <i className="fa fa-long-arrow-alt-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Admission Form Section End */}

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
