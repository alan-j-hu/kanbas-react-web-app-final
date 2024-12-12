import { useEffect, useState } from "react";
import Editor from "./Editor";
import * as quizClient from "./client";

const EditNew = () => {
  const quiz = {
    _id: new Date().getTime().toString(),
    title: "New Quiz",
    description: "Description",
    quizType: "GradedQuiz",
    assignmentGroup: "QUIZZES",
    shuffleAnswers: false,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestions: false,
    due: new Date("2020-01-01"),
    available: new Date("2020-01-01"),
    until: new Date("2020-01-01"),
    published: false,
    points: 0,
    questions: [],
  };
  return <Editor quiz={quiz}/>;
};

export default EditNew;
