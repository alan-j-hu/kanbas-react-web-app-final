import { useEffect, useState } from "react";
import Editor from "./Editor";
import * as quizClient from "./client";
import { useParams } from "react-router";

const EditNew = () => {
  const { cid } = useParams<{ cid: string }>(); // Move useParams inside the component

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
    showCorrectAnswers: "Never",
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
    courseId: cid, 
  };

  return <Editor quiz={quiz} />;
};

export default EditNew;
