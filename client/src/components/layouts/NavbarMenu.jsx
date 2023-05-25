import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useContext } from 'react';

const NavbarMenu = () => {
   const {
      authState: {
         user: { username },
      },
      logoutUser,
   } = useContext(AuthContext);

   const logout = () => logoutUser();
   return (
      <Navbar expand="lg" variant="dark" bg="primary" className="shadow px-5">
         <Navbar.Brand href="#">
            <img src={learnItLogo} alt="learnit" width="32px" heigh="32px" className="mx-3" />
            LearnIt
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav fill="true" className="me-auto">
               <Nav.Link className="fw-bolder text-white" as={Link} to="/dashboard">
                  Dashboard
               </Nav.Link>
               <Nav.Link className="fw-bolder text-white" as={Link} to="/about">
                  About
               </Nav.Link>
            </Nav>
            <Nav className="mr-auto">
               <Nav.Link className="fw-bolder text-white mx-2" as={Link} to="/dashboard">
                  Welcome {username}
               </Nav.Link>
               <Button variant="danger" className="fw-bolder" onClick={logout}>
                  <img className="mx-2" src={logoutIcon} alt="logout" width="32px" height="32px" />
                  Logout
               </Button>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
};

export default NavbarMenu;
