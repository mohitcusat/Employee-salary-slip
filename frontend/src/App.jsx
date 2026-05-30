import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setEmployees(res.data.data);
      alert("Excel uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const sendSlips = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload/send-slips"
      );

      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to generate salary slips");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Salary Slip Automation System</h1>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        style={{ marginLeft: "10px" }}
      >
        Upload Excel
      </button>

      <button
        onClick={sendSlips}
        style={{ marginLeft: "10px" }}
      >
        Generate PDFs & Send Emails
      </button>

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Base Salary</th>
            <th>HRA</th>
            <th>Allowances</th>
            <th>Deductions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.EmployeeID}</td>
              <td>{emp.Name}</td>
              <td>{emp.Email}</td>
              <td>{emp.BaseSalary}</td>
              <td>{emp.HRA}</td>
              <td>{emp.Allowances}</td>
              <td>{emp.Deductions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;