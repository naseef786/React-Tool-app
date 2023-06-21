// PublicRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../config/AuthContext';


const PublicRoute = ({ path, element }) => {
  const { user } = useContext(UserContext);

  return !user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default PublicRoute;
