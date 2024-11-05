import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Routes, Route, Navigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((assignment: any) => assignment._id === aid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(assignment && assignment.title);
  const [start, setStart] = useState(assignment && assignment.start);
  const [due, setDue] = useState(assignment && assignment.due);
  const [until, setUntil] = useState(assignment && assignment.until);
  const [points, setPoints] = useState(assignment && assignment.points);
  const [description, setDescription] = useState(assignment && assignment.description);

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" className="form-control" value={title}
               onChange={e => setTitle(e.target.value)}/>
      </div>
      <div className="mb-3">
        <textarea id="wd-description" className="form-control" value={description}
          onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <br />
      <div>
        <div className="row mb-3">
          <div className="col-sm-2 col-form-label">
            <label htmlFor="wd-points">Points</label>
          </div>
          <div className="col-sm-2">
            <input id="wd-points" className="form-control" value={points}
                   onChange={(e) => {
                     setPoints(parseInt(e.target.value));
                   }}/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-2 col-form-label">
            <label htmlFor="wd-group">Assignment Group</label>
          </div>
          <div className="col-sm-2">
            <select id="wd-group" className="form-control">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-2 col-form-label">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </div>
          <div className="col-sm-2">
            <select id="wd-display-grade-as" className="form-control">
              <option value="PERCENTAGE">Percentage</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-2 col-form-label">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </div>
          <div className="col-sm-2">
            <select id="wd-submission-type" className="form-control">
              <option value="ONLINE">Online</option>
            </select>
            <br/>
            <label htmlFor="wd-submission-type">Online Entry Options</label><br/>

            <input type="checkbox" className="form-check-input" name="wd-submission-type" id="wd-text-entry"/>
            <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" className="form-check-input" name="wd-submission-type" id="wd-website-url"/>
            <label className="form-check-label" htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" className="form-check-input" name="wd-submission-type" id="wd-media-recordings"/>
            <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" className="form-check-input" name="wd-submission-type" id="wd-student-annotation"/>
            <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" className="form-check-input" name="wd-submission-type" id="wd-file-upload"/>
            <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-2 col-form-label">
            <label>Assign</label>
          </div>
          <div className="col-sm-2">
            <label htmlFor="wd-assign-to">Assign to</label><br />
            <input id="wd-assign-to" className="form-control" placeholder="Everyone" /><br />

            <label htmlFor="wd-due-date">Due</label><br />
            <input className="form-control" type="date"
              id="wd-due-date"
              value={due}
              onChange={e => setDue(e.target.value)}/><br/>

            <div className="row">
              <div className="col">
                <label htmlFor="wd-available-from">Available from</label><br />
                <input type="date" className="form-control"
                  id="wd-available-from"
                  value={start}
                  onChange={e => setStart(e.target.value)}/><br/>
              </div>
              <div className="col">
                <label htmlFor="wd-available-until">Until</label><br />
                <input type="date" className="form-control"
                  id="wd-available-until"
                  value={until}
                  onChange={e => setUntil(e.target.value)}/><br/>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Link className="btn btn-secondary" to={`/Kanbas/Courses/${assignment.course}/Assignments`}>
            Cancel
          </Link>
          <button onClick={() => {
              dispatch(updateAssignment({
                ...assignment,
                title,
                start,
                due,
                until,
                points,
                description,
              }));
              navigate(`/Kanbas/Courses/${assignment.course}/Assignments`);
            }}
            type="button" className="btn btn-danger">
            Add Assignment </button>
        </div>
      </div>
    </div>
);}
