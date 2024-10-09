import { BsGripVertical, BsSearch } from "react-icons/bs"
import { FaPlus } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
import LessonControlButtons from "../Modules/LessonControlButtons"
import ModuleControlButtons from "../Modules/ModuleControlButtons"
import { Link } from "react-router-dom";

function Assignment(props: any) {
  return (
    <li className="wd-assignment-list-item list-group-item p-3 ps-1">
      <div className="d-flex align-items-center">
        <BsGripVertical className="me-2 fs-3" />
        <PiNotePencilBold className="me-2"/>
        <div className="d-inline-block flex-grow-1">
          {props.name}<br/>
          <a>Multiple modules</a> | <strong>Not available until </strong> {props.startDate} |
          Due {props.dueDate} | 100pts
        </div>
        <div>
          <LessonControlButtons/>
        </div>
      </div>
    </li>
  );
}

function Control() {
  return (
    <div id="wd-modules-controls">
      <div className="row">
        <div className="col-2">
          <div className="input-group w-20">
            <span className="input-group-text">
              <BsSearch/>
            </span>
            <input type="text" className="form-control" placeholder="Search..."/>
          </div>
        </div>
        <div className="col-10">
          <Link id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end" to="/Kanbas/Courses/1234/Assignments/Editor">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Link>
          <button id="wd-group" className="btn btn-lg btn-secondary me-1 float-end">
            Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <Control/><br/><br/><br/><br/>
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="d-flex align-items-center wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <div className="flex-grow-1">Week 1</div>
            <div className="border border-dark m-2 p-2 rounded-5">40% of Total</div>
            <ModuleControlButtons/>
          </div>
          <ul id="wd-assignment-list" className="list-group rounded-0">
            <Assignment name="A1" startDate="May 6 at 12:00am" dueDate="May 13 at 11:59pm"/>
            <Assignment name="A2" startDate="May 13 at 12:00am" dueDate="May 20 at 11:59pm"/>
            <Assignment name="A3" startDate="May 20 at 12:00am" dueDate="May 27 at 11:59pm"/>
          </ul>
        </li>
      </ul>
    </div>
);}
