import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Home.css";

const AdminPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://quiz-app-vca2.onrender.com/api/quizzes/all")
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteQuiz = (quizId) => {
    // Display a confirmation dialog before proceeding with deletion
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!shouldDelete) {
      // User canceled deletion
      return;
    }

    // Implement the logic to delete the quiz by quizId
    axios
      .delete(`https://quiz-app-vca2.onrender.com/api/quizzes/${quizId}`)
      .then((response) => {
        // Update the state to reflect the changes
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== quizId)
        );
        alert("Quiz deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting quiz:", error);
        alert("Error deleting quiz. Please try again later.");
      });
  };

  return (
    <Container className="margin-top">
      <h2>Welcome to the Admin Panel</h2>
      <Row className="mt-4">
        <Col>
          <h4>Manage Quizzes</h4>
          <Link to="/quizzes" className="btn btn-primary space">
            View Quizzes
          </Link>
          <Link to="/create" className="btn btn-success ml-2">
            Create Quiz
          </Link>
        </Col>
      </Row>

      <div className="container margin-top">
        <h2 className="mb-4">Quizzes Dashboard</h2>

        {loading ? (
          // Loading card
          <div className="card p-4">
            <h3>Loading...</h3>
            <div className="d-flex justify-content-center">
              {/* <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> */}
              <div className="loader">
                <div className="infinity"></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Quiz ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz._id}>
                    <th scope="row">{quiz._id}</th>
                    <td>{quiz.title}</td>
                    <td>{quiz.description}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteQuiz(quiz._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminPage;
