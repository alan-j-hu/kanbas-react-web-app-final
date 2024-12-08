import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import List from "./List";
import Details from "./Details";
import Editor from "./Editor";
import QuestionsEditor from "./QuestionsEditor";
import Preview from "./Preview";

export default function QuizzesIndex() {
  const { cid } = useParams(); // get course id
  return (
    <Routes>
      <Route path="/" element={<List courseId={cid!} />} />
      <Route path=":quizId" element={<Details />} />
      <Route path=":quizId/editor" element={<Editor />} />
      <Route path=":quizId/questions" element={<QuestionsEditor />} />
      <Route path=":quizId/preview" element={<Preview />} />
    </Routes>
  );
}
