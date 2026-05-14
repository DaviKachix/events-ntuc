const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

// CREATE SESSION
exports.createSession = async (req, res) => {
  try {
    const { event_id, type, leader_name, leader_phone } = req.body;

    const session_uuid = `EVT-${Date.now()}-${uuidv4().slice(0, 6)}`;

    await db.query(
      `INSERT INTO registration_sessions 
      (event_id, session_uuid, type, leader_name, leader_phone)
      VALUES (?, ?, ?, ?, ?)`,
      [event_id, session_uuid, type, leader_name, leader_phone]
    );

    res.json({
      success: true,
      session_uuid,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SESSION
exports.getSession = async (req, res) => {
  try {
    const { uuid } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM registration_sessions WHERE session_uuid = ?",
      [uuid]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};