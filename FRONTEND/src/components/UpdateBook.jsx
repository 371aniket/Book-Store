import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams(); // book ID from route
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    date: "",
    image: ""
  });

  useEffect(() => {
    // fetch book details
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://bookstore-8f2m.onrender.com/books/${id}`);
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
      await axios.put(`https://bookstore-8f2m.onrender.com/books/${id}`, book);
      alert("Book updated successfully");
      navigate("/"); // redirect to home or book list
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>Update Book</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label><br />
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label><br />
          <input
            type="date"
            name="date"
            value={book.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label><br />
          <input
            type="text"
            name="image"
            value={book.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Update</button>
      </form>
    </div>
  );
};

export default UpdateBook;
