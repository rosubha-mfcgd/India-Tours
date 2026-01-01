import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * roleIDs: array of allowed role IDs, e.g. [1] for superadmin
 */
export default function RoleRoute({ allowedRoles = [], children }) {
  const { user, loading  } = useContext(AuthContext);
  
  if (loading) return null;
  
  if (!user) return <Navigate to="/login" replace />;

  const role = Number(user.roleID);
  console.log('roleID ',role);
  console.log("User role:", user?.roleID, typeof user?.roleID);
  console.log("Allowed roles:", allowedRoles);

  if (!allowedRoles.includes(role)) {
    // redirect if user doesn't have permission
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
