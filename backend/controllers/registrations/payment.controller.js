const db = require("../../config/db");

// INIT PAYMENT
exports.initPayment = async (req, res) => {
  try {
    const { session_uuid, amount } = req.body;

    const [session] = await db.query(
      "SELECT id FROM registration_sessions WHERE session_uuid = ?",
      [session_uuid]
    );

    const session_id = session[0].id;

    await db.query(
      "INSERT INTO payments (session_id, amount, status) VALUES (?, ?, 'pending')",
      [session_id, amount]
    );

    await db.query(
      "UPDATE registration_sessions SET status = 'pending_payment' WHERE id = ?",
      [session_id]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CONFIRM PAYMENT
exports.confirmPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    await db.query(
      "UPDATE payments SET status = 'paid' WHERE reference = ?",
      [reference]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};