import React, { useState } from "react";

const MultipleChoiceEditor = ({
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
    choices: [{ text: "", correct: false }],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleChoiceChange = (index: number, value: string) => {};

  const handleCorrectChoiceChange = (index: number) => {};

  const handleAddChoice = () => {};

  const handleRemoveChoice = (index: number) => {};

  return (
    <div>
      <h3>Multiple Choice Editor</h3>
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
      <h4>Choices</h4>
      {question.choices.map((choice, index) => (
        <div className="input-group mb-2" key={index}>
          <input
            type="text"
            className="form-control"
            placeholder={`Choice ${index + 1}`}
            value={choice.text}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
          />
          <button
            type="button"
            className={`btn ${
              choice.correct ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => handleCorrectChoiceChange(index)}
          >
            Correct
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleRemoveChoice(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={handleAddChoice}
      >
        Add Choice
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

export default MultipleChoiceEditor;
