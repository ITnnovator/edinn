import { NextResponse } from "next/server";
import { sendEmail, isValidCnic } from "@/lib/email-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      post,
      full_name,
      guardian_name,
      cnic,
      phone,
      email,
      gender,
      dob,
      marital_status,
      qualification,
      experience_years,
      subject_area,
      last_institute,
      city,
      expected_salary,
      address,
      message,
    } = body;

    // Required checks
    if (
      !post ||
      !full_name ||
      !guardian_name ||
      !cnic ||
      !phone ||
      !gender ||
      !dob ||
      !marital_status ||
      !qualification ||
      !experience_years ||
      !subject_area ||
      !last_institute ||
      !city ||
      !address
    ) {
      return NextResponse.json(
        { ok: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // CNIC validation
    if (!isValidCnic(cnic)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid CNIC (12345-1234567-1)." },
        { status: 400 }
      );
    }

    const siteName = "Engineers & Doctors School";
    const submittedAt = new Date().toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const html = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Teacher Career Form</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 0;">
        <tr>
          <td align="center">
            <table width="650" cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9eef3;">
              <tr>
                <td style="padding:18px 22px;background:#0f172a;color:#fff;">
                  <div style="font-size:18px;font-weight:700;">${siteName} - Teacher Career Application</div>
                  <div style="opacity:.85;font-size:12px;margin-top:4px;">Submitted: ${submittedAt}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 22px;">
                  <div style="font-size:14px;color:#334155;line-height:1.6;">
                    New teacher application received from the website.
                  </div>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-collapse:collapse;">
                    <tr><td style="padding:10px 12px;width:220px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Post</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${post}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Full Name</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${full_name}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Father/Husband Name</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${guardian_name}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>CNIC</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${cnic}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Mobile</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${phone}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Email</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${email || "N/A"}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Gender</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${gender}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>DOB</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${dob}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Marital Status</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${marital_status}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Qualification</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${qualification}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Experience (Years)</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${experience_years}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Subject / Area</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${subject_area}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Last Institute</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${last_institute}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>City</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${city}</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Expected Salary</strong></td>
                        <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${expected_salary || "N/A"}</td></tr>
                  </table>
                  <div style="margin-top:18px;padding:14px;border:1px solid #e9eef3;background:#f8fafc;border-radius:10px;">
                    <div style="font-size:13px;color:#475569;font-weight:700;margin-bottom:6px;">Address</div>
                    <div style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${address}</div>
                  </div>
                  <div style="margin-top:14px;padding:14px;border:1px solid #e9eef3;background:#ffffff;border-radius:10px;">
                    <div style="font-size:13px;color:#475569;font-weight:700;margin-bottom:6px;">Message / Note</div>
                    <div style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${message || "N/A"}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #e9eef3;color:#64748b;font-size:12px;">
                  © ${new Date().getFullYear()} ${siteName} — Teacher Career Form
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    const result = await sendEmail({
      to: process.env.SMTP_FROM_EMAIL || "info@edschool.pk",
      subject: `${siteName} Teacher Career Form - ${full_name}`,
      html,
      replyTo: email ? `${full_name} <${email}>` : undefined,
    });

    if (result.ok) {
      return NextResponse.json({
        ok: true,
        message: "Thanks! Your application has been submitted successfully.",
      });
    } else {
      return NextResponse.json(
        { ok: false, message: "Sorry, mail server error. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
