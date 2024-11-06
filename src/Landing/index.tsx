import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container">
      <h1>Landing</h1>
      <ul>
        <li>Name: Alan Hu</li>
        <li>GitHub: https://github.com/alan-j-hu/kanbas-react-web-app</li>
        <li>Section: Tuesday/Friday 3:25 PM</li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><Link to="/Labs/Lab4/">Lab 4</Link></li>
      </ul>
    </div>
  );
}
