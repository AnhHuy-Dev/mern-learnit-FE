import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layouts/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContextProvider';
import Dashboard from './views/Dashboard';
import About from './views/About.';
import ProtectedRoute from './routing/ProctectedRoute';
import PostContextProvider from './contexts/PostContextProvider';

function App() {
   return (
      <AuthContextProvider>
         <PostContextProvider>
            <Router>
               <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Auth authRouter="login" />} />
                  <Route path="/register" element={<Auth authRouter="register" />} />
                  <Route
                     path="/dashboard"
                     element={
                        <ProtectedRoute>
                           <Dashboard />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/about"
                     element={
                        <ProtectedRoute>
                           <About />
                        </ProtectedRoute>
                     }
                  />
                  {
                     //render route in router through one component
                  }
               </Routes>
            </Router>
         </PostContextProvider>
      </AuthContextProvider>
   );
}

export default App;
