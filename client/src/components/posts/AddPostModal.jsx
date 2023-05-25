import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContextProvider';
function AddPostModal() {
   const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

   const [newPost, setNewPost] = useState({
      title: '',
      description: '',
      url: '',
   });

   const { title, description, url } = newPost;

   const onChangeNewPost = (e) => setNewPost({ ...newPost, [e.target.name]: e.target.value });

   const resetDataModal = () => {
      setNewPost({ title: '', description: '', url: '' });
      setShowAddPostModal(false);
   };
   const closeModal = () => {
      resetDataModal();
   };

   const submit = async (e) => {
      e.preventDefault();
      const { success, message } = await addPost(newPost);
      resetDataModal();
      setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' });
   };

   return (
      <Modal show={showAddPostModal} onHide={closeModal}>
         <Modal.Header closeButton>
            <Modal.Title>What do you want to learn ?</Modal.Title>
         </Modal.Header>
         <Form method="post" onSubmit={(e) => submit(e)}>
            <Modal.Body>
               <Form.Group className="my-3">
                  <Form.Control
                     type="text"
                     name="title"
                     placeholder="Title"
                     required
                     aria-describedby="title-help"
                     value={title}
                     onChange={(e) => onChangeNewPost(e)}
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
                     onChange={(e) => onChangeNewPost(e)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group className="my-3">
                  <Form.Control
                     type="text"
                     name="url"
                     placeholder="URL Tutorial"
                     value={url}
                     onChange={(e) => onChangeNewPost(e)}
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

export default AddPostModal;
