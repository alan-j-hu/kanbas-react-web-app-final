export default function QuizEditor() {
  return (
    <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="quiz-details-tab" data-bs-toggle="tab" data-bs-target="#quiz-details">
            Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="quiz-questions-tab" data-bs-toggle="tab" data-bs-target="#quiz-questions">
            Questions
          </button>
        </li>
      </ul>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane show active" id="quiz-details" role="tabpanel" aria-labelledby="quiz-details-tab">
          <input id="wd-title" className="form-control w-25"/>
          <textarea id="wd-description" className="form-control"/>
          <select id="wd-quiz-type" className="form-select w-25">
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="PRACTICE_SURVEY">Practice Survey</option>
          </select>

          <select id="wd-quiz-group" className="form-select w-25">
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAM">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </select>

          <input className="form-check-input" type="checkbox" value="" id="wd-quiz-shuffle"/>
          <label className="form-check-label" htmlFor="wd-quiz-shuffle">
            Shuffle Answers
          </label>

          <input className="form-check-input" type="checkbox" value="" id="wd-quiz-multiple-attempts"/>
          <label className="form-check-label" htmlFor="wd-quiz-multiple-attempts">
            Allow Multiple Attempts
          </label>
        </div>
        <div className="tab-pane" id="quiz-questions" role="tabpanel" aria-labelledby="quiz-questions-tab">
          Questions
        </div>
      </div>
    </div>
  );
}
