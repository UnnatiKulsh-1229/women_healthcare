const express=require("express");
const router=express.Router();
const moodController=require("../controllers/MoodController");
router.post("/save",moodController.saveMood);
router.get("/today/:email/:date",moodController.getTodayMood);
module.exports=router;