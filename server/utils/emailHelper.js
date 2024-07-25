import nodemailer from "nodemailer";

export const sendEmail = async (email, name, qrCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Library Loan QR Code',
    html: `<p>Dear ${name},</p>
           <p>Please find your QR code for the borrowed books below:</p>
           <img src="${qrCode}" alt="QR Code" />`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
