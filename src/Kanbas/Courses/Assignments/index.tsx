import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsGripVertical, BsSearch } from "react-icons/bs"
import { FaPlus } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentHeaderControlButtons from "./AssignmentHeaderControlButtons";
import { setAssignments, deleteAssignment } from "./reducer";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

function Assignment({ assignment }: { assignment: any }) {
  const dispatch = useDispatch();

  const deleteAssn = async () => {
    await assignmentsClient.deleteAssignment(assignment._id);
    dispatch(deleteAssignment(assignment._id))
  };

  const start = new Date(assignment.start);
  const due = new Date(assignment.due);
  const options: Intl.DateTimeFormatOptions = { 'month': 'short', day: '2-digit' };
  return (
    <li className="wd-assignment-list-item list-group-item p-3 ps-1">
      <div className="d-flex align-items-center">
        <BsGripVertical className="me-2 fs-3" />
        <PiNotePencilBold className="me-2"/>
        <div className="d-inline-block flex-grow-1">
          <Link to={`/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}/Editor`}>
            {assignment.title}
          </Link><br/>
          <a>Multiple modules</a> | <strong>Not available until </strong> {start.toLocaleString('en-US', options)} |
          Due {due.toLocaleString('en-US', options)} | {assignment.points}pts
        </div>
        <div>
          <AssignmentControlButtons deleteAssignment={() => deleteAssn()}/>
        </div>
      </div>
    </li>
  );
}

function Control(props : { cid: String | undefined }) {
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
          <Link id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end" to={`/Kanbas/Courses/${props.cid}/Assignments/Editor`}>
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
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);


  return (
    <div id="wd-assignments">
      <Control cid={cid}/><br/><br/><br/><br/>
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="d-flex align-items-center wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <div className="flex-grow-1">Week 1</div>
            <div className="border border-dark m-2 p-2 rounded-5">40% of Total</div>
            <AssignmentHeaderControlButtons/>
          </div>
          <ul id="wd-assignment-list" className="list-group rounded-0">
            {assignments
              .map((assignment: any) =>
                <Assignment assignment={assignment}/>)}
          </ul>
        </li>
      </ul>
    </div>
);}
