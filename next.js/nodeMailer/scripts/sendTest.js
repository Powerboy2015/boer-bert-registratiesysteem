require('dotenv').config();
const { sendReservationEmail } = require('../app.js');

(async () => {
  try {
    const to = process.env.TEST_TO || process.argv[2] || 'you@example.com';
    const name = process.env.TEST_NAME || 'Voorbeeld Gast';
    const spot = process.env.TEST_SPOT || '12';
    const peopleCount = Number(process.env.TEST_PEOPLE || 1);
    const arrivalDate = process.env.TEST_ARRIVAL || '15-01-2026';
    const departureDate = process.env.TEST_DEPARTURE || '18-01-2026';
    const reservationNumber = process.env.TEST_RESNO || 'BB-TEST-001';

    const info = await sendReservationEmail({
      to,
      name,
      spot,
      peopleCount,
      arrivalDate,
      departureDate,
      reservationNumber,
    });

    console.log('Test email sent:', info.messageId);
  } catch (err) {
    console.error('Failed to send test email:', err?.message || err);
    process.exit(1);
  }
})();
