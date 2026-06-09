import React, { useState } from "react";
import axios from "axios";

function Apply() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    amount: "",
    purpose: "",
    language: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://loan-portal-7ajr.onrender.com/api/applications",
        form
      );

      alert("Application Submitted Successfully");

      console.log(res.data);

      setForm({
        name: "",
        mobile: "",
        amount: "",
        purpose: "",
        language: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error submitting application");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Apply for Loan</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="purpose"
          placeholder="Purpose"
          value={form.purpose}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="language"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Apply;