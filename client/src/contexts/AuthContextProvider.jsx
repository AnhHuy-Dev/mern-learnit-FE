import { useReducer, createContext } from 'react';
import axios from 'axios';
import { authReducer } from '../reducers/authReducer';
import { apiUrl, LOCAL_STORAGE_ACCESSTOKEN } from './constants';
import setAuthToken from '../utils/setAuthToken';
import { useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
   const [authState, dispatch] = useReducer(authReducer, {
      authLoading: true,
      isAuthenticated: false,
      user: null,
   });
   //load when access http://localhost:5173
   const loadUser = async () => {
      if (localStorage[LOCAL_STORAGE_ACCESSTOKEN]) {
         setAuthToken(localStorage[LOCAL_STORAGE_ACCESSTOKEN]);
      }
      try {
         const response = await axios.get(`${apiUrl}/auth`);
         if (response.data.success) {
            dispatch({
               type: 'SET_AUTH',
               payload: { isAuthenticated: true, user: response.data.user },
            });
         }
      } catch (error) {
         localStorage.removeItem(LOCAL_STORAGE_ACCESSTOKEN);
         setAuthToken(null);
         dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
         });
      }
   };
   useEffect(() => {
      loadUser();
   }, []);
   //login
   const loginUser = async (userForm) => {
      try {
         const response = await axios.post(`${apiUrl}/auth/login`, userForm);
         // console.log(response.data);
         if (response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_ACCESSTOKEN, response.data.accessToken);
            await loadUser();
            return response.data;
         }
      } catch (error) {
         if (error.response.data) return error.response.data; //error have response.data (server)
         else return { success: false, message: error.message };
      }
   };

   const registerUser = async (userForm) => {
      try {
         const response = await axios.post(`${apiUrl}/auth/register`, userForm);
         if (response.data.success) localStorage.setItem(LOCAL_STORAGE_ACCESSTOKEN, response.data.accessToken);

         await loadUser();
         return response.data;
      } catch (error) {
         if (error.response.data) return error.response.data;
         else return { success: false, erorr: error.message };
      }
   };

   //Logout
   const logoutUser = () => {
      localStorage.removeItem(LOCAL_STORAGE_ACCESSTOKEN);
      dispatch({
         type: 'SET_AUTH',
         payload: { isAuthenticated: false, user: null },
      });
   };
   //context data
   const authContextData = { loginUser, authState, registerUser, logoutUser };

   return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
