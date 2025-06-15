import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUsername(userData.username);
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8010/books", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:8010/search?title=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
      setError("Failed to search books. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:8010/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(books.filter(book => book._id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
        setError("Failed to delete book. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-italic mb-2">Welcome, {username}</h1>
          <p className="text-xl font-bold text-gray-600">Your Book Collection</p>
        </div>

        {/* Search and Add */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-5000 text-gray px-4 py-2 rounded">
              Search
            </button>
          </form>
          <button
            onClick={() => navigate("/add")}
            className="bg-green-500 text-gray px-4 py-2 rounded"
          >
            Add New Book
          </button>
        </div>

        {/* Books List */}
        {books.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-red-500 mb-4">No books found</p>
            <button
              onClick={() => navigate("/add")}
              className="bg-green-500 text-gray px-4 py-2 rounded"
            >
              Add Your First Book
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Author</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        {book.image && (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-8 h-8 object-cover rounded"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                        <span>{book.title}</span>
                      </div>
                    </td>
                    <td className="p-2">{book.author}</td>
                    <td className="p-2">{new Date(book.date).toLocaleDateString()}</td>
                    <td className="p-2">${book.price?.toFixed(2) || '0.00'}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/update/${book._id}`)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBook;
