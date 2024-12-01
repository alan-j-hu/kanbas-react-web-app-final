import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  return (
    <div id="wd-account-navigation">
      {links
        .flatMap(link =>
          [<Link to={`/Kanbas/Account/${link}`}>{link}</Link>, <br/>])}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
);}
