const pool = require("../db");
const createApplication = async (req, res) => {
  try {
    const {
      name,
      mobile,
      amount,
      purpose,
      language
    } = req.body;

    if (
      !name ||
      !mobile ||
      !amount ||
      !purpose ||
      !language
    ) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO applications
      (name, mobile, amount, purpose, language)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        name,
        mobile,
        amount,
        purpose,
        language
      ]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      application: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const { status } = req.query;

    let query =
      "SELECT * FROM applications";

    let values = [];

    if (status) {
      query +=
        " WHERE status = $1";
      values.push(status);
    }

    query +=
      " ORDER BY created_at DESC";

    const result =
      await pool.query(query, values);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      status !== "approved" &&
      status !== "rejected"
    ) {
      return res.status(400).json({
        error: "Status must be approved or rejected"
      });
    }

    const result = await pool.query(
      `
      UPDATE applications
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Application not found"
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      application: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

const getSummary = async (req, res) => {
  try {

    const totalApplicationsResult =
      await pool.query(
        "SELECT COUNT(*) FROM applications"
      );

    const totalAmountResult =
      await pool.query(
        "SELECT COALESCE(SUM(amount),0) AS total_amount FROM applications"
      );

    const statusResult =
      await pool.query(`
        SELECT status, COUNT(*) AS count
        FROM applications
        GROUP BY status
      `);

    res.status(200).json({
      totalApplications:
        Number(
          totalApplicationsResult.rows[0].count
        ),

      totalAmount:
        Number(
          totalAmountResult.rows[0].total_amount
        ),

      statusBreakdown:
        statusResult.rows
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal Server Error"
    });

  }
};

module.exports = {
  createApplication,
  getApplications,
  updateStatus,
  getSummary
};