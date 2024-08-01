import nodemailer from "nodemailer";

export const sendEmail = async (email, name, qrCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Library Loan QR Code",
    attachDataUrls: true,
    html: `<p>Dear ${name},</p>
           <img src="${qrCode}" alt="QR Code" />
           <p>Please use the QR code above to return the book(s).</p>
           <p>Thank you!</p>
           <p>Library Team</p>
           <p><small>This is an auto-generated email, please do not reply to this email.</small></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
