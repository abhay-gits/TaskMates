import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Profile from './pages/profile';
import { User } from './App';

interface RoutesProps {
  user: User | null;
}

const AppRoutes: React.FC<RoutesProps> = ({ user }) => {
  return (
    
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={
            user ? <Home user={user} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            user ? <Profile user={user} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/friends"
          element={user ? <Friends /> : <Navigate to="/login" replace />}
        />
      </Routes>
    
  );
};

export default AppRoutes;
