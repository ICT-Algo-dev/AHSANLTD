import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ authLoading, authUser, children }) => {
  if (authLoading) {
    return <div className="py-12 text-center text-slate-500">Checking access...</div>;
  }

  if (authUser?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
