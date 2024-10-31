const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const positionRoutes = require("./routes/positionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const performanceRoutes = require("./routes/performanceRoutes");

const PORT = process.env.PORT || 5000;

dotEnv.config();
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => console.error("Error Occurs", error));

// Routes
app.use("/users", userRoutes);
app.use("/employees", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/payroll", payrollRoutes);
app.use("/leaves", leaveRoutes);
app.use("/department", departmentRoutes);
app.use("/positions", positionRoutes);
app.use("/notifications", notificationRoutes);
app.use("/performance", performanceRoutes);

app.get("/", (req, res) => {
  res.send("Server is Running Successfully.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
