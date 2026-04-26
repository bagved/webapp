import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { name, email, phone, message, subject, company } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Manglende felter" }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: "info@bagved.com",
      replyTo: email,
      subject: subject ? `[${subject}] Henvendelse fra ${name}` : `Ny henvendelse fra ${name}`,
      text: [
        `Navn: ${name}`,
        company  ? `Virksomhed: ${company}` : "",
        `Email: ${email}`,
        phone    ? `Telefon: ${phone}` : "",
        subject  ? `Emne: ${subject}` : "",
        ``,
        `Besked:`,
        message,
      ].filter(Boolean).join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Mail fejl:", err);
    return NextResponse.json({ error: "Kunne ikke sende", detail: err?.message ?? String(err) }, { status: 500 });
  }
}
