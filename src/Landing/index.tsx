import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container">
      <h1>Landing</h1>
      <ul>
        <li>Name: Alan Hu</li>
        <li>Client GitHub: https://github.com/alan-j-hu/kanbas-react-web-app</li>
        <li>Server GitHub: https://github.com/alan-j-hu/kanbas-node-server-app</li>
        <li>Login info: https://github.com/alan-j-hu/kanbas-node-server-app/blob/a6/data/kanbas.users.json</li>
        <li>Section: Tuesday/Friday 3:25 PM</li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><Link to="/Labs/Lab5/">Lab 5</Link></li>
      </ul>
    </div>
  );
}
