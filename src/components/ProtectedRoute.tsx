import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

type PropType = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: PropType) {
  const { user } = useContext(UserContext) ?? {};
  //   console.log("ProtectedRoute render");
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
