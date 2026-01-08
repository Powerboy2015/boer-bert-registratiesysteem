import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  if (!user || !pass) {
    throw new Error("Missing GMAIL_USER or GMAIL_PASS environment variables");
  }
  const dryRun = String(process.env.DRY_RUN || '').toLowerCase() === 'true';
  return dryRun
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user, pass },
      });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      to,
      name,
      spot,
      peopleCount,
      arrivalDate,
      departureDate,
      reservationNumber,
    } = body || {};

    if (!to) {
      return NextResponse.json(
        { error: "Recipient email (to) is required" },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const fromUser = process.env.GMAIL_USER as string;

    const lines = [
      `Beste ${name || "gast"},`,
      "",
      "Bedankt voor uw reservering bij Camping boer Bert.",
      reservationNumber ? `Reserveringsnummer: ${reservationNumber}` : undefined,
      spot !== undefined && spot !== null && spot !== "" ? `Specifieke plek: ${spot}` : undefined,
      `Aantal personen: ${peopleCount}`,
      `Aankomst: ${arrivalDate}`,
      `Vertrek: ${departureDate}`,
      "",
      "Als er iets niet klopt of u wilt wijzigingen doorgeven, neem dan contact met ons op door te antwoorden op deze e-mail.",
      "",
      "Met vriendelijke groet,",
      "Camping Boer Bert",
    ].filter(Boolean) as string[];

    const text = lines.join("\n");

    const info = await transporter.sendMail({
      from: `Camping Boer Bert <${fromUser}>`,
      to,
      subject: "Bevestiging van uw reservering bij Camping Boer Bert",
      text,
    });
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Interne serverfout", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}
