import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useContext, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import NavbarMenu from '../components/layouts/NavbarMenu';

function ProtectedRoute({ children }) {
   const navigate = useNavigate();
   const {
      authState: { authLoading, isAuthenticated },
   } = useContext(AuthContext);

   useEffect(() => {
      if (!isAuthenticated) navigate('/login');
   }, []);
   let body;
   if (authLoading)
      return (
         <div className="spinner-container">
            <Spinner animation="border" />
         </div>
      );

   body = isAuthenticated ? (
      <>
         <NavbarMenu />
         {children}
      </>
   ) : (
      <Navigate to="/login" replace={true} />
   );

   return body;
}

export default ProtectedRoute;
