import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/PostContextProvider';
function UpdatePostModal() {
   const { showUpdatePostModal, setShowUpdatePostModal, setShowToast, updatePost, postState } = useContext(PostContext);

   const { post } = postState;

   const [updatePostForm, setUpdatePostForm] = useState(post);
   const { title, description, url, status } = updatePostForm;

   useEffect(() => setUpdatePostForm(post), [post]);

   const onChangeUpdatePost = (e) => setUpdatePostForm({ ...updatePostForm, [e.target.name]: e.target.value });

   const resetDataModal = () => {
      setUpdatePostForm(post);
      setShowUpdatePostModal(false);
   };

   const closeModal = () => {
      resetDataModal();
   };

   const submit = async (e) => {
      e.preventDefault();
      const { success, message } = await updatePost(updatePostForm);
      resetDataModal();
      setShowToast({
         show: true,
         message: message,
         type: success ? 'success' : 'danger',
      });
   };

   return (
      <Modal show={showUpdatePostModal} onHide={closeModal}>
         <Modal.Header closeButton>
            <Modal.Title>Making progress?</Modal.Title>
         </Modal.Header>
         <Form onSubmit={(e) => submit(e)}>
            <Modal.Body>
               <Form.Group className="my-3">
                  <Form.Control
                     type="text"
                     name="title"
                     placeholder="Title"
                     required
                     aria-describedby="title-help"
                     value={title}
                     onChange={(e) => onChangeUpdatePost(e)}
                  />
                  <Form.Text id="title-help" muted>
                     Required
                  </Form.Text>
               </Form.Group>
               <Form.Group className="my-3">
                  <Form.Control
                     as="textarea"
                     rows={3}
                     name="description"
                     placeholder="Description"
                     value={description}
                     onChange={(e) => onChangeUpdatePost(e)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group
                  className="my-3 w-100"
                  as="select"
                  value={status}
                  name="status"
                  onChange={(e) => onChangeUpdatePost(e)}
               >
                  <option value="TO LEARN">TO LEARN</option>
                  <option value="LEARNING">LEARNING</option>
                  <option value="LEARNED">LEARNED</option>
               </Form.Group>
               <Form.Group className="my-3">
                  <Form.Control
                     type="text"
                     name="url"
                     placeholder="URL Tutorial"
                     value={url}
                     onChange={(e) => onChangeUpdatePost(e)}
                  ></Form.Control>
               </Form.Group>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={closeModal}>
                  Cancel
               </Button>
               <Button variant="primary" type="submit">
                  LeanrIt
               </Button>
            </Modal.Footer>
         </Form>
      </Modal>
   );
}

export default UpdatePostModal;
