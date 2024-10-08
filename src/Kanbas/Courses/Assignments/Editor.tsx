export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
      </div>
      <div className="mb-3">
        <textarea id="wd-description" className="form-control">
          The assignment is available online Submit a link to the landing page of
        </textarea>
      </div>
      <br />
      <div>
        <div className="row mb-3">
          <div className="col-sm-2 col-form-label">
            <label htmlFor="wd-points">Points</label>
          </div>
          <div className="col-sm-2">
            <input id="wd-points" className="form-control" value={100} />
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
              value="2024-05-13"/><br/>

            <div className="row">
              <div className="col">
                <label htmlFor="wd-available-from">Available from</label><br />
                <input type="date" className="form-control"
                  id="wd-available-from"
                  value="2024-05-06"/><br/>
              </div>
              <div className="col">
                <label htmlFor="wd-available-until">Until</label><br />
                <input type="date" className="form-control"
                  id="wd-available-until"
                  value="2024-05-20"/><br/>
              </div>
            </div>
          </div>
        </div>
        {/* Complete on your own */}
      </div>
    </div>
);}
