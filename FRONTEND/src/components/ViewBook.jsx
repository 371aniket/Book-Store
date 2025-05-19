import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      const res = await axios.get('https://bookstore-8f2m.onrender.com/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      alert('Failed to load books');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>📚 View Book Details</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '15px',
                width: '250px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={book.image}
                alt={book.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Date:</strong> {book.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewBook;
