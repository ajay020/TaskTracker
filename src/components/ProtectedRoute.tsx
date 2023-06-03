import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "./UserProvider";

type PropType = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: PropType) {
  const { user } = useContext(UserContext) ?? {};
  console.log("ProtectedRoute render");
  console.log({ user });
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
