import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('https://book-store-backend-smid.onrender.com/books');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching books');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://book-store-backend-smid.onrender.com/books/${id}`);
      alert('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert('Error deleting book');
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      }}
    >
      <h2 className="text-center text-danger mb-4">🗑️ Delete Books</h2>
      {books.length === 0 ? (
        <p className="text-center text-muted">No books available.</p>
      ) : (
        <div className="row g-3">
          {books.map((book) => (
            <div key={book._id} className="col-md-6">
              <div
                className="p-3 border rounded shadow-sm d-flex flex-column justify-content-between h-100"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div>
                  <h5 className="mb-1 text-primary">{book.title}</h5>
                  <p className="mb-1">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="mb-2">
                    <strong>Date:</strong> {new Date(book.date).toLocaleDateString()}
                  </p>
                  {book.image && (
                    <img
                      src={book.image}
                      alt={book.title}
                      style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }}
                      className="mb-2"
                    />
                  )}
                </div>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
