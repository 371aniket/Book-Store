import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import SearchBook from './components/SearchBook';
import ViewBook from './components/ViewBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">📚 Book Store</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Book</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/view">View Book</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">Search Book</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/delete">Delete Book</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<h1 className="text-center text-primary">Welcome to the Book Store</h1>} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/delete" element={<DeleteBook />} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/view" element={<ViewBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
