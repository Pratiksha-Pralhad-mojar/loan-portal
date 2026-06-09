import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({
    totalApplications: 0,
    totalAmount: 0,
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://loan-portal-7ajr.onrender.com/api/applications"
      );

      setApplications(res.data);

      setSummary({
        totalApplications: res.data.length,
        totalAmount: res.data.reduce(
          (sum, app) => sum + Number(app.amount),
          0
        ),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://loan-portal-7ajr.onrender.com/api/applications/${id}/status`,
        { status }
      );

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            padding: "10px",
            border: "1px solid gray",
          }}
        >
          <h3>Total Applications</h3>
          <p>{summary.totalApplications}</p>
        </div>

        <div
          style={{
            padding: "10px",
            border: "1px solid gray",
          }}
        >
          <h3>Total Amount</h3>
          <p>{summary.totalAmount}</p>
        </div>
      </div>

      {/* Applications List */}
      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <b>Name:</b> {app.name}
          </p>

          <p>
            <b>Mobile:</b> {app.mobile}
          </p>

          <p>
            <b>Amount:</b> {app.amount}
          </p>

          <p>
            <b>Purpose:</b> {app.purpose}
          </p>

          <p>
            <b>Status:</b> {app.status}
          </p>

          <button
            onClick={() => updateStatus(app.id, "approved")}
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus(app.id, "rejected")}
            style={{ marginLeft: "10px" }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;