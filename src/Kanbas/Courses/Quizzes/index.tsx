import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import List from "./List";
import QuestionsEditor from "./QuestionsEditor";
import QuizPreview from "./Preview";

export default function QuizzesIndex() {
  const { cid } = useParams(); // get course id
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:quizId/questions" element={<QuestionsEditor />} />
      <Route path="/:quizId/preview" element={<QuizPreview />} />
    </Routes>
  );
}
