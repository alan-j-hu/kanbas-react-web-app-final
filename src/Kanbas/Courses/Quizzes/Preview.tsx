import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findQuestionsForQuiz, findQuizById } from "../client"; // Example API functions
import { FaPencilAlt } from "react-icons/fa";

interface Question {
    _id: string;
    title: string;
    points: number;
    type: "Fill in the Blank" | "Multiple Choice" | "True/False";
    questionText: string;
    options: string[];
    correctOption: string | boolean;
}

const trueFalseOptions = [
    { text: "True", value: true },
    { text: "False", value: false },
];

export default function QuizPreview() {
    const navigate = useNavigate();
    const { quizId } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizTitle, setQuizTitle] = useState<string>("Loading...");
    const [currentAnswers, setCurrentAnswers] = useState<{
        [key: string]: string | boolean;
    }>({});
    const [timeLeft, setTimeLeft] = useState<number>(1200); // 20 minutes
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Fetch quiz details and questions
        const fetchQuizData = async () => {
            try {
                if (quizId) {
                    const quiz = await findQuizById(quizId);
                    setQuizTitle(quiz.title);

                    const questionList = await findQuestionsForQuiz(quizId);
                    setQuestions(
                        questionList.map((q: any) => ({
                            _id: q._id,
                            title: q.title,
                            points: q.points,
                            type: q.type,
                            questionText: q.questionText,
                            options: q.options,
                            correctOption: q.correctOption,
                        }))
                    );
                }
            } catch (error) {
                console.error("Failed to load quiz data:", error);
                alert("Error loading quiz data. Please try again later.");
            }
        };
        fetchQuizData();
    }, [quizId]);

    useEffect(() => {
        if (timeLeft > 0 && !showResults) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft, showResults]);

    const handleAnswerChange = (questionId: string, answer: string | boolean) => {
        setCurrentAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const calculateScore = () => {
        return questions.reduce((total, question) => {
            const userAnswer = currentAnswers[question._id];
            if (userAnswer === question.correctOption) {
                total += question.points;
            }
            return total;
        }, 0);
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setShowResults(true);
    };

    const renderQuestion = (question: Question) => {
        const { _id, title, questionText, type, options } = question;

        return (
            <div key={_id} className="mb-4">
                <h5>{title} ({question.points} points)</h5>
                <p>{questionText}</p>
                {type === "Multiple Choice" && (
                    options.map((option, index) => (
                        <div key={index} className="form-check">
                            <input
                                type="radio"
                                id={`${_id}-${index}`}
                                name={_id}
                                className="form-check-input"
                                aria-label={`Option ${option}`}
                                checked={currentAnswers[_id] === option}
                                onChange={() => handleAnswerChange(_id, option)}
                                disabled={showResults}
                            />
                            <label htmlFor={`${_id}-${index}`} className="form-check-label">
                                {option}
                            </label>
                        </div>
                    ))
                )}

                {type === "True/False" && (
                    trueFalseOptions.map(({ text, value }) => (
                        <div key={`${_id}-${text}`} className="form-check">
                            <input
                                type="radio"
                                id={`${_id}-${text}`}
                                name={_id}
                                className="form-check-input"
                                aria-label={text}
                                checked={currentAnswers[_id] === value}
                                onChange={() => handleAnswerChange(_id, value)}
                                disabled={showResults}
                            />
                            <label htmlFor={`${_id}-${text}`} className="form-check-label">
                                {text}
                            </label>
                        </div>
                    ))
                )}

                {type === "Fill in the Blank" && (
                    <input
                        type="text"
                        id={`${_id}-answer`}
                        className="form-control"
                        aria-label="Fill in the blank answer"
                        value={currentAnswers[_id]?.toString() || ""}
                        onChange={(e) => handleAnswerChange(_id, e.target.value)}
                        disabled={showResults}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="container mt-4">
            <div className="card mb-4 bg-light">
                <div className="card-body">
                    <h2>{quizTitle}</h2>
                    <p>Started: {new Date().toLocaleString()}</p>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Quiz Questions</h3>
                <div>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</div>
            </div>

            {questions.map(renderQuestion)}

            {!showResults ? (
                <button className="btn btn-primary mt-4" onClick={handleSubmit}>
                    Submit Quiz
                </button>
            ) : (
                <div className="card mt-4">
                    <div className="card-body">
                        <h4>Quiz Results</h4>
                        <p>Your Score: {score}</p>
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                            Return to Quiz List
                        </button>
                    </div>
                </div>
            )}

            <div className="card mt-4 bg-light">
                <div className="card-body">
                    <FaPencilAlt className="me-2" />
                    <button
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => navigate(`/edit-quiz/${quizId}`)}
                    >
                        Keep Editing this Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
