const nodemailer = require('nodemailer');

const html = ` 
        <h1>Dank u voor de boeking</h1>
        <p>Wij kijken uit naar je komst!</p>
`;


const emails = [
        'luca-0118@hotmail.com',
        
];

async function main() {
        const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                        user: 'testboerbert@gmail.com',
                        pass: 'swtcxzgsgymnflpo'
                }
        });

        const info = await transporter.sendMail({
                from: '"Boer Bert" <testboerBert@gmail.com>',
                to: emails,
                subject: 'Boekingsbevestiging',
                html
        });

        console.log('Message sent: ' + info.messageId);
        console.log(info.accepted);
        console.log(info.rejected);
    
}

main().catch(e => console.log(e));