#!/bin/bash

echo "🚀 Creating NTUC Events BACKEND (Production Structure)"

# =========================
# ROOT BACKEND FOLDER
# =========================
mkdir backend
cd backend

npm init -y

# =========================
# INSTALL DEPENDENCIES
# =========================
npm install express mysql2 cors dotenv jsonwebtoken bcryptjs
npm install nodemon --save-dev

# =========================
# PACKAGE SCRIPT
# =========================
npm pkg set scripts.dev="nodemon server.js"

# =========================
# PROJECT STRUCTURE
# =========================
mkdir config controllers routes middlewares services

mkdir controllers/auth controllers/events controllers/registrations controllers/dashboard

mkdir routes/auth routes/events routes/registrations routes/dashboard

# =========================
# SERVER ENTRY
# =========================
cat <<EOL > server.js
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth/auth.routes");
const eventRoutes = require("./routes/events/event.routes");
const regRoutes = require("./routes/registrations/reg.routes");
const dashRoutes = require("./routes/dashboard/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/registrations", regRoutes);
app.use("/api/v1/dashboard", dashRoutes);

app.get("/", (req, res) => {
  res.json({ message: "NTUC Events API Running" });
});

app.listen(5000, () => {
  console.log("🚀 NTUC Backend running on port 5000");
});
EOL

# =========================
# DB CONNECTION
# =========================
cat <<EOL > config/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "events_ntuc"
});

db.connect(err => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MySQL Connected (events_ntuc)");
  }
});

module.exports = db;
EOL

# =========================
# AUTH MODULE (JWT + ROLES)
# =========================
cat <<EOL > controllers/auth/auth.controller.js
const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, hash, role || "member"],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "User registered" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
    if (err) return res.json(err);

    const user = data[0];
    if (!user) return res.json({ message: "User not found" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "SECRET_KEY"
    );

    res.json({ token, user });
  });
};
EOL

cat <<EOL > routes/auth/auth.routes.js
const router = require("express").Router();
const controller = require("../../controllers/auth/auth.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
EOL

# =========================
# EVENTS MODULE
# =========================
cat <<EOL > controllers/events/event.controller.js
const db = require("../../config/db");

exports.createEvent = (req, res) => {
  const { title, description, slug, event_type, created_by } = req.body;

  db.query(
    "INSERT INTO events (title,description,slug,event_type,created_by) VALUES (?,?,?,?,?)",
    [title, description, slug, event_type, created_by],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Event created" });
    }
  );
};

exports.getEvent = (req, res) => {
  db.query(
    "SELECT * FROM events WHERE slug = ?",
    [req.params.slug],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data[0]);
    }
  );
};

exports.myEvents = (req, res) => {
  db.query(
    "SELECT * FROM events WHERE created_by = ?",
    [req.params.id],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};
EOL

cat <<EOL > routes/events/event.routes.js
const router = require("express").Router();
const controller = require("../../controllers/events/event.controller");

router.post("/", controller.createEvent);
router.get("/:slug", controller.getEvent);
router.get("/my/:id", controller.myEvents);

module.exports = router;
EOL

# =========================
# REGISTRATION MODULE
# =========================
cat <<EOL > controllers/registrations/reg.controller.js
const db = require("../../config/db");

exports.register = (req, res) => {
  const { name, phone, email } = req.body;
  const eventId = req.params.id;

  db.query(
    "INSERT INTO registrations (event_id,name,phone,email) VALUES (?,?,?,?)",
    [eventId, name, phone, email],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Registered successfully" });
    }
  );
};
EOL

cat <<EOL > routes/registrations/reg.routes.js
const router = require("express").Router();
const controller = require("../../controllers/registrations/reg.controller");

router.post("/register/:id", controller.register);

module.exports = router;
EOL

# =========================
# DASHBOARD MODULE
# =========================
cat <<EOL > routes/dashboard/dashboard.routes.js
const router = require("express").Router();
const db = require("../../config/db");

router.get("/stats/:eventId", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM registrations WHERE event_id = ?",
    [req.params.eventId],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data[0]);
    }
  );
});

module.exports = router;
EOL

# =========================
# DONE
# =========================

echo "✅ NTUC BACKEND FULLY CREATED"
echo ""
echo "STRUCTURE:"
echo "- Auth (JWT + roles)"
echo "- Events CRUD"
echo "- Registration system"
echo "- Dashboard stats API"
echo "- Clean modular architecture"
echo "- API v1 ready"
echo ""
echo "RUN:"
echo "cd backend && npm run dev"