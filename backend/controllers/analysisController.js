const db = require("../config/db");

const getMoodAnalysis = (req, res) => {
    const { email } = req.params;

    const sql = `
        SELECT mood, COUNT(*) AS count
        FROM mood_tracker
        WHERE user_email = ?
        GROUP BY mood
    `;

    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        res.json(result);
    });
};

module.exports = {
    getMoodAnalysis
};