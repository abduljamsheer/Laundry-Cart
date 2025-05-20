// src/components/ProtectedRoute.jsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken } from "../AuthOPration";
// const ProtectedRoute = ({ children }) => {
//   const navigate = useNavigate();
//   const token = getToken("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   }, [navigate, token]);

//   return token ? children : null;
// };

// export default ProtectedRoute;
import { Navigate } from 'react-router-dom';
import { getToken } from '../AuthOPration';

const ProtectedRoute = ({ children }) => {
  const token = getToken('token');
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
