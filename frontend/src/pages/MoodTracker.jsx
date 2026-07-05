import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../style/MoodTracker.css";

function MoodTracker() {

    const email = localStorage.getItem("email");

    const [mood,setMood]=useState("");

    const [notes,setNotes]=useState("");

    useEffect(()=>{

        fetchMood();

    },[]);

    const fetchMood=async()=>{

        const today=new Date().toISOString().split("T")[0];

        const res=await axios.get(
            `http://localhost:5000/api/mood/today/${email}/${today}`
        );

        setMood(res.data.mood || "");
        setNotes(res.data.notes || "");

    };

    const saveMood = async () => {
  const today = new Date().toISOString().split("T")[0];

  try {
    console.log({
      user_email: email,
      mood_date: today,
      mood,
      notes,
    });

    const response = await axios.post(
      "http://localhost:5000/api/mood/save",
      {
        user_email: email,
        mood_date: today,
        mood,
        notes,
      }
    );

    console.log(response.data);
    alert("Mood Saved!");
  } catch (err) {
    console.log("FULL ERROR:", err);

    if (err.response) {
      console.log("Response:", err.response.data);
    }

    alert("Error saving mood");
  }
};

    return(

<div className="dashboard">

<Sidebar/>

<div className="main-content">

<Navbar/>

<div className="mood-container">

<h1>😊 Mood Tracker</h1>

<h3>How are you feeling today?</h3>

<div className="moods">

<button onClick={()=>setMood("Happy")}>😊 Happy</button>

<button onClick={()=>setMood("Calm")}>😌 Calm</button>

<button onClick={()=>setMood("Sad")}>😢 Sad</button>

<button onClick={()=>setMood("Angry")}>😠 Angry</button>

<button onClick={()=>setMood("Anxious")}>😰 Anxious</button>

<button onClick={()=>setMood("Tired")}>😴 Tired</button>

</div>

<textarea
placeholder="Write today's notes..."
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

<br/>

<button className="save-btn" onClick={saveMood}>
Save Mood
</button>

</div>

</div>

</div>

);

}

export default MoodTracker;