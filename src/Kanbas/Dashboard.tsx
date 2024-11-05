import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as db from "./Database";

export default function Dashboard(
{ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) {

  const fallback = "reactjs.jpg";

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = db.enrollments.filter(enrollment => enrollment.user = currentUser._id);

  const [allCourses, setAllCourses] = useState(false);

  function NewCourse() {
    return <>
      <h5>New Course
        <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse} > Add </button>
      </h5><br />
      <input defaultValue={course.name} className="form-control mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea defaultValue={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr />
    </>;
  }

  function ToggleAllCourses() {
    return <>
      <button aria-pressed={allCourses}
              className={`btn btn-primary ${allCourses ? "active" : ""} float-end`}
              onClick={() => setAllCourses(!allCourses)}>
        Show All Courses
      </button>
    </>;
  }

  function DeleteUpdate() {
    return <>
      <button onClick={(event) => {
                event.preventDefault();
                deleteCourse(course._id);
              }}
              className="btn btn-danger float-end"
              id="wd-delete-course-click">
        Delete
      </button>
      <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
        Update
      </button>
    </>;
  }

  function EnrollUnenroll({ course } : { course : any }) {
    const enrolled = enrollments.some((enrollment) => enrollment.course === course._id);
    return <button className={`btn ${enrolled ? "btn-danger" : "btn-success"} float-end`}>
      {enrolled ? "Unenroll" : "Enroll"}
    </button>
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" ? <NewCourse/> :
       currentUser.role === "STUDENT" ? <ToggleAllCourses/> :
       <></>}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course) =>
              allCourses || enrollments.some((enrollment) => enrollment.course === course._id))
            .map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={`/images/${course.image || fallback}`} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                      <button className="btn btn-primary"> Go </button>
                      {currentUser.role === "FACULTY" ? <DeleteUpdate/> :
                       currentUser.role === "STUDENT" ? <EnrollUnenroll course={course}/> :
                       <></>}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>);}
