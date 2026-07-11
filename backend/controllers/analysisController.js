const db = require("../config/db");

//  Mood Analysis 
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
// Cycle Analysis 
exports.getCycleAnalysis = (req, res) => {
    const { email } = req.params;
    const sql = `
        SELECT
            ROUND(AVG(cycle_length),0) AS averageCycle,
            MAX(cycle_length) AS longestCycle,
            MIN(cycle_length) AS shortestCycle,
            (
                SELECT last_period
                FROM cycle_records
                WHERE user_email = ?
                ORDER BY created_at DESC
                LIMIT 1
            ) AS lastPeriod,
            (
                SELECT next_period
                FROM cycle_records
                WHERE user_email = ?
                ORDER BY created_at DESC
                LIMIT 1
            ) AS nextPeriod,
            (
                SELECT ovulation_day
                FROM cycle_records
                WHERE user_email = ?
                ORDER BY created_at DESC
                LIMIT 1
            ) AS ovulationDay,
            (
                SELECT cycle_status
                FROM cycle_records
                WHERE user_email = ?
                ORDER BY created_at DESC
                LIMIT 1
            ) AS cycleStatus
        FROM cycle_records
        WHERE user_email = ?;
    `;
    db.query(
        sql,
        [email, email, email, email, email],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);
        }
    );
};
//health records
exports.getHealthRecordAnalysis = (req, res) => {
    const { email } = req.params;
    const sql = `
        SELECT category, COUNT(*) AS count
        FROM health_records
        WHERE user_email = ?
        GROUP BY category;
    `;
    db.query(sql, [email], (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.json(result);
    });
};
//AI Insights
exports.getAIInsights = (req, res) => {
    const { email } = req.params;
    const sql = `
SELECT
(
    SELECT mood
    FROM mood_tracker
    WHERE user_email = ?
    GROUP BY mood
    ORDER BY COUNT(*) DESC
    LIMIT 1
) AS topMood,

(
    SELECT ROUND(AVG(cycle_length),0)
    FROM cycle_records
    WHERE user_email = ?
) AS avgCycle,

(
    SELECT cycle_status
    FROM cycle_records
    WHERE user_email = ?
    ORDER BY created_at DESC
    LIMIT 1
) AS cycleStatus,

(
    SELECT category
    FROM health_records
    WHERE user_email = ?
    GROUP BY category
    ORDER BY COUNT(*) DESC
    LIMIT 1
) AS topCategory
`;
    db.query(sql, [email, email, email, email], (err, result) => {
        if (err)
            return res.status(500).json(err);
            res.json(result[0]);
    });

};