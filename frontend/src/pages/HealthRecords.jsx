import { useState,useEffect } from "react";
import axios from "axios";
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
      `http://localhost:5000/api/health/all/${userEmail}`
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
      `http://localhost:5000/api/health/delete/${id}`
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
        "http://localhost:5000/api/health/upload",
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
    <div style={{ padding: "30px" }}>
      <h2>Health Records</h2>

      <form onSubmit={uploadRecord}>

        <input
          type="text"
          placeholder="Record Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option>Prescription</option>
          <option>Blood Test</option>
          <option>X-Ray</option>
          <option>Ultrasound</option>
          <option>Other</option>
        </select>

        <br /><br />

        <input
          type="date"
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <br /><br />

        <button type="submit">
          Upload Record
        </button>

      </form>
      <hr />

<h3>Uploaded Records</h3>

<table border="1" cellPadding="10">
  <thead>
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Date</th>
      <th>File</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {records.map((record) => (
      <tr key={record.id}>
        <td>{record.title}</td>
        <td>{record.category}</td>
        <td>{record.record_date}</td>

        <td>
  <a
    href={`http://localhost:5000/upload/${record.file_name}`}
    target="_blank"
    rel="noreferrer"
  >
    View
  </a>
</td>

<td>
  <button onClick={() => deleteRecord(record.id)}>
    Delete
  </button>
</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );

}

export default HealthRecords;