import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/postReducer';
import { apiUrl, GET_POST_SUCCESS, GET_POST_FAIL, ADD_POST, DELETE_POST, FIND_POST, UPDATE_POST } from './constants';
import axios from 'axios';

export const PostContext = createContext();

function PostContextProvider({ children }) {
   //State
   const [postState, dispatch] = useReducer(postReducer, {
      post: null,
      posts: [],
      postLoading: true,
   });

   const [showAddPostModal, setShowAddPostModal] = useState(false);
   const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
   const [showToast, setShowToast] = useState({
      show: false,
      message: '',
      type: '',
   });

   //Get all post
   const getAllPosts = async () => {
      try {
         const response = await axios.get(`${apiUrl}/posts`);
         if (response.data.success)
            dispatch({
               type: GET_POST_SUCCESS,
               payload: response.data.posts,
            });
      } catch (error) {
         dispatch({
            type: GET_POST_FAIL,
         });
      }
   };

   //Addpost
   const addPost = async (postForm) => {
      try {
         const response = await axios.post(`${apiUrl}/posts`, postForm);
         if (response.data.success) {
            dispatch({
               type: ADD_POST,
               payload: response.data.newPost,
            });
            return response.data;
         }
      } catch (error) {
         return error.response.data ? error.response.data : { succes: false, message: 'Server error' };
      }
   };

   //Delete post
   const deletePost = async (id) => {
      try {
         const response = await axios.delete(`${apiUrl}/posts/${id}`);
         if (response.data.success) {
            dispatch({
               type: DELETE_POST,
               payload: id,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   //find post to update post
   const findPost = (postId) => {
      const post = postState.posts.find((post) => post._id === postId);
      dispatch({ type: FIND_POST, payload: post });
   };

   //updatePost
   const updatePost = async (updatePost) => {
      try {
         const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost);
         if (response.data.success) {
            dispatch({
               type: UPDATE_POST,
               payload: response.data.updatedPost,
            });
            return response.data;
         }
      } catch (error) {
         console.log(error);
      }
   };
   const postContextData = {
      getAllPosts,
      addPost,
      deletePost,
      findPost,
      updatePost,
      postState,
      showAddPostModal,
      setShowAddPostModal,
      showUpdatePostModal,
      setShowUpdatePostModal,
      showToast,
      setShowToast,
   };

   return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
