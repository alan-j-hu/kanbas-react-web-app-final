import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findQuestionsForQuiz, findQuizById, submitAttempt, startNewAttempt } from "./client";

interface Question {
    _id: string;
    title: string;
    points: number;
    kind: "FillintheBlank" | "MultipleChoice" | "TrueFalse";
    questionText: string;
    options: string[];
    correctOption: string | boolean;
}

const trueFalseOptions = [
    { text: "True", value: true },
    { text: "False", value: false },
];

export default function QuizPreview(): JSX.Element {

    const navigate = useNavigate();
    const { quizId, cid: courseId } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [attemptId, setAttemptId] = useState<string | null>(null); // Store attempt ID to submit later
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizTitle, setQuizTitle] = useState<string>("Loading...");
    const [currentAnswers, setCurrentAnswers] = useState<{
        [key: string]: string | boolean;
    }>({});
    const [timeLeft, setTimeLeft] = useState<number>(1200); // Default to 20 minutes
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Restrict access to students
    useEffect(() => {
        if (!currentUser || currentUser.role !== "STUDENT") {
            alert("You are not authorized to access this page.");
            navigate("/login");
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        const fetchQuizData = async () => {
            console.log("Current User:", currentUser);
            console.log("Quiz ID:", quizId);

            if (!quizId || !courseId) {
                console.error("Missing quizId or courseId");
                return;
            }

            try {
                if (!attemptId) {
                    const attempts = await startNewAttempt(courseId, quizId);
                    console.log("New Attempt Created:", attempts);
                    setAttemptId(attempts._id);
                }

                const quiz = await findQuizById(quizId);
                console.log("Fetched Quiz Data:", quiz);

                setQuizTitle(quiz.title);
                setQuestions(quiz.questions || []);
            } catch (error) {
                console.error("Failed to load quiz data:", error);
                alert("Error loading quiz data. Please try again later.");
            }
        };

        fetchQuizData();
    }, [quizId, courseId, attemptId]);


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

    const handleSubmit = async () => {
        if (!attemptId) {
            alert("Attempt ID is missing. Cannot submit the quiz.");
            return;
        }

        const formattedAnswers = Object.entries(currentAnswers).map(([questionId, answer]) => ({
            question_id: questionId,
            answer: answer.toString(),
        }));

        try {
            const finalAttempt = await submitAttempt(attemptId, formattedAnswers);
            setScore(finalAttempt.score);
            setShowResults(true);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit the quiz. Please try again.");
        }
    };

    const renderQuestion = (question: Question): JSX.Element => {
        const { _id, title, questionText, kind, options } = question;

        switch (kind) {
            case "MultipleChoice":
                return (
                    <div key={_id} className="mb-4">
                        <h5>{title} ({question.points} points)</h5>
                        <p>{questionText}</p>
                        {options.map((option, index) => (
                            <div key={index} className="form-check">
                                <input
                                    type="radio"
                                    id={`${_id}-${index}`}
                                    name={_id}
                                    className="form-check-input"
                                    checked={currentAnswers[_id] === option}
                                    onChange={() => handleAnswerChange(_id, option)}
                                    disabled={showResults}
                                />
                                <label htmlFor={`${_id}-${index}`} className="form-check-label">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case "TrueFalse":
                return (
                    <div key={_id} className="mb-4">
                        <h5>{title} ({question.points} points)</h5>
                        <p>{questionText}</p>
                        {trueFalseOptions.map(({ text, value }) => (
                            <div key={`${_id}-${text}`} className="form-check">
                                <input
                                    type="radio"
                                    id={`${_id}-${text}`}
                                    name={_id}
                                    className="form-check-input"
                                    checked={currentAnswers[_id] === value}
                                    onChange={() => handleAnswerChange(_id, value)}
                                    disabled={showResults}
                                />
                                <label htmlFor={`${_id}-${text}`} className="form-check-label">
                                    {text}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case "FillintheBlank":
                return (
                    <div key={_id} className="mb-4">
                        <h5>{title} ({question.points} points)</h5>
                        <p>{questionText}</p>
                        <input
                            type="text"
                            id={`${_id}-answer`}
                            className="form-control"
                            value={currentAnswers[_id]?.toString() || ""}
                            onChange={(e) => handleAnswerChange(_id, e.target.value)}
                            disabled={showResults}
                        />
                    </div>
                );

            default:
                return (
                    <div key={_id} className="mb-4">
                        <h5>{title} ({question.points} points)</h5>
                        <p>{questionText}</p>
                        <p className="text-danger">Unsupported question type: {kind}</p>
                    </div>
                );
        }
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
        </div>
    );
}
