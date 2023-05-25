export const apiUrl =
   process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : 'https://mern-learnit-h16k.onrender.com/api';

export const LOCAL_STORAGE_ACCESSTOKEN = 'mern-learnit';

export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAIL = 'GET_POST_FAIL';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const FIND_POST = 'FIND_POST';
export const UPDATE_POST = 'UPDATE_POST';
