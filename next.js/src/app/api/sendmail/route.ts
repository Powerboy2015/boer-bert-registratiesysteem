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

    const spotText = spot !== undefined && spot !== null && spot !== "" ? `Plek nummer: ${spot}` : "Plek nummer: ";
    const reservationText = reservationNumber ? `Reserveringsnummer: ${reservationNumber}` : "Reserveringsnummer: ";

    const lines = [
      "Hartelijk dank voor uw boeking.",
      "",
      "Wij hebben de reservering ontvangen en verwerkt.",
      "",
      `Aankomst: ${arrivalDate}`,
      `Vertrek: ${departureDate}`,
      spotText,
      `Aantal personen: ${peopleCount}`,
      reservationText,
      "",
      "U dient zich bij aankomst te melden bij de receptie tussen 8:00 en 12:00.",
      "📍 Heidelberglaan 15, 3584 CS",
      "",
      "Mocht er iets niet kloppen en/of wilt u iets wijzigen, neem dan contact met ons op door te antwoorden op deze E-mail.",
      "Met vriendelijke groet,",
      "Camping Boer Bert.",
    ];

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
