import React, { useState } from "react";
import QuestionEditor from "./QuestionEditor";

const QuizEditor = () => {
  //sample data
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
    quizType: "GRADED_QUIZ",
    assignmentGroup: "QUIZZES",
    shuffleAnswers: false,
    timeLimit: 20,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestions: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
  });

  // form update event handler
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setQuizDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox",
    }));
  };

  // INCOMPLETE NEED TO ADD API CALL TO SAVE QUIZ
  const handleSave = () => {
    console.log("Quiz saved:", quizDetails);
  };
  // INCOMPLETE NEED TO ADD API CALL TO SAVE AND PUBLISH QUIZ
  const handleSaveAndPublish = () => {
    console.log("Quiz saved and published:", quizDetails);
  };

  // INCOMPLETE NEED TO ADD API CALL TO CANCEL (GO BACK TO QUIZ LIST)
  const handleCancel = () => {
    console.log("Edit canceled.");
  };

  const [questions, setQuestions] = useState<any[]>([]);

  // WE WILL NEED TO REPLACE THIS NAVIGATION LINK METHOD TO API CALL METHODS
  // PASSING IN QUIZ ID
  const handleNewQuestion = () => {
    const newQuestion = {
      _id: new Date().getTime().toString(),
      title: "",
      points: 0,
      question: "",
      kind: "MultipleChoice",
      choices: [],
      correct_answer: true,
      correct_answers: []
    };
    setQuestions([...questions, newQuestion]);
  };

  const onQuestionChange = (question: any) => {
    const newQuestions = questions.map((q: any) => {
      if (q._id === question._id) {
        return question;
      } else {
        return q;
      }
    });
    setQuestions(newQuestions);
  };

  const onQuestionDelete = (qid: string) => {
    const newQuestions = questions.filter((q: any) => (
      qid !== q._id
    ));
    setQuestions(newQuestions);
  }

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#quiz-details"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true">Details</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#quiz-questions"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false">Questions</button>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane show active" id="quiz-details">
          <h1>Quiz Editor</h1>
          <form>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={quizDetails.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={quizDetails.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Quiz Type */}
            <div className="mb-3">
              <label htmlFor="quizType" className="form-label">
                Quiz Type
              </label>
              <select
                className="form-select"
                id="quizType"
                name="quizType"
                value={quizDetails.quizType}
                onChange={handleInputChange}
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="PRACTICE_SURVEY">Practice Survey</option>
              </select>
            </div>

            {/* Assignment Group */}
            <div className="mb-3">
              <label htmlFor="assignmentGroup" className="form-label">
                Assignment Group
              </label>
              <select
                className="form-select"
                id="assignmentGroup"
                name="assignmentGroup"
                value={quizDetails.assignmentGroup}
                onChange={handleInputChange}
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>

            {/* Shuffle Answers */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="shuffleAnswers"
                name="shuffleAnswers"
                checked={quizDetails.shuffleAnswers}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="shuffleAnswers">
                Shuffle Answers
              </label>
            </div>

            {/* Time Limit */}
            <div className="mb-3">
              <label htmlFor="timeLimit" className="form-label">
                Time Limit (Minutes)
              </label>
              <input
                type="number"
                className="form-control"
                id="timeLimit"
                name="timeLimit"
                value={quizDetails.timeLimit}
                onChange={handleInputChange}
              />
            </div>

            {/* Multiple Attempts */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="multipleAttempts"
                name="multipleAttempts"
                checked={quizDetails.multipleAttempts}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="multipleAttempts">
                Allow Multiple Attempts
              </label>
            </div>

            {/* Attempts Allowed */}
            {quizDetails.multipleAttempts && (
              <div className="mb-3">
                <label htmlFor="attemptsAllowed" className="form-label">
                  How Many Attempts
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="attemptsAllowed"
                  name="attemptsAllowed"
                  value={quizDetails.attemptsAllowed}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Other Options */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="showCorrectAnswers"
                name="showCorrectAnswers"
                checked={quizDetails.showCorrectAnswers}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="showCorrectAnswers">
                Show Correct Answers
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="oneQuestionAtATime"
                name="oneQuestionAtATime"
                checked={quizDetails.oneQuestionAtATime}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="oneQuestionAtATime">
                One Question at a Time
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="webcamRequired"
                name="webcamRequired"
                checked={quizDetails.webcamRequired}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="webcamRequired">
                Webcam Required
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="lockQuestions"
                name="lockQuestions"
                checked={quizDetails.lockQuestions}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="lockQuestions">
                Lock Questions After Answering
              </label>
            </div>

            {/* Dates */}
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="dueDate"
                name="dueDate"
                value={quizDetails.dueDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="availableDate" className="form-label">
                Available Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="availableDate"
                name="availableDate"
                value={quizDetails.availableDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="untilDate" className="form-label">
                Until Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="untilDate"
                name="untilDate"
                value={quizDetails.untilDate}
                onChange={handleInputChange}
              />
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSaveAndPublish}
              >
                Save and Publish
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>


        <div className="tab-pane" id="quiz-questions">
          <h1>Questions</h1>

          <div>
          {questions.map((question: any) => (
            <QuestionEditor key={question._id} question={question} onChange={onQuestionChange} onDelete={onQuestionDelete}/>
          ))}
          </div>

          <button
            type="button"
            className="btn btn-info"
            onClick={handleNewQuestion}
          >
            New Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
