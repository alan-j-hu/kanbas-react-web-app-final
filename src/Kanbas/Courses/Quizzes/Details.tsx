export default function Details({ quiz }: { quiz: any }){
    return(
        <div>
        <div>
            <button type="button" className="btn btn-secondary"  >
            Preview
            </button>
            <button type="button" className="btn btn-secondary" >
            Edit
            </button>
        </div>
        <h3>Quiz Details Editor</h3>
        <hr></hr>

        <p>Quiz Type:</p>
      <p>Points:</p>
      <p>Assignment Group: </p>
      <p>Shuffle Answers: </p>
      <p>Time Limit:</p>
      <p>Multiple Attempts:</p>
      <p>How Many Attempts:</p>
      <p>Show Correct Answers:</p>
      <p>Access Code:</p>
      <p>One Question at a Time:</p>
      <p>Webcam Required:</p>
      <p>Lock Questions After Answering:</p>
      <hr></hr>
      <p>Due Date:</p>
      <p>Available Date:</p>
      <p>Until Date:</p>

        </div>
    );
}