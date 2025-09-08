// src/routes.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

// Usage
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route path="/admin" element={
      <PrivateRoute role="SYSTEM_ADMIN">
        <AdminDashboard />
      </PrivateRoute>
    } />

    <Route path="/user" element={
      <PrivateRoute role="NORMAL_USER">
        <UserDashboard />
      </PrivateRoute>
    } />

    <Route path="/owner" element={
      <PrivateRoute role="STORE_OWNER">
        <StoreOwnerDashboard />
      </PrivateRoute>
    } />
  </Routes>
</BrowserRouter>
