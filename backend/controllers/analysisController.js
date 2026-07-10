const db = require("../config/db");
exports.getMoodAnalysis = (req, res) => {
    const { email } = req.params;
    const sql = `
        SELECT mood, COUNT(*) AS count
        FROM mood_tracker
        WHERE user_email = ?
        GROUP BY mood
    `;
    db.query(sql, [email], (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.json(result);
    });
};