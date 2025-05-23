import React, { useState } from 'react';
import axios from 'axios';

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState(false); // for showing message conditionally

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a title to search');
      return;
    }

    try {
      const res = await axios.get(`https://book-store-backend-smid.onrender.com/search?title=${query}`);
      setBooks(res.data);
      setSearched(true);
    } catch (error) {
      console.error(error);
      alert('Error while fetching books');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Search Books</h2>
      <input
        type="text"
        placeholder="Enter book title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '70%', padding: '8px' }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '8px 16px',
          marginLeft: '10px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Search
      </button>

      <div style={{ marginTop: '20px' }}>
        {searched && books.length === 0 && <p>No books found.</p>}
        {books.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {books.map((book) => (
              <li
                key={book._id}
                style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              >
                <strong>{book.title}</strong> by {book.author} <br />
                <small>Date: {book.date}</small><br />
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{ width: '100px', marginTop: '5px' }}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
