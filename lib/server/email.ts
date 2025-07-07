import nodemailer from 'nodemailer';

export async function sendEmail({ subject, text, html }: { subject: string; text?: string; html?: string }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_TO,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
} 