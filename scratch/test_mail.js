const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hadinhcuong01@gmail.com',
    pass: 'xvfd znmw zyhc rjki',
  },
});

async function testMail() {
  console.log('Testing SMTP connection...');
  try {
    const info = await transporter.sendMail({
      from: `"Test Server" <hadinhcuong01@gmail.com>`,
      to: 'hadinhcuong01@gmail.com',
      subject: 'Test Email',
      text: 'If you receive this, SMTP is working!',
    });
    console.log('Success! Message sent:', info.messageId);
  } catch (error) {
    console.error('Failed to send email. Error details:');
    console.error(error.message);
  }
}

testMail();
