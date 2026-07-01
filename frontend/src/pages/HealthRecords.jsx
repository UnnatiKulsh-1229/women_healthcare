import { useState } from "react";

function Recorder(){

    const [mood,setMood]=useState("");
    const [water,setWater]=useState("");
    const [notes,setNotes]=useState("");

    const saveLog=()=>{
        alert("Health Record Saved!");
        console.log({
            mood,
            water,
            notes
        });
    };
    return(
        <div className="container">
            <h2>Daily Health Recorder</h2>
            <label>Mood</label>
            <input
                type="text"
                placeholder="Happy / Tired / Irritated"
                value={mood}
                onChange={(e)=>setMood(e.target.value)}
            />
            <br/><br/>
            <label>Water Intake (Litres)</label>
            <input
                type="number"
                value={water}
                onChange={(e)=>setWater(e.target.value)}
            />
            <br/><br/>
            <label>Notes</label>
            <textarea
                rows="5"
                value={notes}
                onChange={(e)=>setNotes(e.target.value)}
            />
            <br/><br/>
            <button onClick={saveLog}>
                Save
            </button>
        </div>
    );
}
export default Recorder;