const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (employee) => {
  // Create PDF folder if not exists
  const pdfDir = path.join(__dirname, "../generated-pdfs");

  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  const pdfPath = path.join(
    pdfDir,
    `${employee.EmployeeID}.pdf`
  );

  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  doc.pipe(fs.createWriteStream(pdfPath));

  // Safe Number Conversion
  const baseSalary = Number(employee.BaseSalary) || 0;
  const hra = Number(employee.HRA) || 0;
  const allowances = Number(employee.Allowances) || 0;
  const deductions = Number(employee.Deductions) || 0;

  // Correct Net Salary Formula
  const netSalary =
    baseSalary +
    hra +
    allowances -
    deductions;

  // Company Header
  doc
    .fontSize(22)
    .text("ABC Technologies Pvt Ltd", {
      align: "center",
    });

  doc.moveDown();

  doc
    .fontSize(18)
    .text("SALARY SLIP", {
      align: "center",
      underline: true,
    });

  doc.moveDown(2);

  // Employee Details
  doc.fontSize(14).text(`Employee ID : ${employee.EmployeeID}`);
  doc.text(`Name : ${employee.Name}`);
  doc.text(`Email : ${employee.Email}`);
  doc.text(`Designation : ${employee.Designation || "N/A"}`);
  doc.text(`Month : ${employee.Month || "N/A"}`);
  doc.text(`Year : ${employee.Year || "N/A"}`);

  doc.moveDown();

  // Salary Section
  doc
    .fontSize(16)
    .text("Salary Details", {
      underline: true,
    });

  doc.moveDown();

  doc.fontSize(14).text(`Base Salary : ₹${baseSalary}`);
  doc.text(`HRA : ₹${hra}`);
  doc.text(`Allowances : ₹${allowances}`);
  doc.text(`Deductions : ₹${deductions}`);

  doc.moveDown();

  doc
    .fontSize(18)
    .text(`Net Salary : ₹${netSalary}`, {
      underline: true,
    });

  doc.moveDown(3);

  doc
    .fontSize(10)
    .text(
      "This is a system generated salary slip and does not require a signature.",
      {
        align: "center",
      }
    );

  doc.end();

  return pdfPath;
};

module.exports = generatePDF;