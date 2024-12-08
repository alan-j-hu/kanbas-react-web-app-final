import React, { useState } from "react";

const FillInTheBlankEditor = ({
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
    correctAnswers: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleCorrectAnswerChange = (index: number, value: string) => {
    setQuestion((prev) => {
      const updatedAnswers = [...prev.correctAnswers];
      updatedAnswers[index] = value;
      return { ...prev, correctAnswers: updatedAnswers };
    });
  };

  const handleAddAnswer = () => {
    setQuestion((prev) => ({
      ...prev,
      correctAnswers: [...prev.correctAnswers, ""],
    }));
  };

  const handleRemoveAnswer = (index: number) => {
    setQuestion((prev) => {
      const updatedAnswers = prev.correctAnswers.filter(
        (_, i) => i !== index
      );
      return { ...prev, correctAnswers: updatedAnswers };
    });
  };

  return (
    <div>
      <h3>Fill in the Blank Editor</h3>
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
      <h4>Correct Answers</h4>
      {question.correctAnswers.map((answer, index) => (
        <div className="input-group mb-2" key={index}>
          <input
            type="text"
            className="form-control"
            placeholder={`Answer ${index + 1}`}
            value={answer}
            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleRemoveAnswer(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={handleAddAnswer}
      >
        Add Answer
      </button>
      <div>
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

export default FillInTheBlankEditor;
