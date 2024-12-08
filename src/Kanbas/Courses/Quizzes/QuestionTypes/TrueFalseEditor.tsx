import React, { useState } from "react";

const TrueFalseEditor = ({
  onSave,
  onCancel,
}: {
  onSave: (data: any) => void;
  onCancel: () => void;
}) => {
  const [question, setQuestion] = useState({
    title: "",
    points: 0,
    questionText: "",
    correctAnswer: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleCorrectAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion((prev) => ({
      ...prev,
      correctAnswer: e.target.value === "true",
    }));
  };

  return (
    <div>
      <h3>True/False Editor</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={question.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="points" className="form-label">
          Points
        </label>
        <input
          type="number"
          id="points"
          name="points"
          className="form-control"
          value={question.points}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="questionText" className="form-label">
          Question
        </label>
        <textarea
          id="questionText"
          name="questionText"
          className="form-control"
          value={question.questionText}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="correctAnswer"
          id="true"
          value="true"
          checked={question.correctAnswer === true}
          onChange={handleCorrectAnswerChange}
        />
        <label className="form-check-label" htmlFor="true">
          True
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="correctAnswer"
          id="false"
          value="false"
          checked={question.correctAnswer === false}
          onChange={handleCorrectAnswerChange}
        />
        <label className="form-check-label" htmlFor="false">
          False
        </label>
      </div>
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={() => onSave(question)}
        >
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TrueFalseEditor;
