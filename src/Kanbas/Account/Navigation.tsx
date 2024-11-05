import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  return (
    <div id="wd-account-navigation">
      {links
        .flatMap(link =>
          [<Link to={`/Kanbas/Account/${link}`}>{link}</Link>, <br/>])}
    </div>
);}
