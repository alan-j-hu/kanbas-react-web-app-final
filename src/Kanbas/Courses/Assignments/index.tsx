import { BsGripVertical } from "react-icons/bs"
import { FaPlus } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import * as db from "../../Database";

function Assignment(props: any) {
  const start = new Date(props.start);
  const due = new Date(props.due);
  const options: Intl.DateTimeFormatOptions = { 'month': 'short', day: '2-digit' };
  return (
    <li className="wd-assignment-list-item list-group-item p-3 ps-1">
      <div className="d-flex align-items-center">
        <BsGripVertical className="me-2 fs-3" />
        <PiNotePencilBold className="me-2"/>
        <div className="d-inline-block flex-grow-1">
          <Link to={`/Kanbas/Courses/${props.cid}/Assignments/${props._id}/Editor`}>
            {props._id} | {props.title}
          </Link><br/>
          <a>Multiple modules</a> | <strong>Not available until </strong> {start.toLocaleString('en-US', options)} |
          Due {due.toLocaleString('en-US', options)} | {props.points}pts
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
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
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
  const { cid } = useParams();
  const assignments = db.assignments.filter((assignment: any) => assignment.course == cid);
  return (
    <div id="wd-assignments">
      <Control/><br/><br/><br/><br/>
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="d-flex align-items-center wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <div className="flex-grow-1">Week 1</div>
            <div className="border-5 m-2 rounded-2 circular-border">40% of Total</div>
            <ModuleControlButtons/>
          </div>
          <ul id="wd-assignment-list" className="list-group rounded-0">
            {assignments.map((assignment: any) =>
              <Assignment {...assignment} cid={cid}/>)}
          </ul>
        </li>
      </ul>
    </div>
);}
