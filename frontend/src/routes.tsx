import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/AuthContext";
import { JSX, useContext } from "react";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Loading from "./components/Loading";

const AppRoutes = () => {
  const { authUser, loading } = useContext(AuthContext);
  if (loading) return <Loading />;
  
  return (
    <Routes>
      <Route path="/signup" element={authUser ? <Navigate to='/' replace /> : <Signup/>} />
      <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login/>} />
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path="/friends" element={<ProtectedRoute><Friends/></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authUser } = useContext(AuthContext);
  return authUser ? children : <Navigate to="/login" replace/>;
};
