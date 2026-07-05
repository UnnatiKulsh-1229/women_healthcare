const Water = require("../model/waterModel");
exports.saveWater = (req, res) => {
    Water.saveWater(req.body, (err) => {

        if (err)
            return res.status(500).json(err);
        res.json({
            message: "Water intake saved successfully"
        });
    });
};

exports.getToday = (req, res) => {
    const email = req.params.email;
    const date = req.params.date;
    Water.getToday(email, date, (err, result) => {
        if (err)
            return res.status(500).json(err);
        if (result.length === 0)
            return res.json({
                glasses: 0,
                goal: 8
            });
        res.json(result[0]);
    });
};