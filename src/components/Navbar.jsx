import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo, logoutAPI } from '../API/api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // ✅ Check if token exists
      if (token) {
        try {
          const res = await getUserInfo(); // Assume this uses the token internally
          if (res.success) {
            setUser(res.loggedUser);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, []); // No dependencies: run once on mount

  const handleLogout = () => {
    logoutAPI(); // Presumably clears token from storage or cookie
    localStorage.removeItem('token'); // ✅ Ensure token is cleared
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container d-flex justify-content-between">
        {/* App Title */}
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
          Shopvista
        </Link>

        {/* Right Side: Welcome + Logout/Login */}
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3 text-dark fw-medium">
                Welcome, {user.name}
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-secondary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
