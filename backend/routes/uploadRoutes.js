const express = require("express");
const multer = require("multer");
const fs = require("fs");
const XLSX = require("xlsx");

const generatePDF = require("../controllers/pdfGenerator");
const sendMail = require("../controllers/sendMail");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

// ==========================
// Upload Excel & Convert JSON
// ==========================
router.post("/", upload.single("file"), (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const data = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    fs.writeFileSync(
      "./data/employees.json",
      JSON.stringify(data, null, 2)
    );

    res.json({
      success: true,
      records: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================
// Generate PDFs & Send Emails
// ==========================
router.post("/send-slips", async (req, res) => {
  try {
    const employees = JSON.parse(
      fs.readFileSync("./data/employees.json", "utf8")
    );

    for (const emp of employees) {
      const pdfPath = generatePDF(emp);

      await sendMail(
        emp.Email,
        emp.Name,
        pdfPath
      );
    }

    res.json({
      success: true,
      message: "Salary slips sent successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;