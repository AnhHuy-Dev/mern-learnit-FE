import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function Auth({ authRouter }) {
   const {
      authState: { authLoading, isAuthenticated },
   } = useContext(AuthContext);
   console.log(isAuthenticated, authLoading);
   let body;
   if (authLoading) {
      body = (
         <div className="spinner-container">
            <Spinner variant="info" animation="border" />
         </div>
      );
   } else if (isAuthenticated) {
      return <Navigate to="/dashboard" replace={true} />;
   } else
      body = (
         <>
            {authRouter === 'login' && <LoginForm />}
            {authRouter === 'register' && <RegisterForm />}
         </>
      );
   return (
      <>
         <div className="landing">
            <div className="dark-overlay">
               <div className="landing-inner">
                  <h1>Learn it</h1>
                  <h4>Keep track of you are learning</h4>
                  {body}
               </div>
            </div>
         </div>
      </>
   );
}

export default Auth;
