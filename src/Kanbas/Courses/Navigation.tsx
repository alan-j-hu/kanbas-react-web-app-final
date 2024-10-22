import { Link, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams();
  return (
    <div className="wd list-group fs-5 rounded-0">
      <Link to={`/Kanbas/Courses/${cid}/Home`} className="list-group-item active border border-0">Home</Link><br/>
      <Link to={`/Kanbas/Courses/${cid}/Modules`} className="list-group-item text-danger border border-0">Modules
        </Link><br/>
      <Link to={`/Kanbas/Courses/${cid}/Piazza`} className="list-group-item text-danger border border-0">Piazza</Link><br/>
      <Link to={`/Kanbas/Courses/${cid}/Zoom`} className="list-group-item text-danger border border-0">Zoom</Link><br/>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="list-group-item text-danger border border-0">
          Assignments</Link><br/>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes`} className="list-group-item text-danger border border-0">Quizzes</Link><br/>
      <Link to={`/Kanbas/Courses/${cid}/Grades`} className="list-group-item text-danger border border-0">Grades</Link><br/>
      <Link to={`/Kanbas/Courses/${cid}/People`} className="list-group-item text-danger border border-0">People</Link><br/>
    </div>
);}
