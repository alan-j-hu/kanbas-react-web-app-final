import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setEnrollments } from "./Enrollments/reducer"
import * as client from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentsClient from "./Enrollments/client";

export default function Dashboard(
{ course, setCourse, addNewCourse,
  deleteCourse, updateCourse, }: {
  course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();

  const fallback = "reactjs.jpg";

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      const allCourses = await client.fetchAllCourses();
      setCourses(courses);
      setAllCourses(allCourses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser, enrollments]);

  const fetchEnrollments = async () => {
    try {
      const enrollments = await enrollmentsClient.getEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEnrollments();
  }, [currentUser]);

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
      <button aria-pressed={showAllCourses}
              className={`btn btn-primary ${showAllCourses ? "active" : ""} float-end`}
              onClick={() => setShowAllCourses(!showAllCourses)}>
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

  function EnrollUnenroll({ course, enrollments } : { course: any, enrollments: any[] }) {
    const isEnrolled = enrollments.some((e: any) => e.course === course._id && e.user === currentUser._id);

    const action = async () => {
      if (isEnrolled) {
        await enrollmentsClient.unenroll(course._id);
        await fetchEnrollments();
      } else {
        await enrollmentsClient.enroll(course._id);
        await fetchEnrollments();
      }
    };

    return <button className={`btn ${isEnrolled ? "btn-danger" : "btn-success"} float-end`}
                   onClick={async (event) => {
                     event.preventDefault();
                     await action();
                   }}>
      {isEnrolled ? "Unenroll" : "Enroll"}
    </button>
  }

  const coursesToShow = showAllCourses ? allCourses : courses;
  console.log(coursesToShow);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" ? <NewCourse/> :
       currentUser.role === "STUDENT" ? <ToggleAllCourses/> :
       <></>}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {coursesToShow
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
                       currentUser.role === "STUDENT" ? <EnrollUnenroll key={course._id} course={course} enrollments={enrollments}/> :
                       <></>}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>);}
