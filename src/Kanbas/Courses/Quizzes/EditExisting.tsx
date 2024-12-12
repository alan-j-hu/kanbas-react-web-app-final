import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Editor from "./Editor";
import * as quizClient from "./client";

const EditExisting = () => {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    const quiz = await quizClient.findQuizById(qid as string);
    setQuiz(quiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  if (quiz === null) {
    return <></>;
  }
  return <Editor quiz={quiz}/>;
};

export default EditExisting;
