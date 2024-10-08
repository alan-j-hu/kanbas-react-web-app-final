import { Link } from "react-router-dom";

function Course(props: any) {
  return (
    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
      <div className="card rounded-3 overflow-hidden">
        <Link className="wd-dashboard-course-link
                         text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home">
          <img src={props.image}
               width="100%" height={160}/>
          <div className="card-body">
            <h5 className="wd-dashboard-course-title card-title">
              {props.title}
            </h5>
            <p className="wd-dashboard-course-title card-text">
              {props.name}
            </p>
            <button className="btn btn-primary"> Go </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link
                               text-decoration-none text-dark"
                    to="/Kanbas/Courses/1234/Home">
                <img src="/images/reactjs.jpg"
                     width="100%" height={160}/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                     CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <Course
            image="/images/Video_Game_Championships_logo.png"
            name="POKE1996 Pokemon VGC"
            title="Competitive Pokemon Battling"/>
          <Course
            image="/images/1200px-Racket-logo.svg_-1024x1024.png"
            name="CS2500 Fundies"
            title="Fundamentals of Computer Science"/>
          <Course
            image="/images/CuboRubik.png"
            name="MATH3175 Group Theory"
            title="Group Theory"/>
          <Course
            image="/images/heliana.jpg"
            name="CAT1234 Cat Language"
            title="Mrrp"/>
          <Course
            image="/images/Linear_RGB_color_wheel.png"
            name="ART101 Intro to Art"
            title="Introduction to Art and Composition"/>
          <Course
            image="/images/cpp_logo.png"
            name="CS679 C++ Programming"
            title="Intro to Modern C++"/>
        </div>
      </div>
    </div>
  );
}
