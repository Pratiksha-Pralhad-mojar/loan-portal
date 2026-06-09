const express = require("express");
const cors = require("cors");
require("dotenv").config();

const applicationRoutes = require("./routes/applications");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", applicationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Loan Portal API Running Successfully"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 