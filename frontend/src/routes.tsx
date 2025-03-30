import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import { User } from "./App";

interface RoutesProps {
  user: User | null;
  loading: boolean;  // ✅ Add loading state
}

const AppRoutes: React.FC<RoutesProps> = ({ user, loading }) => {
  if (loading) return null;  // ✅ Prevent rendering until loading is done

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={user ? <Home user={user} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile"
        element={user ? <Profile user={user} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/friends"
        element={user ? <Friends /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
