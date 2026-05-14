const db = require("../../config/db");

exports.stats = (req, res) => {
  const eventId = req.params.eventId;

  // total registrations for this event
  const query = `
    SELECT 
      e.id,
      e.title,
      e.event_type,
      COUNT(r.id) AS total_registrations
    FROM events e
    LEFT JOIN registrations r ON e.id = r.event_id
    WHERE e.id = ?
    GROUP BY e.id
  `;

  db.query(query, [eventId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(results[0]);
  });
};