
import React, { useState } from 'react';
import Header from './components/global/Header.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Console from './pages/employee/Console.jsx';
import Home from './pages/Home.jsx';
import MyPosition from './pages/MyPosition.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './pages/auth/VerifyEmail.jsx';
import LiveTracking from './components/map/LiveTracking.jsx';
import {jwtDecode} from "jwt-decode";



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

  const getUserRole = () => {
    // Get the user's role from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
       // Check if user data exists
      if (decodedToken && decodedToken.user) {
        return decodedToken.user.role;
      }
  }
  };

  const roleBasedRedirect = (role, allowedRoles, redirectPath = '/') => {
    return allowedRoles.includes(role) ? null : <Navigate to={redirectPath} replace />;
  };

  const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
    const isAuth = isAuthenticated();
    const role = getUserRole();

    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }

    return roleBasedRedirect(role, allowedRoles) || React.cloneElement(element, rest);
  };

  // const Layout = ({ children }) => {
  //   const location = useLocation();
  //   const showHeader = !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/console');

  //   return (
  //     <>
  //       {showHeader && <Header handleLogout={handleLogout} />}
  //       {children}
  //     </>
  //   );
  // };

  return (
    <>
      <Router >
          <Routes>
            <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={isAuthenticated() ? <Navigate to="/" replace /> : <Register />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard  />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/employees/addEmp" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/employees/viewEmps" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/vehicles/addCar" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/vehicles/viewCars" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/lastPosition" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/geoFencing" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/roadHistory" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/dashboard/orders" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="/console" element={<ProtectedRoute element={<Console />} allowedRoles={['employee']} />} />
            <Route path="/verifyEmail" element={<VerifyEmail />}/>
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
