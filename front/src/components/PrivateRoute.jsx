import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
