import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();

  const handleBook = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const author = e.target.author.value;
    const date = e.target.date.value;
    const image = e.target.image.value;

    const book = { title, author, date, image };

    try {
      await axios.post('http://localhost:8010/books', book);
      alert('Book Added Successfully');
      e.target.reset(); // clear form
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: 'auto',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 className="text-center text-primary mb-4">📚 Add a New Book</h2>
      <form onSubmit={handleBook}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">Title</label>
          <input type="text" name="title" className="form-control" placeholder="Enter book title" required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label fw-semibold">Author</label>
          <input type="text" name="author" className="form-control" placeholder="Enter author's name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label fw-semibold">Publication Date</label>
          <input type="date" name="date" className="form-control" required />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="form-label fw-semibold">Image URL</label>
          <input type="text" name="image" className="form-control" placeholder="Enter image link" required />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '8px',
          }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
