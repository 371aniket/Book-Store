import React from 'react';
import axios from 'axios';

const AddBook = () => {
  const handleBook = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const author = e.target.author.value;
    const date = e.target.date.value;
    const image = e.target.image.value;

    const book = { title, author, date, image };

    try {
      await axios.post('https://book-store-backend-smid.onrender.com', book);
      alert('Book Added Successfully');
      e.target.reset(); // clear form
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1>Add Book</h1>
      <form onSubmit={handleBook}>
        <div>
          <label>Title:</label><br />
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Author:</label><br />
          <input type="text" name="author" required />
        </div>
        <div>
          <label>Date:</label><br />
          <input type="date" name="date" required />
        </div>
        <div>
          <label>Image URL:</label><br />
          <input type="text" name="image" required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
