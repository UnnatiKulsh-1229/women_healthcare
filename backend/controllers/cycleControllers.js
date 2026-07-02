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

module.exports = { addCycleRecord };