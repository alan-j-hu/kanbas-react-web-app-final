import { useSelector } from "react-redux";
import { useParams, Path } from "react-router";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(
  { children, pred = () => true, fallback }
  : { children: any, pred?: (user: any, params: any) => boolean, fallback: String }) {

  const params = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && pred(currentUser, params)) {
    return children;
  } else {
    return <Navigate to={`${fallback}`} />;
}}
