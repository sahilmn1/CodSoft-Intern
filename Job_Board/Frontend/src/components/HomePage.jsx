import "../assets/css/styles.css";
import FeaturedJobListings from "./FeaturedJobListings";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate an API call or any asynchronous operation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mt-5">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="jumbotron margin-top">
          <h1 className="display-4">Welcome to the Job Board!</h1>
          <p className="lead">
            Find your dream job or attract the right talent.
          </p>

          <h1>Find More Jobs -</h1>
          <Link to="/jobs" className="lead h2">
            <button type="button" className="btn btn-outline-primary">
              Find More Jobs...
            </button>
          </Link>
          <FeaturedJobListings />
          {/* Add featured job listings or any other content you want on the home page */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
