import React from 'react';
 import { Navigate, useLocation } from 'react-router-dom';
 import { useAuth } from '@/contexts/AuthContext';
 
 interface ProtectedRouteProps {
   children: React.ReactNode;
   requireAdmin?: boolean;
   requireHost?: boolean;
 }
 
 const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
   children, 
   requireAdmin = false,
   requireHost = false
 }) => {
   const { user, isLoading, isAdmin, isHost } = useAuth();
   const location = useLocation();
 
   if (isLoading) {
     return (
       <div className="flex min-h-screen items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
       </div>
     );
   }
   
   if (!user) {
     // Redirect to login if not authenticated
     return <Navigate to="/auth" state={{ from: location }} replace />;
   }
   
   if (requireAdmin && !isAdmin) {
     // Redirect to home if not an admin
     return <Navigate to="/" replace />;
   }
   
   if (requireHost && !isHost && !isAdmin) {
     // Redirect to home if not a host (admins can also access host pages)
     return <Navigate to="/" replace />;
   }
   
   return <>{children}</>;
 };
 
 export default ProtectedRoute;