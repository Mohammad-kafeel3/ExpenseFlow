import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/authContext'; // ✅ use context

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes({ children }) {
  const { user } = useAuth(); // ✅ use auth context

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
