const nodemailer = require("nodemailer");
const sendMail = async (to, name, pdfPath) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
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

    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendMail;