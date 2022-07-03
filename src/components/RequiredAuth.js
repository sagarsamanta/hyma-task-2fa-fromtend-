import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { MyContext } from "./AuthProvider";
const RequireAuth = ({ children }) => {
  let auth = useContext(MyContext);
  console.log(auth);
  let location = useLocation();

  if (!auth.user.name) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
export default RequireAuth;
