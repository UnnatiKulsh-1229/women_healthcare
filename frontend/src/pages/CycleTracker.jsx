import { useState } from "react";

function Tracker() {

    const [lastPeriod, setLastPeriod] = useState("");
    const [cycleLength, setCycleLength] = useState(28);

    const calculateNext = () => {

        if (!lastPeriod) {
            alert("Please select a date");
            return;
        }

        const date = new Date(lastPeriod);
        date.setDate(date.getDate() + Number(cycleLength));

        console.log("Estimated Next Period: " + date.toDateString());
    };

    return (
        <div className="container">

            <h2>Period Tracker</h2>

            <label>Last Period Date</label>

            <input
                type="date"
                value={lastPeriod}
                onChange={(e)=>setLastPeriod(e.target.value)}
            />

            <br/><br/>

            <label>Cycle Length</label>

            <input
                type="number"
                value={cycleLength}
                onChange={(e)=>setCycleLength(e.target.value)}
            />

            <br/><br/>

            <button onClick={calculateNext}>
                Calculate
            </button>

        </div>
    );
}

export default Tracker;