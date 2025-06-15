import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from "react-router-dom";
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import SearchBook from './components/SearchBook';
import ViewBook from './components/ViewBook';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/login';
  };

  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <div className="container">
            <NavLink to="/" className="navbar-brand">
              📚 Book Store
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-2">
                {isAuthenticated ? (
                  <>
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
                        >
                          {label}
                        </NavLink>
                      </li>
                    ))}
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger"
                        style={{
                          borderRadius: "0.5rem",
                          padding: "6px 16px",
                          fontWeight: "500",
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          `btn ${isActive ? "btn-primary" : "btn-outline-primary"}`
                        }
                        style={{
                          borderRadius: "0.5rem",
                          padding: "6px 16px",
                          fontWeight: "500",
                        }}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/register"
                        className={({ isActive }) =>
                          `btn ${isActive ? "btn-primary" : "btn-outline-primary"}`
                        }
                        style={{
                          borderRadius: "0.5rem",
                          padding: "6px 16px",
                          fontWeight: "500",
                        }}
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
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
                    <h1 className="display-4 text-primary mb-4">Welcome to Your Digital Book Haven</h1>
                    <div className="row justify-content-center">
                      <div className="col-md-8">
                        <p className="lead text-muted mb-4">
                          {isAuthenticated
                            ? `Hello, ${user?.username}! Welcome back to your personal book collection.`
                            : "Discover, manage, and organize your book collection with our intuitive platform."}
                        </p>
                        <div className="features-grid mt-5">
                          <div className="row g-4">
                            <div className="col-md-4">
                              <div className="feature-card p-3">
                                <h3 className="h5 mb-3">📚 Extensive Collection</h3>
                                <p className="small text-muted">Access and manage your entire book collection in one place</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="feature-card p-3">
                                <h3 className="h5 mb-3">🔍 Smart Search</h3>
                                <p className="small text-muted">Find any book instantly with our powerful search feature</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="feature-card p-3">
                                <h3 className="h5 mb-3">📱 Easy Management</h3>
                                <p className="small text-muted">Add, update, or remove books with just a few clicks</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {!isAuthenticated && (
                          <div className="mt-5">
                            <p className="text-muted mb-3">Get started by creating your account or logging in</p>
                            <div className="d-flex gap-3 justify-content-center">
                              <NavLink
                                to="/register"
                                className="btn btn-primary px-4 py-2"
                              >
                                Create Account
                              </NavLink>
                              <NavLink
                                to="/login"
                                className="btn btn-outline-primary px-4 py-2"
                              >
                                Login
                              </NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/" /> : <Login />
                }
              />
              <Route
                path="/register"
                element={
                  isAuthenticated ? <Navigate to="/" /> : <Register />
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update/:id"
                element={
                  <ProtectedRoute>
                    <UpdateBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delete"
                element={
                  <ProtectedRoute>
                    <DeleteBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <SearchBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view"
                element={
                  <ProtectedRoute>
                    <ViewBook />
                  </ProtectedRoute>
                }
              />
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
