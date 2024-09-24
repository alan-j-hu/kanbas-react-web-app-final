export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br /><br />
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Assignment Group</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
            </select>
            <br/>
            <label htmlFor="wd-submission-type">Online Entry Options</label><br/>
            <input type="checkbox" name="wd-submission-type" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="wd-submission-type" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" name="wd-submission-type" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" name="wd-submission-type" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="wd-submission-type" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label>Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label><br />
            <input id="wd-assign-to" placeholder="Everyone" /><br />

            <label htmlFor="wd-due-date">Due</label><br />
            <input type="date"
              id="wd-due-date"
              value="2024-05-13"/><br/>

            <table>
              <tr>
                <td>
                  <label htmlFor="wd-available-from">Available from</label><br />
                  <input type="date"
                    id="wd-available-from"
                    value="2024-05-06"/><br/>
                </td>
                <td>
                  <label htmlFor="wd-available-until">Until</label><br />
                  <input type="date"
                    id="wd-available-until"
                    value="2024-05-20"/><br/>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        {/* Complete on your own */}
      </table>
    </div>
);}
