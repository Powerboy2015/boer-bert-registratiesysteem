const nodemailer = require('nodemailer');

// Creates and caches a Gmail transporter using environment variables
let cachedTransporter = null;
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  if (!user || !pass) {
    throw new Error('Missing GMAIL_USER or GMAIL_PASS environment variables');
  }
  const dryRun = String(process.env.DRY_RUN || '').toLowerCase() === 'true';
  cachedTransporter = dryRun
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user, pass },
      });
  return cachedTransporter;
}

/**
 * Send reservation confirmation email.
 * @param {Object} params
 * @param {string} params.to - Recipient email address.
 * @param {string} params.name - Guest full name.
 * @param {string|number} [params.spot] - Specific spot number/name if selected.
 * @param {number} params.peopleCount - Number of people in the booking.
 * @param {string} params.arrivalDate - Arrival date (YYYY-MM-DD or human-readable).
 * @param {string} params.departureDate - Departure date.
 * @param {string} [params.reservationNumber] - Optional reservation identifier.
 * @returns {Promise<Object>} Nodemailer sendMail info
 */
async function sendReservationEmail({
  to,
  name,
  spot,
  peopleCount,
  arrivalDate,
  departureDate,
  reservationNumber,
}) {
  if (!to) throw new Error('Recipient email (to) is required');
  const transporter = getTransporter();

  const fromUser = process.env.GMAIL_USER;
  const subject = 'Bevestiging van uw reservering bij Camping Boer Bert';

  const lines = [
    `Beste ${name || 'gast'},`,
    '',
    'Bedankt voor uw reservering bij Camping Boer Bert.',
    reservationNumber ? `Reserveringsnummer: ${reservationNumber}` : undefined,
    typeof spot !== 'undefined' && spot !== null && spot !== '' ? `Specifieke plek: ${spot}` : undefined,
    `Aantal personen: ${peopleCount}`,
    `Aankomst: ${arrivalDate}`,
    `Vertrek: ${departureDate}`,
    '',
    'Als er iets niet klopt of u wilt wijzigingen doorgeven, neem dan contact met ons op door te antwoorden op deze e-mail.',
    '',
    'Met vriendelijke groet,',
    'Camping Boer Bert',
  ].filter(Boolean);

  const text = lines.join('\n');

  const mailOptions = {
    from: `Camping Boer Bert <${fromUser}>`,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendReservationEmail };

// Optional: allow running directly for a quick manual test
if (require.main === module) {
  (async () => {
    try {
      const to = process.argv[2];
      if (!to) {
        console.error('Usage: node app.js <recipient@example.com>');
        process.exit(1);
      }
      const info = await sendReservationEmail({
        to,
        name: 'Voorbeeld Gast',
        spot: '12A',
        peopleCount: 2,
        arrivalDate: '2026-06-01',
        departureDate: '2026-06-07',
        reservationNumber: 'BB-12345',
      });
      console.log('Email sent:', info.messageId);
    } catch (err) {
      console.error('Failed to send email:', err);
      process.exit(1);
    }
  })();
}
