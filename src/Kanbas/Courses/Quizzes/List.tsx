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
import * as courseClient from "../client";

// Define the Quiz type
interface Quiz {
  id: string;
  title: string;
  description: string;
  quizType: string;
  assignmentGroup: string;
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

  // sample quizzes
  const [quizzes, setQuizzes] = useState<any[]>([]);

  // Handler to add a new quiz
  const handleAddQuiz = () => {
    const newQuiz: Quiz = {
      id: (quizzes.length + 1).toString(),
      title: "New Quiz",
      description: "",
      quizType: "GRADED_QUIZ",
      assignmentGroup: "QUIZZES",
      shuffleAnswers: false,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: false,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestions: false,
      due: new Date("2020-01-01"),
      available: new Date("2020-01-01"),
      until: new Date("2020-01-01"),
      published: false,
      points: 0,
      numberOfQuestions: 0,
      score: isStudent ? 0 : undefined,
    };
    setQuizzes((prev) => [...prev, newQuiz]);
    //if we cannot get the api url work in the end we should consider using/passing local data
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz.id}/editor`);
  };

  const fetchQuizzes = async () => {
    const quizzes = await courseClient.findQuizzesForCourse(cid as string);
    setQuizzes(quizzes);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Handler to delete a quiz
  const handleDeleteQuiz = (id: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    }
  };

  // Handler to toggle publish status
  const handleTogglePublish = (id: string) => {
    setQuizzes((prev) =>
      prev.map((quiz) =>
        quiz.id === id ? { ...quiz, published: !quiz.published } : quiz
      )
    );
  };

  // naviagte to editor with the current quiz data, if we cannot get url api done then we should pass locally
  const handleEditQuiz = (id: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${id}/editor`);
  };

  // This is optional feature I haven't added any functions yet
  const handleCopyQuiz = (id: string) => {
    console.log("Copying quiz with id:", id);
  };

  // Handler for sorting quizzes
  const handleSortQuizzes = (criteria: string) => {
    let sortedQuizzes = [...quizzes];
    switch (criteria) {
      case "name":
        sortedQuizzes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "dueDate":
        sortedQuizzes.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
        break;
      case "availableDate":
        sortedQuizzes.sort(
          (a, b) =>
            new Date(a.availableDate).getTime() -
            new Date(b.availableDate).getTime()
        );
        break;
      default:
        break;
    }
    setQuizzes(sortedQuizzes);
  };

  // Function to determine availability status
  const getAvailabilityStatus = (quiz: Quiz): string => {
    const now = new Date();
    const availableDate = new Date(quiz.available);
    const untilDate = new Date(quiz.until);
    const dueDate = new Date(quiz.due);

    if (quiz.published) {
      if (now < availableDate) {
        return `Not available until ${availableDate.toLocaleDateString()}`;
      } else if (now >= availableDate && now <= untilDate) {
        return "Available";
      } else if (now > untilDate) {
        return "Closed";
      }
    }
    return "Unpublished";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quizzes</h2>
        <Button variant="success" onClick={handleAddQuiz}>
          <FaPlus className="me-2" />
          Add Quiz
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center">
          <p>
            No quizzes available. Click the "Add Quiz" button to create one.
          </p>
          <Button variant="primary" onClick={handleAddQuiz}>
            <FaPlus className="me-2" />
            Add Quiz
          </Button>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Publish</th>
              <th>Title</th>
              <th>Availability</th>
              <th>Due Date</th>
              <th>Points</th>
              <th>Questions</th>
              {isStudent && <th>Score</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td className="text-center">
                  <span
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => handleTogglePublish(quiz.id)}
                    title={quiz.published ? "Unpublish Quiz" : "Publish Quiz"}
                  >
                    {quiz.published ? (
                      <span role="img" aria-label="Published">
                        ✅
                      </span>
                    ) : (
                      <span role="img" aria-label="Unpublished">
                        🚫
                      </span>
                    )}
                  </span>
                </td>
                <td
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Editor`}>{quiz.title}</Link>
                </td>
                <td>{getAvailabilityStatus(quiz)}</td>
                <td>
                  {quiz.dueDate
                    ? new Date(quiz.due).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{quiz.points}</td>
                <td>{quiz.numberOfQuestions}</td>
                {isStudent && (
                  <td>{quiz.score !== undefined ? quiz.score : "N/A"}</td>
                )}
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="secondary" size="sm">
                      <FaEllipsisV />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEditQuiz(quiz.id)}>
                        <FaEdit className="me-2" />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteQuiz(quiz.id)}>
                        <FaTrash className="me-2" />
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleTogglePublish(quiz.id)}
                      >
                        {quiz.published ? (
                          <>
                            <span
                              role="img"
                              aria-label="Unpublish"
                              className="me-2"
                            >
                              🚫
                            </span>
                            Unpublish
                          </>
                        ) : (
                          <>
                            <span
                              role="img"
                              aria-label="Publish"
                              className="me-2"
                            >
                              ✅
                            </span>
                            Publish
                          </>
                        )}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleCopyQuiz(quiz.id)}>
                        <FaCopy className="me-2" />
                        Copy
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as="div">
                        <div className="d-flex align-items-center">
                          <FaSort className="me-2" />
                          Sort By:
                          <Button
                            variant="link"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleSortQuizzes("name")}
                          >
                            Name
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleSortQuizzes("dueDate")}
                          >
                            Due Date
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleSortQuizzes("availableDate")}
                          >
                            Available Date
                          </Button>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
