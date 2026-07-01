import { useState } from "react";

function Symptoms(){

    const [selected,setSelected]=useState([]);

    const symptoms=[
        "Headache",
        "Cramps",
        "Fatigue",
        "Back Pain",
        "Mood Swings",
        "Acne",
        "Bloating"
    ];

    const toggle=(symptom)=>{

        if(selected.includes(symptom)){
            setSelected(selected.filter(item=>item!==symptom));
        }

        else{
            setSelected([...selected,symptom]);
        }

    };

    return(

        <div className="container">

            <h2>Symptom Recorder</h2>

            {
                symptoms.map((item,index)=>(
                    <div key={index}>

                        <input
                            type="checkbox"
                            checked={selected.includes(item)}
                            onChange={()=>toggle(item)}
                        />

                        {item}

                    </div>
                ))
            }

            <br/>

            <h3>Selected Symptoms</h3>

            <ul>

                {
                    selected.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))
                }

            </ul>

        </div>

    );
}

export default Symptoms;