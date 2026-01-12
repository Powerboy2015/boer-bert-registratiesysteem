require('dotenv').config();
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');

let cachedTransporter = null;
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  const user = process.env.GMAIL_USER || 'testboerbert@gmail.com';
  const pass = process.env.GMAIL_PASS || 'swtcxzgsgymnflpo';
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

async function getDBConnection() {
  return await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'boerbert',
  });
}

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

  const fromUser = process.env.GMAIL_USER || 'testboerbert@gmail.com';
  const subject = 'Bevestiging van uw reservering bij Camping Boer Bert';

  const spotText = spot ? `Plek nummer: ${spot}` : 'Plek nummer: ';
  const reservationText = reservationNumber ? `Reserveringsnummer: ${reservationNumber}` : 'Reserveringsnummer: ';

  const lines = [
    'Hartelijk dank voor uw boeking.',
    '',
    'Wij hebben de reservering ontvangen en verwerkt.',
    '',
    `Aankomst: ${arrivalDate}`,
    `Vertrek: ${departureDate}`,
    `Plek nummer: ${typeof spot !== 'undefined' && spot !== null && spot !== '' ? spot : ''}`,
    `Aantal personen: ${peopleCount}`,
    `Reserveringsnummer: ${reservationNumber || ''}`,
    '',
    'U dient zich bij aankomst te melden bij de receptie tussen 8:00 en 12:00.',
    '📍 Heidelberglaan 15, 3584 CS',
    '',
    'Mocht er iets niet kloppen en/of wilt u iets wijzigen, neem dan contact met ons op door te antwoorden op deze E-mail.',
    'Met vriendelijke groet,',
    'Camping Boer Bert.',
  ];

  const text = lines.join('\n');

  const mailOptions = {
    from: `Camping Boer Bert <${fromUser}>`,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

async function sendReservationEmailFromDatabase(reservationId) {
  const connection = await getDBConnection();
  try {
    const query = `
      SELECT 
        r.ReseveringsNr,
        r.DatumAankomst,
        r.DatumVertrek,
        r.PlekNummer,
        r.AantalMensen,
        u.Email,
        u.Voornaam,
        u.Achternaam
      FROM Reservaties r
      JOIN UserData u ON r.UserData_ID = u.ID
      WHERE r.ID = ?
    `;

    const [rows] = await connection.execute(query, [reservationId]);
    
    if (rows.length === 0) {
      throw new Error(`Reservation with ID ${reservationId} not found`);
    }

    const reservation = rows[0];
    const formatDate = (date) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };

    const fullName = `${reservation.Voornaam} ${reservation.Achternaam}`;
    
    return await sendReservationEmail({
      to: reservation.Email,
      name: fullName,
      spot: reservation.PlekNummer,
      peopleCount: reservation.AantalMensen,
      arrivalDate: formatDate(reservation.DatumAankomst),
      departureDate: formatDate(reservation.DatumVertrek),
      reservationNumber: reservation.ReseveringsNr,
    });
  } finally {
    await connection.end();
  }
}

module.exports = { sendReservationEmail, sendReservationEmailFromDatabase };

if (require.main === module) {
  (async () => {
    try {
      const reservationId = process.argv[2];
      if (!reservationId) {
        console.error('Usage: node app.js <reservation_id>');
        process.exit(1);
      }
      const info = await sendReservationEmailFromDatabase(parseInt(reservationId));
      console.log('Email sent:', info.messageId);
    } catch (err) {
      console.error('Failed to send email:', err);
      process.exit(1);
    }
  })();
}
