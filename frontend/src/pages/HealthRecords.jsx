import { useState,useEffect } from "react";
import axios from "axios";
import "../style/HealthRecord.css";
const userEmail = localStorage.getItem("email");
function HealthRecords() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [recordDate, setRecordDate] = useState("");
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
const fetchRecords = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/health/all/${userEmail}`
    );

    setRecords(res.data);
  } catch (err) {
    console.log(err);
  }
};
const deleteRecord = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this record?"
  );

  if (!confirmDelete) return;

  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/health/delete/${id}`
    );

    alert(res.data.message);

    fetchRecords();
  } catch (err) {
    console.log(err);
    alert("Failed to delete record");
  }
};
  useEffect(() => {
  fetchRecords();
}, []);

  const uploadRecord = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_email", userEmail); // Replace with logged-in user later
    formData.append("title", title);
    formData.append("category", category);
    formData.append("record_date", recordDate);
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/health/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      fetchRecords();

      setTitle("");
      setCategory("");
      setRecordDate("");
      setFile(null);

    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div className="records-container">

<div className="records-card">

<h1>🩺 Health Records</h1>

<h3>
Store prescriptions, reports and medical documents securely.</h3>


      <form onSubmit={uploadRecord}>

<div className="form-grid">

<div className="form-group">

<label>Record Title</label>

<input
type="text"
placeholder="e.g. Blood Test"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

</div>

<div className="form-group">

<label>Category</label>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
required
>
<option value="">Select Category</option>
<option>Prescription</option>
<option>Blood Test</option>
<option>X-Ray</option>
<option>Ultrasound</option>
<option>Other</option>
</select>

</div>

<div className="form-group">

<label>Record Date</label>

<input
type="date"
value={recordDate}
onChange={(e)=>setRecordDate(e.target.value)}
required
/>

</div>

<div className="form-group">

<label>Upload File</label>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
required
/>

</div>

</div>

<button className="upload-btn">
💜 Upload Record
</button>

</form>
      <hr />

<h3>Uploaded Records</h3>

<h2 style={{marginTop:"40px"}}>📂 Uploaded Records</h2>

<div className="records-grid">

{records.map((record)=>(

<div className="record-box" key={record.id}>

<h3>{record.title}</h3>

<p><strong>Category:</strong> {record.category}</p>

<p><strong>Date:</strong> {record.record_date}</p>

<div className="record-actions">

<a
className="view-btn"
href={`${import.meta.env.VITE_API_URL}/uploads/${record.file_path}`}
target="_blank"
rel="noreferrer"
>
👁 View
</a>

<button
className="delete-btn"
onClick={()=>deleteRecord(record.id)}
>
🗑 Delete
</button>

</div>

</div>

))}

</div>    </div>
    </div>
  );

}

export default HealthRecords;