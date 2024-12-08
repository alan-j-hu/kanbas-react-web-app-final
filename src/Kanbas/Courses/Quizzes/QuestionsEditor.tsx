import React, { useState } from "react";
import MultipleChoiceEditor from "./QuestionTypes/MultipleChoiceEditor";
import TrueFalseEditor from "./QuestionTypes/TrueFalseEditor";
import FillInTheBlankEditor from "./QuestionTypes/FillInTheBlankEditor";

const QuestionsEditor = () => {
  const [currentQuestionType, setCurrentQuestionType] = useState<string | null>(
    null
  );

  const handleSaveQuestion = (data: any) => {
    //IMPLEMENT save the questions
    setCurrentQuestionType(null); // Close the editor after saving
  };

  const handleCancelQuestion = () => {
    //THIS IS FINE JUST GOING TO BACK
    setCurrentQuestionType(null); // Close the editor
  };

  return (
    <div className="container mt-4">
      <h1>Quiz Questions Editor</h1>
      {!currentQuestionType && (
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setCurrentQuestionType("MultipleChoice")}
          >
            New Multiple Choice Question
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setCurrentQuestionType("TrueFalse")}
          >
            New True/False Question
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentQuestionType("FillInTheBlank")}
          >
            New Fill in the Blank Question
          </button>
        </div>
      )}
      {currentQuestionType === "MultipleChoice" && (
        <MultipleChoiceEditor
          onSave={handleSaveQuestion}
          onCancel={handleCancelQuestion}
        />
      )}
      {currentQuestionType === "TrueFalse" && (
        <TrueFalseEditor
          onSave={handleSaveQuestion}
          onCancel={handleCancelQuestion}
        />
      )}
      {currentQuestionType === "FillInTheBlank" && (
        <FillInTheBlankEditor
          onSave={handleSaveQuestion}
          onCancel={handleCancelQuestion}
        />
      )}
    </div>
  );
};

export default QuestionsEditor;
