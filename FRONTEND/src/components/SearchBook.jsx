import React, { useState } from 'react';
import axios from 'axios';

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a title to search');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8010/search?title=${query}`);
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
      <h2 className="text-center text-primary mb-4">🔍 Search Books</h2>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-control"
          style={{ flexGrow: 1, minWidth: '250px', maxWidth: '400px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary"
          style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: '500' }}
        >
          Search
        </button>
      </div>

      <div className="mt-4">
        {searched && books.length === 0 && (
          <p className="text-center text-muted">No books found with the given title.</p>
        )}
        {books.length > 0 && (
          <div className="row g-3 mt-2">
            {books.map((book) => (
              <div key={book._id} className="col-md-6">
                <div
                  className="p-3 border rounded shadow-sm h-100"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <h5 className="text-dark">{book.title}</h5>
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
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginTop: '10px'
                      }}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
