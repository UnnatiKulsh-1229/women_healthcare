const db = require("../config/db");
const addCycleRecord = (req, res) => {
    const {
        user_email,
        last_period,
        cycle_length,
        next_period,
        ovulation_day,
        fertile_start,
        fertile_end,
        cycle_status
    } = req.body;
    const sql = `
    INSERT INTO cycle_records
    (
        user_email,
        last_period,
        cycle_length,
        next_period,
        ovulation_day,
        fertile_start,
        fertile_end,
        cycle_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            user_email,
            last_period,
            cycle_length,
            next_period,
            ovulation_day,
            fertile_start,
            fertile_end,
            cycle_status
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            res.status(201).json({
                success: true,
                message: "Prediction Saved Successfully"
            });
        }
    );
};
const getLatestCycleRecord = (req, res) => {
    const { email } = req.params;
    const sql = `
        SELECT *
        FROM cycle_records
        WHERE user_email = ?
        ORDER BY created_at DESC
        LIMIT 1
    `;
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "No cycle record found"
            });
        }
        res.json(result[0]);
    });
};
module.exports = {
    addCycleRecord,
    getLatestCycleRecord
};