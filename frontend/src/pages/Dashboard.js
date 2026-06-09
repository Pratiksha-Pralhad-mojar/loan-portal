import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  // ✅ ALL HOOKS INSIDE FUNCTION
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications"
      );
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/summary"
      );
      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/applications/${id}/status`,
        { status }
      );

      fetchData();
      fetchSummary();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSummary();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
  
  <div style={{ padding: "10px", border: "1px solid gray" }}>
    <h3>Total Applications</h3>
    <p>{summary.totalApplications}</p>
  </div>

  <div style={{ padding: "10px", border: "1px solid gray" }}>
    <h3>Total Amount</h3>
    <p>{summary.totalAmount}</p>
  </div>

</div>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>Total: {summary.totalApplications}</div>
        <div>Amount: {summary.totalAmount}</div>
      </div>

      {/* Applications */}
      {applications.map((app) => (
        <div key={app.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p><b>Name:</b> {app.name}</p>
          <p><b>Mobile:</b> {app.mobile}</p>
          <p><b>Amount:</b> {app.amount}</p>
          <p><b>Purpose:</b> {app.purpose}</p>
          <p><b>Status:</b> {app.status}</p>

          <button onClick={() => updateStatus(app.id, "approved")}>
            Approve
          </button>

          <button onClick={() => updateStatus(app.id, "rejected")} style={{ marginLeft: "10px" }}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;