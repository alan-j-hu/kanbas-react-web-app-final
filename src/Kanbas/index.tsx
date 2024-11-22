import { Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Account from "./Account";
import Session from "./Account/Session";
import ProtectedRoute from "./Account/ProtectedRoute";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import './styles.css';
import * as db from "./Database";
import { enroll, unenroll } from "./Enrollments/reducer"
import { useState, useEffect } from "react";

import * as client from "./Courses/client";
import * as userClient from "./Account/client";

export default function Kanbas() {
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const [courses, setCourses] = useState<any[]>(db.courses);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);


  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
  };
  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const testEnrollment = (currentUser: any, params: any) => {
    const { cid } = params;
    return enrollments.some((enrollment: any) => enrollment.course === cid);
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute fallback="/Kanbas/Account/Signin">
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}/>
              </ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={
              <ProtectedRoute fallback="/Kanbas/Account/Signin">
                <ProtectedRoute fallback="/Kanbas/Dashboard" pred={testEnrollment}>
                  <Courses courses={courses}/>
                </ProtectedRoute>
              </ProtectedRoute>
            } />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
