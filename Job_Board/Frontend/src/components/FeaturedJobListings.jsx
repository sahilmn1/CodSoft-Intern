import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaChevronRight } from "react-icons/fa";

const FeaturedJobListings = () => {
  const [Loading, setLoading] = useState(true);
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    // Fetch featured jobs from your API
    const fetchFeaturedJobs = async () => {
      try {
        const response = await fetch(
          "https://jobboard-0da3.onrender.com/jobs/featured"
        );
        const data = await response.json();
        setFeaturedJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured jobs:", error);
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Featured jobs</h2>
      {Loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading featured jobs...</p>
        </div>
      ) : (
        <ul className="list-unstyled">
          {featuredJobs.map((job) => (
            <li key={job._id} className="mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{job.title}</h3>
                  <p className="card-subtitle mb-2 text-muted">{job.company}</p>
                  {/* <p className="card-text">{job.description}</p> */}
                  <p className="card-text">
                    <FaMapMarkerAlt /> Location: {job.location}
                  </p>
                  <p className="card-text">
                    <FaBriefcase /> Type: {job.jobType}
                  </p>
                  <p className="card-text">
                    <FaBriefcase /> Salary: ₹ {job.salery}
                  </p>
                  <Link
                    to={{
                      pathname: `/jobs/${job._id}`,
                    }}
                    className="btn btn-primary"
                  >
                    View Details <FaChevronRight />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeaturedJobListings;
