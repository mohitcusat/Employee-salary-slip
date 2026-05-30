# Employee Salary Slip Automation System

## Overview
This project automates salary slip generation and email delivery to employees.

## Features
- Upload Employee Excel Sheet
- Preview Employee Data
- Generate Salary Slip PDF
- Calculate Net Salary Automatically
- Send Salary Slips via Email
- Professional Admin Dashboard

## Tech Stack
- React.js
- Node.js
- Express.js
- PDFKit
- Nodemailer
- XLSX

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Salary Formula

Net Salary = (Base Salary + HRA + Allowances) - Deductions

## Author

Mohit Chauhan