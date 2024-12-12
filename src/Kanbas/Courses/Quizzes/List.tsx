import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaEllipsisV,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCopy,
  FaSort,
} from "react-icons/fa";
import { Button, Dropdown, Table } from "react-bootstrap";
import {
  findQuizzesForStudent,
  findQuizzesForCourse,
  startNewAttempt,
} from "./client";
import * as courseClient from "../client";

interface Quiz {
  id: string;
  title: string;
  description: string;
  quizType: string;
  assignmentGroup?: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestions: boolean;
  due: Date;
  available: Date;
  until: Date;
  published: boolean;
  points: number;
  numberOfQuestions: number;
  score?: number; // Only for students
}

interface ListProps {
  isStudent?: boolean;
}

const List: React.FC<ListProps> = ({ isStudent = false }) => {
  const { cid } = useParams<{ cid: string }>();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async () => {
    try {
      const quizzes = await courseClient.findQuizzesForCourse(cid as string);
      console.log("Fetched quizzes:", quizzes);

      // Map _id to id
      const mappedQuizzes = quizzes.map((quiz: any) => ({
        ...quiz,
        id: quiz._id,
      }));

      console.log("Mapped quizzes with id:", mappedQuizzes); // Log mapped quizzes
      setQuizzes(mappedQuizzes); // Set quizzes
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };


  useEffect(() => {
    fetchQuizzes();
  }, []);


  const handleAddQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
  };

  const handleDeleteQuiz = (id: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    }
  };

  const handleTogglePublish = (id: string) => {
    setQuizzes((prev) =>
      prev.map((quiz) =>
        quiz.id === id ? { ...quiz, published: !quiz.published } : quiz
      )
    );
  };

  const handleEditQuiz = (id: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${id}/editor`);
  };

  const handleStartQuiz = async (id: string) => {
    try {
      const attempt = await startNewAttempt(cid as string, id);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${id}/attempt/${attempt.id}`);
    } catch (error) {
      console.error("Error starting quiz attempt:", error);
      alert("Failed to start quiz. Please try again.");
    }
  };

  const handleSortQuizzes = (criteria: string) => {
    const sorted = [...quizzes];
    if (criteria === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "dueDate") {
      sorted.sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
    }
    setQuizzes(sorted);
  };

  const getAvailabilityStatus = (quiz: Quiz): string => {
    const now = new Date();
    const availableDate = new Date(quiz.available);
    const untilDate = new Date(quiz.until);

    if (quiz.published) {
      if (now < availableDate) {
        return `Not available until ${availableDate.toLocaleString()}`;
      }
      if (now > untilDate) {
        return "Closed";
      }
      return "Available";
    }
    return "Unpublished";
  };

  return (
    <div className="container mt-4">
      <h2>{isStudent ? "Available Quizzes" : "Quizzes"}</h2>
      {!isStudent && (
        <Button variant="primary" onClick={handleAddQuiz} className="mb-3">
          <FaPlus className="me-2" /> Add Quiz
        </Button>
      )}
      {quizzes.length === 0 ? (
        <div className="text-center">
          <p>No quizzes available.</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Points</th>
              {isStudent && <th>Score</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>
                  <span
                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                    onClick={() => {
                      console.log(`Navigating to /Kanbas/Courses/${cid}/Quizzes/${quiz.id}/Preview`);
                      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz.id}/Preview`);
                    }}
                  >
                    {quiz.title}
                  </span>
                </td>
                <td>{getAvailabilityStatus(quiz)}</td>
                <td>{quiz.due ? new Date(quiz.due).toLocaleDateString() : "N/A"}</td>
                <td>{quiz.points}</td>
                {isStudent && <td>{quiz.score ?? "N/A"}</td>}
                <td>
                  {isStudent ? null : (
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="secondary" size="sm">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEditQuiz(quiz.id)}>
                          <FaEdit className="me-2" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteQuiz(quiz.id)}>
                          <FaTrash className="me-2" /> Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleTogglePublish(quiz.id)}>
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default List;