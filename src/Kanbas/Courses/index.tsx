import { FaAlignJustify } from "react-icons/fa6";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import PeopleTable from "./People/Table";
import EditExisting from "./Quizzes/EditExisting";
import EditNew from "./Quizzes/EditNew";
import QuizList from "./Quizzes/List";
import QuizPreview from "./Quizzes/Preview";
import { Routes, Route, Navigate, useParams } from "react-router";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/Editor" element={<AssignmentEditor />} />
            <Route
              path="Assignments/:aid/Editor"
              element={<AssignmentEditor />}
            />
            <Route path="Quizzes" element={<QuizList />} />
            <Route path="Quizzes/Editor" element={<EditNew />} />
            <Route path="Quizzes/:qid/Editor" element={<EditExisting />} />
            <Route
              path="Quizzes/:quizId/Preview"
              element={<QuizPreview />}
            />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
