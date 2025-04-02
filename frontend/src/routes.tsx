import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/AuthContext";
import { JSX, useContext } from "react";

const AppRoutes = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/signup" element={authUser?<Navigate to='/' replace />:<Signup/>} />
      <Route path="/login" element={authUser?<Navigate to='/' replace />:<Login/>} />
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authUser } = useContext(AuthContext);
  return authUser ? children : <Navigate to="/login" replace/>;
};
