const express = require("express");
const cors = require("cors");

const app = express();

/**
 * ========================
 * MIDDLEWARE
 * ========================
 */
app.use(cors({
  origin: "*", // later you can restrict this
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ========================
 * ROUTES
 * ========================
 */
const authRoutes = require("./routes/auth/auth.routes");
const eventRoutes = require("./routes/events/event.routes");
const regRoutes = require("./routes/registrations/reg.routes");
const dashRoutes = require("./routes/dashboard/dashboard.routes");

/**
 * DEBUG: confirm routes are loaded
 */
console.log("🔐 Auth routes loaded");
console.log("📅 Event routes loaded");
console.log("🧾 Registration routes loaded");
console.log("📊 Dashboard routes loaded");

/**
 * API PREFIX
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/registrations", regRoutes);
app.use("/api/v1/dashboard", dashRoutes);

/**
 * HEALTH CHECK
 */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "NTUC Events API Running",
  });
});

/**
 * HANDLE 404 (IMPORTANT FOR DEBUGGING)
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

/**
 * START SERVER (IMPORTANT: allow external access)
 */
app.listen(5001, "0.0.0.0", () => {
  console.log("🚀 NTUC Backend running on port 5001");
});