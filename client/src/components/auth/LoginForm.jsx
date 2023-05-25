import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useContext, useState } from 'react';
import AlertMessage from '../alert/AlertMessage';

function LoginForm() {
   //Context
   const { loginUser } = useContext(AuthContext);
   const navigate = useNavigate();

   const [loginForm, setLoginForm] = useState({
      username: '',
      password: '',
   });
   const [alert, setAlert] = useState(null);
   const { username, password } = loginForm;

   const onChangeLoginForm = (e) => {
      setLoginForm({
         ...loginForm,
         [e.target.name]: e.target.value,
      });
   };
   //Login Controller
   const login = async (event) => {
      event.preventDefault();
      try {
         const loginData = await loginUser(loginForm);
         if (loginData.success) navigate('/dashboard');
         else {
            setAlert({ type: 'danger', message: loginData.message });
            setTimeout(() => setAlert(null), 5000);
         }
      } catch (error) {
         console.log(error);
      }
   };

   //Check authenticated

   return (
      <>
         <Form onSubmit={(e) => login(e)}>
            <AlertMessage info={alert} />
            <Form.Group className="my-3">
               <Form.Control
                  type="text"
                  placeholder="Username"
                  required
                  defaultValue={username}
                  name="username"
                  onChange={(e) => onChangeLoginForm(e)}
               ></Form.Control>
            </Form.Group>
            <Form.Group>
               <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  defaultValue={password}
                  name="password"
                  onChange={(e) => onChangeLoginForm(e)}
               ></Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-4">
               Login
            </Button>
         </Form>
         <p className="mt-4">
            Don't have an account?
            <Link to="/register">
               <Button variant="info" className="mx-3">
                  Register
               </Button>
            </Link>
         </p>
      </>
   );
}

export default LoginForm;
