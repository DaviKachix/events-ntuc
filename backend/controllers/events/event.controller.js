const db = require("../../config/db");
const { success, created, fail } = require("../../utils/response");

// PUBLIC LIST
exports.publicList = (req, res) => {
  db.query("SELECT * FROM events", (err, data) => {
    if (err) return fail(res, 500, err.message);
    return success(res, data);
  });
};

// SINGLE EVENT
exports.getOne = (req, res) => {
  db.query(
    "SELECT * FROM events WHERE slug=?",
    [req.params.slug],
    (err, data) => {
      if (err) return fail(res, 500, err.message);

      if (!data.length) {
        return fail(res, 404, "Event not found");
      }

      return success(res, data[0]);
    }
  );
};

// CREATE
exports.create = (req, res) => {
  const { title, description, slug, event_type } = req.body;

  db.query(
    "INSERT INTO events (title,description,slug,event_type,created_by) VALUES (?,?,?,?,?)",
    [title, description, slug, event_type, req.user.id],
    (err, result) => {
      if (err) return fail(res, 500, err.message);

      return created(res, { id: result.insertId }, "Event created");
    }
  );
};

// UPDATE
exports.update = (req, res) => {
  const { title, description, event_type } = req.body;

  db.query(
    "UPDATE events SET title=?, description=?, event_type=? WHERE id=? AND created_by=?",
    [title, description, event_type, req.params.id, req.user.id],
    (err) => {
      if (err) return fail(res, 500, err.message);

      return success(res, null, "Updated");
    }
  );
};

// DELETE
exports.remove = (req, res) => {
  db.query(
    "DELETE FROM events WHERE id=? AND created_by=?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return fail(res, 500, err.message);

      return success(res, null, "Deleted");
    }
  );
};

// MY EVENTS
exports.myEvents = (req, res) => {
  db.query(
    "SELECT * FROM events WHERE created_by=?",
    [req.user.id],
    (err, data) => {
      if (err) return fail(res, 500, err.message);

      return success(res, data);
    }
  );
};