const db = require("../config/db");
exports.saveMood = (data, callback) => {
    const sql = `
    INSERT INTO mood_tracker(user_email,mood_date,mood,notes)
    VALUES(?,?,?,?)
    ON DUPLICATE KEY UPDATE
    mood=?,
    notes=?`;
    db.query(sql,
        [
        data.user_email,
        data.mood_date,
        data.mood,
        data.notes,
        data.mood,
        data.notes
    ],callback);
};
exports.getTodayMood = (email,date,callback)=>{
    db.query(
        "SELECT * FROM mood_tracker WHERE user_email=? AND mood_date=?",
        [email,date],
        callback
    );
};