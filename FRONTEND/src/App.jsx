import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
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
      <div
        className="d-flex flex-column min-vh-100"
        style={{
          background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
        }}
      >
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg shadow-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "0.75rem 1rem",
          }}
        >
          <div className="container-fluid">
            <NavLink
              to="/"
              className="navbar-brand fw-bold d-flex align-items-center fs-3 text-primary"
            >
              <span role="img" aria-label="books" className="me-2" style={{ fontSize: "2rem" }}>
                📚
              </span>
              Book Store
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-2">
                {[
                  { to: "/add", label: "Add Book" },
                  { to: "/view", label: "View Book" },
                  { to: "/search", label: "Search Book" },
                  { to: "/delete", label: "Delete Book" },
                ].map(({ to, label }) => (
                  <li className="nav-item" key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `btn ${isActive ? "btn-primary" : "btn-outline-primary"}`
                      }
                      style={{
                        borderRadius: "0.5rem",
                        padding: "6px 16px",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 123, 255, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main
          className="flex-grow-1 py-4 px-3 px-md-5"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div className="container shadow rounded p-4" style={{ backgroundColor: "#fff" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="text-center py-5">
                    <h1 className="display-4 text-primary mb-3">Welcome to the Book Store</h1>
                    <p className="lead text-muted">Manage your books easily with our intuitive interface.</p>
                  </div>
                }
              />
              <Route path="/add" element={<AddBook />} />
              <Route path="/update/:id" element={<UpdateBook />} />
              <Route path="/delete" element={<DeleteBook />} />
              <Route path="/search" element={<SearchBook />} />
              <Route path="/view" element={<ViewBook />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="text-center py-3 mt-auto"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)", fontSize: "14px", color: "#555" }}
        >
          © {new Date().getFullYear()} Book Store. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
