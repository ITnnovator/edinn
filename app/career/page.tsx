"use client";

import Link from "next/link";
import { useState } from "react";

export default function Career() {
  const [formData, setFormData] = useState({
    post: "",
    full_name: "",
    guardian_name: "",
    cnic: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    marital_status: "",
    qualification: "",
    experience_years: "",
    subject_area: "",
    last_institute: "",
    city: "",
    expected_salary: "",
    address: "",
    message: ""
  });

  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await res.json();
        setStatus({ ok: result.ok, msg: result.message });
        if (result.ok) {
          setFormData({
            post: "",
            full_name: "",
            guardian_name: "",
            cnic: "",
            phone: "",
            email: "",
            gender: "",
            dob: "",
            marital_status: "",
            qualification: "",
            experience_years: "",
            subject_area: "",
            last_institute: "",
            city: "",
            expected_salary: "",
            address: "",
            message: ""
          });
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
            <h2>Career Form</h2>
            <ul>
              <li><Link href="/" title="Home">Home</Link></li>
              <li><span>Career Form</span></li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>

      <section className="admission-form-section">
        <div className="container">
          <div className="admission-form-wrap">
            <div className="section-title text-center">
              <h2>Career Form</h2>
              <p>Please fill in the details below to apply for a teaching position.</p>
            </div>

            <form className="admission-form" onSubmit={handleSubmit}>
              <div className="row">

                {/* Post Applying For */}
                <div className="col-lg-12">
                  <div className="fl-field">
                    <select name="post" id="post" required value={formData.post} onChange={handleChange}>
                      <option value="" disabled>Select Post</option>
                      <option>Montessori / ECE Teacher</option>
                      <option>Primary Teacher</option>
                      <option>Secondary Teacher</option>
                      <option>Subject Specialist</option>
                      <option>Coordinator</option>
                      <option>Admin Staff</option>
                      <option>Other</option>
                    </select>
                    <label htmlFor="post">Post Applying For</label>
                  </div>
                </div>

                {/* Full Name */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="full_name" id="full_name" placeholder=" " required value={formData.full_name} onChange={handleChange} />
                    <label htmlFor="full_name">Full Name</label>
                  </div>
                </div>

                {/* Father/Husband Name */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="guardian_name" id="guardian_name" placeholder=" " required value={formData.guardian_name} onChange={handleChange} />
                    <label htmlFor="guardian_name">Father / Husband Name</label>
                  </div>
                </div>

                {/* CNIC */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="cnic" id="cnic" placeholder=" " required maxLength={15} value={formData.cnic} onChange={handleChange} />
                    <label htmlFor="cnic">CNIC (e.g., 12345-1234567-1)</label>
                  </div>
                </div>

                {/* Mobile */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="tel" name="phone" id="phone" placeholder=" " required value={formData.phone} onChange={handleChange} />
                    <label htmlFor="phone">Mobile Number (e.g., 03xx-xxxxxxx)</label>
                  </div>
                </div>

                {/* Email */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="email" name="email" id="email" placeholder=" " value={formData.email} onChange={handleChange} />
                    <label htmlFor="email">Email (Optional)</label>
                  </div>
                </div>

                {/* Gender */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <select name="gender" id="gender" required value={formData.gender} onChange={handleChange}>
                      <option value="" disabled>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <label htmlFor="gender">Gender</label>
                  </div>
                </div>

                {/* DOB */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="date" name="dob" id="dob" required value={formData.dob} onChange={handleChange} />
                    <label htmlFor="dob">Date of Birth</label>
                  </div>
                </div>

                {/* Marital Status */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <select name="marital_status" id="marital_status" required value={formData.marital_status} onChange={handleChange}>
                      <option value="" disabled>Select Status</option>
                      <option>Single</option>
                      <option>Married</option>
                    </select>
                    <label htmlFor="marital_status">Marital Status</label>
                  </div>
                </div>

                {/* Qualification */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="qualification" id="qualification" placeholder=" " required value={formData.qualification} onChange={handleChange} />
                    <label htmlFor="qualification">Highest Qualification</label>
                  </div>
                </div>

                {/* Experience */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="number" name="experience_years" id="experience_years" placeholder=" " min="0" required value={formData.experience_years} onChange={handleChange} />
                    <label htmlFor="experience_years">Total Experience (Years)</label>
                  </div>
                </div>

                {/* Subject / Area */}
                <div className="col-lg-12">
                  <div className="fl-field">
                    <input type="text" name="subject_area" id="subject_area" placeholder=" " required value={formData.subject_area} onChange={handleChange} />
                    <label htmlFor="subject_area">Subjects / Area (e.g., English, Math)</label>
                  </div>
                </div>

                {/* Last Institute */}
                <div className="col-lg-12">
                  <div className="fl-field">
                    <input type="text" name="last_institute" id="last_institute" placeholder=" " required value={formData.last_institute} onChange={handleChange} />
                    <label htmlFor="last_institute">Last School / Institute</label>
                  </div>
                </div>

                {/* Current City */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="city" id="city" placeholder=" " required value={formData.city} onChange={handleChange} />
                    <label htmlFor="city">City</label>
                  </div>
                </div>

                {/* Expected Salary */}
                <div className="col-lg-6 col-md-6">
                  <div className="fl-field">
                    <input type="text" name="expected_salary" id="expected_salary" placeholder=" " value={formData.expected_salary} onChange={handleChange} />
                    <label htmlFor="expected_salary">Expected Salary (Optional)</label>
                  </div>
                </div>

                {/* Address */}
                <div className="col-lg-12">
                  <div className="fl-field">
                    <textarea name="address" id="address" placeholder=" " rows={3} required value={formData.address} onChange={handleChange}></textarea>
                    <label htmlFor="address">Residential Address</label>
                  </div>
                </div>

                {/* Message */}
                <div className="col-lg-12">
                  <div className="fl-field">
                    <textarea name="message" id="message" placeholder=" " rows={4} value={formData.message} onChange={handleChange}></textarea>
                    <label htmlFor="message">Message / Note (Optional)</label>
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
                  <button type="submit" className="btn-default fl-submit" id="career-submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"} <i className="fa fa-long-arrow-alt-right"></i>
                  </button>
                </div>

              </div>
            </form>
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
