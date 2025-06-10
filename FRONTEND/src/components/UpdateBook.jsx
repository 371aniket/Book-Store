import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    date: "",
    image: ""
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8010/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Failed to load book details");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8010/books/${id}`, book);
      alert("Book updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        background: "linear-gradient(135deg, #d0e2ff, #e6ccff)",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h2 className="text-center" style={{ color: "#2c3e50", marginBottom: "20px" }}>✏️ Update Book</h2>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label><strong>Title:</strong></label><br />
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
        </div>
        <div>
          <label><strong>Author:</strong></label><br />
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
        </div>
        <div>
          <label><strong>Date:</strong></label><br />
          <input
            type="date"
            name="date"
            value={book.date}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
        </div>
        <div>
          <label><strong>Image URL:</strong></label><br />
          <input
            type="text"
            name="image"
            value={book.image}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#6a0dad",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s ease"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#5300a5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#6a0dad")}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
