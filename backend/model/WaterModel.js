const db = require("../config/db");
const saveWater = (data, callback) => {
    const sql = `
    INSERT INTO water_tracker(user_email, water_date, glasses, goal)
    VALUES(?,?,?,?)
    ON DUPLICATE KEY UPDATE
    glasses=?,
    goal=?`;
    db.query(
        sql,
        [
            data.user_email,
            data.water_date,
            data.glasses,
            data.goal,
            data.glasses,
            data.goal
        ],
        callback
    );
};
const getToday = (email, date, callback) => {
    db.query(
        "SELECT * FROM water_tracker WHERE user_email=? AND water_date=?",
        [email, date],
        callback
    );
};

module.exports = {
    saveWater,
    getToday
};