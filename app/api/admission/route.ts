import { NextResponse } from "next/server";
import { sendEmail, isValidCnic } from "@/lib/email-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      admission_class,
      session,
      student_name,
      gender,
      dob,
      bform,
      last_school,
      address,
      father_name,
      father_cnic,
      father_occupation,
      father_cell,
      email,
      mother_name,
      mother_occupation,
      mother_cell,
      emergency_name,
      emergency_phone,
    } = body;

    // Required checks
    const required = [
      admission_class,
      session,
      student_name,
      gender,
      dob,
      address,
      father_name,
      father_cnic,
      father_occupation,
      father_cell,
      // Parent Email is required in PHP but let's check exactness
      // PHP: 'Parent Email' => clean($_POST['email'] ?? ''), -> required list includes 'Parent Email'
      email,
      emergency_name,
      emergency_phone,
    ];

    if (required.some((field) => !field || field.toString().trim() === "")) {
      return NextResponse.json(
        { ok: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    if (!isValidCnic(father_cnic)) {
      return NextResponse.json(
        { ok: false, message: "Invalid Father CNIC format." },
        { status: 400 }
      );
    }

    const siteName = "Engineers & Doctors School";
    const date = new Date().toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const dataMap: Record<string, string> = {
      Class: admission_class,
      Session: session,
      "Student Name": student_name,
      Gender: gender,
      "Date of Birth": dob,
      "B-Form": bform || "",
      "Last School": last_school || "",
      Address: address,
      "Father Name": father_name,
      "Father CNIC": father_cnic,
      "Father Occupation": father_occupation || "",
      "Father Mobile": father_cell,
      "Parent Email": email,
      "Mother Name": mother_name || "",
      "Mother Occupation": mother_occupation || "",
      "Mother Mobile": mother_cell || "",
      "Emergency Name": emergency_name,
      "Emergency Mobile": emergency_phone,
    };

    let rows = "";
    for (const [label, value] of Object.entries(dataMap)) {
      rows += `
      <tr>
        <td style='padding:10px;border:1px solid #e5e7eb;background:#f8fafc;width:35%'><strong>${label}</strong></td>
        <td style='padding:10px;border:1px solid #e5e7eb'>${value}</td>
      </tr>`;
    }

    const html = `
    <!doctype html>
    <html>
    <body style='margin:0;background:#f4f6f8;font-family:Arial'>
      <table width='100%' cellpadding='0' cellspacing='0'>
        <tr><td align='center'>
          <table width='650' style='background:#fff;border-radius:12px;overflow:hidden'>
            <tr>
              <td style='background:#0f172a;color:#fff;padding:18px'>
                <strong>${siteName} – Student Enrollment</strong><br>
                <small>Submitted: ${date}</small>
              </td>
            </tr>
            <tr>
              <td style='padding:20px'>
                <table width='100%' cellpadding='0' cellspacing='0'>
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style='background:#f8fafc;padding:12px;font-size:12px;color:#64748b'>
                © ${new Date().getFullYear()} ${siteName}
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
    `;

    const result = await sendEmail({
      to: process.env.SMTP_FROM_EMAIL || "info@edschool.pk",
      subject: `${siteName} – New Student Enrollment`,
      html,
      // No replyTo set in PHP for admission, so omitting
    });

    if (result.ok) {
      return NextResponse.json({
        ok: true,
        message: "Enrollment submitted successfully!",
      });
    } else {
      return NextResponse.json(
        { ok: false, message: "Mail server error. Please try again later." },
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
