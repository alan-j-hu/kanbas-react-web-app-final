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
  const [title, setTitle] = useState<string>(question.title);
  const [points, setPoints] = useState<number>(question.points);
  const [kind, setKind] = useState<string>(question.kind);
  const [choices, setChoices] = useState<any[]>(question.choices);
  const [correct_answer, setCorrect_answer] = useState<boolean>(question.correct_answer);
  const [correct_answers, setCorrect_answers] = useState<any[]>(question.correct_answers);

  const newQuestion = () => {
    return {
      _id: question._id,
      title,
      points,
      kind,
      choices,
      correct_answer,
      correct_answers
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

  function RenderTrueFalse() {
    return (
      <div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="true-false" id="answer-true" value="true" checked/>
          <label className="form-check-label" htmlFor="answer-true">
            True
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="true-false" id="answer-false" value="false"/>
          <label className="form-check-label" htmlFor="answer-false">
            False
          </label>
        </div>
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
        : kind === "TrueFalse" ? <RenderTrueFalse/>
        : "FillInTheBlank"}
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
