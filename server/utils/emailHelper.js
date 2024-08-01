import nodemailer from "nodemailer";

export const sendEmail = async (email, name, qrCode , bookNames) => {
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
    subject: "SVK Library - Book Loan",
    attachDataUrls: true,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .header img {
      border-radius: 50%;
    }
    .header div {
      margin-left: 10px;
    }
    .header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }
    .header p {
      margin: 0;
      color: #888;
      font-size: 14px;
    }
    .due-date {
      text-align: right;
    }
    .due-date p {
      margin: 0;
      font-size: 14px;
    }
    .due-date p:last-child {
      font-size: 18px;
      font-weight: bold;
    }
    .separator {
      border-bottom: 1px solid #eaeaea;
      margin: 20px 0;
    }
    .content {
      margin-bottom: 20px;
    }
    .content p {
      margin: 0 0 5px 0;
      font-size: 14px;
    }
    .content p:last-child {
      font-size: 18px;
      font-weight: bold;
    }
    .books {
      display: flex;
      flex-wrap: wrap;
    }
    .book {
      width: 50%;
      padding: 10px 0;
    }
    .book p {
      margin: 0;
      font-size: 14px;
    }
    .book p:first-child {
      font-size: 16px;
      font-weight: bold;
    }
    .qr-code {
      text-align: center;
    }
    .qr-code img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="https://via.placeholder.com/40" width="40" height="40" alt="Library Logo">
      </div>
      <div>
        <h2>
        SVK Library
        </h2>
        <p>Book Loan</p>
      </div>
      <div class="due-date">
        <p>Due Date:</p>
        <p>2024-09-15</p>
      </div>
    </div>
    <div class="separator"></div>
    <div class="content">
      <p>Borrower:</p>
      <p>${name}</p>
    </div>
    <div class="content">
      <p>Books:</p>
      <div class="books">
        <div class="book">
          <p>The Great Gatsby</p>
          <p>by F. Scott Fitzgerald</p>
        </div>
        <div class="book">
          <p>To Kixxll a Mockingbird</p>
          <p>by Harper Lee</p>
        </div>
        <div class="book">
          <p>1984</p>
          <p>by George Orwell</p>
        </div>
        <div class="book">
          <p>Pride and Prejudice</p>
          <p>by Jane Austen</p>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div class="qr-code">
      <img src="${qrCode}" alt="QR Code">
      <p class="footer">Scan this QR code to access your loan details.</p>
    </div>
  </div>
</body>
</html>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};





