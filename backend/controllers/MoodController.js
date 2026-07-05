const Mood = require("../model/MoodModel");
exports.saveMood = (req,res)=>{
    Mood.saveMood(req.body,(err)=>{
        if(err)
            return res.status(500).json(err);
        res.json({
            message:"Mood Saved Successfully"
        });
    });
};

exports.getTodayMood = (req,res)=>{
    Mood.getTodayMood(
        req.params.email,
        req.params.date,
        (err,result)=>{
            if(err)
                return res.status(500).json(err);
            if(result.length===0)
                return res.json({
                    mood:"",
                    notes:""
                });
            res.json(result[0]);
        });
};