
import React, { useState } from 'react';
import Header from './components/global/Header.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Home from './pages/Home.jsx';
import MyPosition from './pages/MyPosition.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './pages/auth/VerifyEmail.jsx';
import LiveTracking from './components/map/LiveTracking.jsx';

const App = () => {
  const [logoutKey, setLogoutKey] = useState(false);

  const handleLogout = () => {
    // Toggle the logoutKey to force re-render of Home component
    setLogoutKey(prevKey => !prevKey);
  };

  const isAuthenticated = () => {
    // Check if token exists in localStorage
    return !!localStorage.getItem('token');
  };

  const ProtectedRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? (
      <Navigate to="/" replace />
    ) : (
      React.cloneElement(element, rest)
    );
  };

  return (
    <>
      <Router>
        <Header handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home key={logoutKey ? 'logout' : 'login'} />} />
          <Route path="login" element={<ProtectedRoute element={<Login />} />} />
          <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
          <Route path="/verifyEmail" element={<VerifyEmail />}/>
          <Route path="/myPosition" element={<MyPosition />} />
          <Route path="/liveTracking" element={<LiveTracking />} />
        </Routes>
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition: Bounce
        />
      </Router>
    </>
  );
}

export default App;
