const express = require("express");

const {
  createApplication,
  getApplications,
  updateStatus,
  getSummary,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/applications", createApplication);

router.get("/applications", getApplications);

router.patch("/applications/:id/status", updateStatus);

router.get("/summary", getSummary);

module.exports = router;