import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Name, email, phone, Message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: false, message: "Spam detected." }, { status: 400 });
    }

    if (!Name || !email || !phone || !Message) {
      return NextResponse.json(
        { ok: false, message: "Please fill all required fields." },
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
      <title>Contact Form</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 0;">
        <tr>
          <td align="center">
            <table width="650" cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9eef3;">
              <tr>
                <td style="padding:18px 22px;background:#0f172a;color:#fff;">
                  <div style="font-size:18px;font-weight:700;">${siteName} - Contact Message</div>
                  <div style="opacity:.85;font-size:12px;margin-top:4px;">Submitted: ${submittedAt}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 22px;">
                  <div style="font-size:14px;color:#334155;line-height:1.6;">
                    You have received a new message from the website contact form.
                  </div>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-collapse:collapse;">
                    <tr>
                      <td style="padding:10px 12px;width:170px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Name</strong></td>
                      <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${Name}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Email</strong></td>
                      <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Phone</strong></td>
                      <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${phone}</td>
                    </tr>
                  </table>
                  <div style="margin-top:18px;padding:14px 14px;border:1px solid #e9eef3;background:#f8fafc;border-radius:10px;">
                    <div style="font-size:13px;color:#475569;font-weight:700;margin-bottom:6px;">Message</div>
                    <div style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${Message}</div>
                  </div>
                  <div style="margin-top:18px;font-size:12px;color:#64748b;">
                    Note: Reply directly to this email to respond to the user (Reply-To is set).
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #e9eef3;color:#64748b;font-size:12px;">
                  © ${new Date().getFullYear()} ${siteName} — Website Contact Form
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
      to: process.env.SMTP_FROM_EMAIL || "info@edschool.pk", // Default to self if not set, but usually from env
      subject: `${siteName} Contact Form - ${Name}`,
      html,
      replyTo: `${Name} <${email}>`,
    });

    if (result.ok) {
      return NextResponse.json({ ok: true, message: "Thanks! Your message has been sent successfully." });
    } else {
      return NextResponse.json(
        { ok: false, message: result.message },
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
