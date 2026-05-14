const db = require("../../config/db");

exports.register = (req, res) => {
  const { name, phone, email } = req.body;

  db.query(
    "INSERT INTO registrations (event_id,name,phone,email) VALUES (?,?,?,?)",
    [req.params.eventId, name, phone, email],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Registered successfully" });
    }
  );
};