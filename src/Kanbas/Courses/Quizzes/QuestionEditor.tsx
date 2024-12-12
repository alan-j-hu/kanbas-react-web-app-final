import React, { useState } from "react";
import MultipleChoiceEditor from "./QuestionTypes/MultipleChoiceEditor";
import TrueFalseEditor from "./QuestionTypes/TrueFalseEditor";
import FillInTheBlankEditor from "./QuestionTypes/FillInTheBlankEditor";

const QuestionEditor = ({
  question,
  onChange,
  onDelete,
}: {
  question: any,
  onChange: (q: any) => void,
  onDelete: (q: any) => void
}) => {
  const [currentQuestionType, setCurrentQuestionType] = useState<string | null>(
    null
  );
  const [title, setTitle] = useState<string>(question.title || "");
  const [points, setPoints] = useState<number>(question.points || 0);
  const [kind, setKind] = useState<string>(question.kind || "MultipleChoice");
  const [choices, setChoices] = useState<any[]>(question.choices || []);
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(question.correctAnswer || true);
  const [correctAnswers, setCorrectAnswers] = useState<any[]>(question.correctAnswers || []);

  const newQuestion = () => {
    return {
      _id: question._id,
      title,
      points,
      kind,
      choices,
      correctAnswer,
      correctAnswers
    };
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
    onChange({...question, title: e.target.value});
  };

  const handlePointsChange = () => {
    onChange(newQuestion());
  };

  const onSelectChange = (e: any) => {
    setKind(e.target.value);
    onChange({...question, kind: e.target.value});
  };

  const onChoicesChange = (cs: any[]) => {
    setChoices(cs);
    onChange({...question, choices: cs});
  };

  function RenderMultipleChoice({
    choices,
    onChange
  }: {
    choices: any[],
    onChange: (cs: any[]) => void
  }) {

    function RenderChoice({
        choice,
        onDelete,
      }: {
        choice: any,
        onDelete: (id: string) => void,
      }) {
      const [text, setText] = useState<string>(choice.text);

      const handleTextChange = (e: any) => {
        setText(e.target.value);
        choice.text = e.target.value;
      };

      return (
        <div>
          Choice
          <input
            type="text"
            name="text"
            className="form-control"
            value={text}
            onChange={handleTextChange}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(choice._id)}
          >
            Delete Choice
          </button>
        </div>
      );
    }

    const onAddChoice = () => {
      const newChoice = {
        _id: new Date().getTime().toString(),
        text: "",
        is_correct: false
      };
      setChoices([...choices, newChoice]);
    };

    const onDeleteChoice = (cid: string) => {
      const newChoices = choices.filter((c: any) => c._id !== cid);
      setChoices(newChoices);
    };

    const onChoiceChange = (choice: any) => {
      const newChoices = choices.map((c: any) => {
        if (c._id === choice._id) {
          return choice;
        } else {
          return c;
        }
      });
      setChoices(newChoices);
    };

    return (
      <div>
        {choices.map((choice: any) =>
          RenderChoice({choice, onDelete: onDeleteChoice}))}

        <button
          type="button"
          className="btn btn-info"
          onClick={onAddChoice}
        >
          Add Choice
        </button>
      </div>
    );
  }

  function RenderTrueFalse({correctAnswer}: {correctAnswer: boolean}) {
    return (
      <div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="true-false" id="answer-true" value="true" checked={correctAnswer}/>
          <label className="form-check-label" htmlFor="answer-true">
            True
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="true-false" id="answer-false" value="false" checked={!correctAnswer}/>
          <label className="form-check-label" htmlFor="answer-false">
            False
          </label>
        </div>
      </div>
    );
  }

  function RenderFillInTheBlank({correctAnswers}: {correctAnswers: any[]}) {
    function RenderBlank({
        blank,
      }: {
        blank: any,
      }) {
      const [text, setText] = useState<string>(blank.text);

      const handleTextChange = (e: any) => {
        setText(e.target.value);
        blank.text = e.target.value;
      };

      const onDelete = (cid: string) => {
        const newCorrectAnswers = correctAnswers.filter((c: any) => c._id !== cid);
        setCorrectAnswers(newCorrectAnswers);
      };

      return (
        <div>
          Blank
          <input
            type="text"
            name="text"
            className="form-control"
            value={text}
            onChange={handleTextChange}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(blank._id)}
          >
            Delete Blank
          </button>
        </div>
      );
    }

    const onAddBlank = () => {
      const newBlank = {
        _id: new Date().getTime().toString(),
        text: "",
        isCaseSensitive: false
      };
      setCorrectAnswers([...correctAnswers, newBlank]);
    };

    return (
      <div>
        {correctAnswers.map((answer: any) => {
          return RenderBlank({blank: answer});
        })}
        <button
          type="button"
          className="btn btn-info"
          onClick={onAddBlank}
        >
          Add Blank
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4 border">
      <form>
        <div className="form-row align-items-center">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>

        <div className="form-row align-items-center">
          <div className="col-auto my-1">
            <div className="input-group mb-3 w-25">
              <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Preference</label>
              <select className="custom-select mr-sm-2" id="inlineFormCustomSelect"
                      onChange={onSelectChange} value={kind}>
                <option value="MultipleChoice" selected>Multiple Choice</option>
                <option value="TrueFalse">True/False</option>
                <option value="FillInTheBlank">Fill In The Blank</option>
              </select>
            </div>
          </div>

          <div className="col-auto my-1">
            <div className="input-group mb-3 w-25">
              <label htmlFor="points" className="form-label">
                Points
              </label>
              <input
                type="number"
                id="points"
                name="points"
                className="form-control sm-3"
                value={points}
                onChange={handlePointsChange}
              />
            </div>
          </div>
        </div>

        { kind === "MultipleChoice" ? <RenderMultipleChoice choices={choices} onChange={onChoicesChange}/>
        : kind === "TrueFalse" ? <RenderTrueFalse correctAnswer={correctAnswer}/>
        : <RenderFillInTheBlank correctAnswers={correctAnswers}/>}
      </form>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDelete(question._id)}
      >
        Delete Question
      </button>
    </div>
  );
};

export default QuestionEditor;
