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

  const lines = [
    `Beste ${name || "gast"},`,
    "",
    "Bedankt voor uw reservering bij Camping Boer Bert.",
    reservationNumber ? `Reserveringsnummer: ${reservationNumber}` : undefined,
    `Gebookte plaats/gebied: ${area || "Onbekend"}`,
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

  const mailOptions = {
    from: `Camping Boer Bert <${fromUser}>`,
    to,
    subject: "Bevestiging van uw reservering bij Camping Boer Bert",
    text,
  };

  return transporter.sendMail(mailOptions);
}

export default getTransporter;
