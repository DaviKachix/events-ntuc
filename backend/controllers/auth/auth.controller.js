const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  console.log("REGISTER HIT:", req.body);

  const { name, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, password, role || "member"],
    (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({ message: "DB error", err });
      }

      console.log("INSERT SUCCESS:", result);

      return res.status(201).json({
        message: "User created",
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      const user = data[0];

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        "SECRET_KEY",
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};