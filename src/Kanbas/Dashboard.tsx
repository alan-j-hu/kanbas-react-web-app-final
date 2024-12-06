import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setEnrollments } from "./Enrollments/reducer"
import * as client from "./Courses/client";
import * as userClient from "./Account/client";

export default function Dashboard(
{ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void
}) {
  const dispatch = useDispatch();

  const fallback = "reactjs.jpg";

  const { currentUser } = useSelector((state: any) => state.accountReducer);

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


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" ? <NewCourse/> : <></>}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .map((course: any) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={`/images/${course.image || fallback}`} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {enrolling && (
                           <button onClick={(event) => {
                                     event.preventDefault();
                                     updateEnrollment(course._id, !course.enrolled);
                                    }}
                                    className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                             {course.enrolled ? "Unenroll" : "Enroll"}
                           </button>
                         )}
                         {course.name}
                      </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                      <button className="btn btn-primary"> Go </button>
                      {currentUser.role === "FACULTY" ? <DeleteUpdate/> : <></>}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>);}
