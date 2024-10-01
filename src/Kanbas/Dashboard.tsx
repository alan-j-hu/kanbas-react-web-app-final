import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                 CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/Video_Game_Championships_logo.png" width={200} />
            <div>
              <h5>
                 POKE1996 Pokemon VGC
              </h5>
              <p className="wd-dashboard-course-title">
                Competitive Pokemon Battling
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/1200px-Racket-logo.svg_-1024x1024.png" width={200} />
            <div>
              <h5>
                 CS2500 Fundies
              </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CuboRubik.png" width={200} />
            <div>
              <h5>
                 MATH3175 Group Theory
              </h5>
              <p className="wd-dashboard-course-title">
                Group Theory
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/heliana.jpg" width={200} />
            <div>
              <h5>
                 CAT1234 Cat Language
              </h5>
              <p className="wd-dashboard-course-title">
                Mrrp
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/Linear_RGB_color_wheel.png" width={200} />
            <div>
              <h5>
                 ART101 Intro to Art
              </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Art and Composition
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/cpp_logo.png" width={200} />
            <div>
              <h5>
                 CS679 C++ Programming
              </h5>
              <p className="wd-dashboard-course-title">
                Intro to Modern C++
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
