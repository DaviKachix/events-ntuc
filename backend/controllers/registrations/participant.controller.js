const db = require("../../config/db");

// ADD PARTICIPANT
exports.addParticipant = async (req, res) => {
  try {
    const { uuid } = req.params;
    const data = req.body;

    // get session
    const [sessionRows] = await db.query(
      "SELECT * FROM registration_sessions WHERE session_uuid = ?",
      [uuid]
    );

    if (!sessionRows.length) {
      return res.status(404).json({ error: "Session not found" });
    }

    const session = sessionRows[0];

    // check participant count
    const [countRows] = await db.query(
      "SELECT COUNT(*) as total FROM participants WHERE session_id = ?",
      [session.id]
    );

    if (session.type === "team" && countRows[0].total >= 5) {
      return res.status(400).json({ error: "Max 5 members allowed" });
    }

    await db.query(
      `INSERT INTO participants 
      (session_id, full_name, gender, phone, age_group, club, role, church, conference_field, allergies, health_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.id,
        data.full_name,
        data.gender,
        data.phone,
        data.age_group,
        data.club,
        data.role,
        data.church,
        data.conference_field,
        data.allergies,
        data.health_notes,
      ]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PARTICIPANTS
exports.getParticipants = async (req, res) => {
  try {
    const { uuid } = req.params;

    const [session] = await db.query(
      "SELECT id FROM registration_sessions WHERE session_uuid = ?",
      [uuid]
    );

    const [rows] = await db.query(
      "SELECT * FROM participants WHERE session_id = ?",
      [session[0].id]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};