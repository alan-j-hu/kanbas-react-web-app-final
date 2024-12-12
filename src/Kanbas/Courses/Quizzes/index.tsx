import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import List from "./List";
import Editor from "./Editor";
import QuestionsEditor from "./QuestionsEditor";

export default function QuizzesIndex() {
  const { cid } = useParams(); // get course id
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:quizId/editor" element={<Editor />} />
      <Route path="/:quizId/questions" element={<QuestionsEditor />} />
    </Routes>
  );
}
