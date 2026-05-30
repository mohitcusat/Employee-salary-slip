const nodemailer = require("nodemailer");

const sendMail = async (to, name, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Salary Slip",
    html: `
      <h2>Hello ${name}</h2>
      <p>Your salary slip is attached.</p>
      <p>Please find the PDF attachment.</p>
      <br/>
      <p>Regards,<br/>HR Team</p>
    `,
    attachments: [
      {
        filename: "SalarySlip.pdf",
        path: pdfPath,
      },
    ],
  });
};

module.exports = sendMail;