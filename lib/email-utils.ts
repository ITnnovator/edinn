import nodemailer from "nodemailer";

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
    fromName?: string;
}

export const isValidCnic = (cnic: string): boolean => {
    // Accept: 1234512345671 OR 12345-1234567-1
    return /^\d{5}-\d{7}-\d{1}$/.test(cnic) || /^\d{13}$/.test(cnic);
};

export const sendEmail = async ({
    to,
    subject,
    html,
    replyTo,
    fromName = "Engineers & Doctors School",
}: SendEmailOptions) => {
    // ✅ Hostinger SMTP defaults (from your screenshot):
    const host = process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = (process.env.SMTP_SECURE ?? "true") === "true"; // ✅ true for 465 SSL
    const user = process.env.SMTP_USER || "info@edschool.pk";
    const pass = process.env.SMTP_PASS || ""; // you MUST set this in .env
    const fromEmail = process.env.SMTP_FROM_EMAIL || "info@edschool.pk";

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
    });

    try {
        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to,
            subject,
            html,
            replyTo,
        });

        console.log("Message sent: %s", info.messageId);
        return { ok: true, message: "Message sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { ok: false, message: "Failed to send email: " + (error as Error).message };
    }
};
