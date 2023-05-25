import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useContext } from 'react';
import { useState } from 'react';
import AlertMessage from '../alert/AlertMessage';

function RegisterForm() {
   const { registerUser } = useContext(AuthContext);
   const [registerData, setRegisterData] = useState({
      username: '',
      password: '',
      confirmPassword: '',
   });
   const { username, password, confirmPassword } = registerData;
   const [alert, setAlert] = useState(null);

   const onChangeRegisterData = (e) => {
      setRegisterData({
         ...registerData,
         [e.target.name]: e.target.value,
      });
   };

   const register = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         setAlert({ type: 'danger', message: 'Password do not match' });
         setTimeout(() => setAlert(null), 5000);
         return;
      }
      try {
         const responeData = await registerUser(registerData);
         if (responeData.success) setAlert({ type: 'success', message: responeData.message });
         else setAlert({ type: 'danger', message: responeData.message });

         setTimeout(() => setAlert(null), 5000);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Form onSubmit={(e) => register(e)}>
            <AlertMessage info={alert} />
            <Form.Group className="my-3">
               <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => onChangeRegisterData(e)}
               ></Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => onChangeRegisterData(e)}
               ></Form.Control>
            </Form.Group>
            <Form.Group>
               <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => onChangeRegisterData(e)}
               ></Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-4">
               Register
            </Button>
         </Form>
         <p className="mt-4">
            Already have an account?
            <Link to="/login">
               <Button variant="info" className="mx-3">
                  Login
               </Button>
            </Link>
         </p>
      </>
   );
}

export default RegisterForm;
