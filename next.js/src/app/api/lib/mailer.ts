import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  if (!user || !pass) {
    throw new Error("Missing GMAIL_USER or GMAIL_PASS environment variables");
  }
  const dryRun = String(process.env.DRY_RUN || "").toLowerCase() === "true";
  return dryRun
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user, pass },
      });
}

export async function sendReservationEmail(params: {
  to: string;
  name?: string;
  area?: string;
  spot?: string | number | null | undefined;
  peopleCount: number | string;
  arrivalDate: string;
  departureDate: string;
  reservationNumber?: string;
}) {
  const { to, name, area, spot, peopleCount, arrivalDate, departureDate, reservationNumber } = params;
  if (!to) throw new Error("Recipient email (to) is required");
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

  const mailOptions = {
    from: `Camping Boer Bert <${fromUser}>`,
    to,
    subject: "Bevestiging van uw reservering bij Camping Boer Bert",
    text,
  };

  return transporter.sendMail(mailOptions);
}

export default getTransporter;
