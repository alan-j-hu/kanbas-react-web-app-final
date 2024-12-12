import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import QuestionEditor from "./QuestionEditor";
import * as quizClient from "./client"
import * as courseClient from "../client"
import { useDispatch } from "react-redux";
const QuizEditor = ({quiz}: {quiz: any}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>(quiz.title);
  const [description, setDescription] = useState<string>(quiz.description);
  const [quizType, setQuizType] = useState<string>(quiz.quizType);
  const [assignmentGroup, setAssignmentGroup] = useState<string>(quiz.assignmentGroup);
  const [shuffleAnswers, setShuffleAnswers] = useState<boolean>(quiz.shuffleAnswers);
  const [timeLimit, setTimeLimit] = useState<number>(quiz.timeLimit);
  const [multipleAttempts, setMultipleAttempts] = useState<boolean>(quiz.multipleAttempts);
  const [maxAttempts, setMaxAttempts] = useState<number>(quiz.maxAttempts);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<String>(quiz.showCorrectAnswers);
  const [accessCode, setAccessCode] = useState<string>(quiz.accessCode);
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState<boolean>(quiz.oneQuestionAtATime);
  const [webcamRequired, setWebcamRequired] = useState<boolean>(quiz.webcamRequired);
  const [lockQuestions, setLockQuestions] = useState<boolean>(quiz.lockQuestions);
  const [due, setDue] = useState<Date>(quiz.due);
  const [available, setAvailable] = useState<Date>(quiz.available);
  const [until, setUntil] = useState<Date>(quiz.until);
  const [published, setPublished] = useState<boolean>(quiz.published);
  const [points, setPoints] = useState<number>(quiz.points);
  const [questions, setQuestions] = useState<any[]>(quiz.questions);

  const availableRef = useRef<HTMLInputElement>(null);
  const dueRef = useRef<HTMLInputElement>(null);
  const untilRef = useRef<HTMLInputElement>(null);

  const { cid } = useParams<{ cid: string }>();

  useEffect(() => {
    const formatDateTime = (date: Date) => {
      if (!date) return "";
      const isoString = date.toISOString();
      return isoString.slice(0, 16); 
    };
  
    if (availableRef.current) {
      availableRef.current.value = formatDateTime(available);
    }
    if (dueRef.current) {
      dueRef.current.value = formatDateTime(due);
    }
    if (untilRef.current) {
      untilRef.current.value = formatDateTime(until);
    }
  }, [available, due, until]);

  type Quiz = {
    "title": String,
    "description": String,
    "quizType": String,
    "assignmentGroup": String,
    "shuffleAnswers": Boolean,
    "timeLimit": number,
    "multipleAttempts": Boolean,
    "maxAttempts": number,
    "showCorrectAnswers": String,
    "accessCode": String,
    "oneQuestionAtATime": Boolean,
    "webcamRequired": Boolean,
    "lockQuestions": Boolean,
    "due": Date,
    "until": Date,
    "available": Date,
    "published": Boolean,
    "points": number,
    "questions": any[],
    "courseId": String,
  }

  //const dispatch=useDispatch();

  var update = async (quiz : Quiz) => {
    console.log(quiz)
    await quizClient.updateQuiz(quiz);
   // dispatch(updateQuiz(quiz));
  };

  const handleInputChange = () => {};
  const handleSaveAndPublish = () => {};
  const handleSave = async () => {
    if (cid !== undefined) {
      // Create a copy of the quiz object and remove `_id`
      const { _id, ...quizWithoutId } = quiz;
  
      await courseClient.createQuizForCourse(cid, quizWithoutId);
    }
  
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
     // await update({
    //   ...quiz,
    //   title,
    //   description,
    //   quizType,
    //   assignmentGroup,
    //   shuffleAnswers,
    //   timeLimit,
    //   multipleAttempts,
    //   maxAttempts,
    //   showCorrectAnswers,
    //   accessCode,
    //   oneQuestionAtATime,
    //   webcamRequired,
    //   lockQuestions,
    //   due,
    //   until,
    //   available,
    //   published,
    //   points,
    //   questions,
    // });
  const handleCancel = () => {
    navigate(-1);
  };

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
                value={title}
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
                value={description}
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
                value={quizType}
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
                value={assignmentGroup}
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
                checked={shuffleAnswers}
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
                value={timeLimit}
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
                checked={multipleAttempts}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="multipleAttempts">
                Allow Multiple Attempts
              </label>
            </div>

            {/* Attempts Allowed */}
            {quiz.multipleAttempts && (
              <div className="mb-3">
                <label htmlFor="attemptsAllowed" className="form-label">
                  How Many Attempts
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="attemptsAllowed"
                  name="attemptsAllowed"
                  value={maxAttempts}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Other Options */}
            <div className="mb-3">
            <label htmlFor="showCorrectAnswers" className="form-label">
                Show Correct Answers
              </label>
              <select
              
                className="form-select"
                id="showCorrectAnswers"
                name="showCorrectAnswers"
                onChange={handleInputChange}>
             
                <option value="Never">Never</option>
                <option value="AfterDueDate">After Due Date</option>
                <option value="Immediately">Immediately</option>
                </select>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="oneQuestionAtATime"
                name="oneQuestionAtATime"
                checked={oneQuestionAtATime}
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
                checked={quiz.webcamRequired}
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
                checked={lockQuestions}
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
                ref={dueRef}
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
                ref={availableRef}
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
                ref={untilRef}
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
