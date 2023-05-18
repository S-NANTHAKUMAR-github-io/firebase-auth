// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({children}) => {
//   let auth = "false";
//   const navigate = useNavigate()
//   if(!auth){
//     return navigate("/")
//   }
//   return children ;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;