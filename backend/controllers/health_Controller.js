const db = require("../config/db");
const fs = require("fs");
const path = require("path");
// Upload Health Record
const uploadRecord = (req, res) => {
  try {
    const { user_email, title, category, record_date } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const file_name = req.file.filename;

    const sql = `
      INSERT INTO health_records
      (user_email, title, category, record_date, file_name)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [user_email, title, category, record_date, file_name],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Database Error",
          });
        }

        res.status(200).json({
          message: "Health record uploaded successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get all health records of a user
const getHealthRecords = (req, res) => {
  const { email } = req.params;

  const sql = `
    SELECT * FROM health_records
    WHERE user_email = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.status(200).json(result);
  });
};
const deleteRecord = (req, res) => {
  const { id } = req.params;

  // Get the filename first
  db.query(
    "SELECT file_name FROM health_records WHERE id = ?",
    [id],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database Error" });

      if (result.length === 0) {
        return res.status(404).json({ message: "Record not found" });
      }

      const fileName = result[0].file_name;
      const filePath = path.join(__dirname, "../upload", fileName);

      // Delete file if it exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete database record
      db.query(
        "DELETE FROM health_records WHERE id = ?",
        [id],
        (err) => {
          if (err)
            return res.status(500).json({ message: "Database Error" });

          res.json({
            message: "Record deleted successfully",
          });
        }
      );
    }
  );
};
module.exports = {
  uploadRecord,
  getHealthRecords,
  deleteRecord,
};