import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      const res = await axios.get('https://book-store-backend-smid.onrender.com/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      alert('Failed to load books');
    }
  };

  return (
    <div
      style={{
        padding: '40px 20px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d0e2ff, #e6ccff)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        📚 View Book Details
      </h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}
      >
        {books.length === 0 ? (
          <p style={{ fontSize: '18px', color: '#555' }}>No books found</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '16px',
                padding: '20px',
                width: '250px',
                backgroundColor: '#ffffff',
                textAlign: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '12px',
                }}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <h3 style={{ margin: '10px 0', color: '#34495e' }}>{book.title}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Author:</strong> {book.author}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Date:</strong> {book.date}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewBook;
