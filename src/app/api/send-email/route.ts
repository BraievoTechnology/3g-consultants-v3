import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, phone, subject, message } = data;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can also use SMTP
      auth: {
        user: "3gconsultants.mail@gmail.com", // Your email
        pass: "ymhy ugog tuim edny", // App password or real password (not recommended)
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO || "info@3gconsultants.lk",
      subject: `New Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
