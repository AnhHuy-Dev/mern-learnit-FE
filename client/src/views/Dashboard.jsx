import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import addIcon from '../assets/plus-circle-fill.svg';
import UpdatePostModal from '../components/posts/UpdatePostModal';

function Dashboard() {
   const {
      authState: {
         user: { username },
      },
   } = useContext(AuthContext);

   const {
      getAllPosts,
      postState: { post, posts, postLoading },
      showAddPostModal,
      setShowAddPostModal,
      showToast,
      setShowToast,
   } = useContext(PostContext);

   const { show, message, type } = showToast;

   useEffect(() => {
      getAllPosts();
   }, []);

   let body = null;
   if (postLoading)
      return (
         <div className="spinner-container">
            <Spinner animation="border" />
         </div>
      );
   else if (posts.length === 0)
      body = (
         <>
            <Card className="text-center">
               <Card.Body>
                  <Card.Header as="h1">Hi {username}</Card.Header>
                  <Card.Title className="mt-4">Welcom to LearnIt</Card.Title>
                  <Card.Text>Click the button below to track your fisrt skill to learn</Card.Text>
                  <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
                     LearnIt!
                  </Button>
               </Card.Body>
            </Card>
         </>
      );
   else
      body = (
         <>
            <Container className="mt-4">
               <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                  {posts.map((post) => {
                     return (
                        <Stack key={post._id} gap={3} style={{ flex: 'none' }}>
                           <SinglePost post={post} />
                        </Stack>
                     );
                  })}
               </Row>
            </Container>
            <OverlayTrigger placement="left" overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
               <Button className="btn-floating" onClick={() => setShowAddPostModal(true)}>
                  <img src={addIcon} alt="add" width="60x" height="60" />
               </Button>
            </OverlayTrigger>
         </>
      );
   return (
      <>
         {body}
         <AddPostModal />
         {post !== null && <UpdatePostModal />}
         <Toast
            show={show}
            className={`bg-${type} text-white`}
            onClose={() =>
               setShowToast({
                  show: false,
                  message: '',
                  type: '',
               })
            }
            style={{ position: 'fixed', top: '20%', right: '10px' }}
            delay="3000"
            autohide
         >
            <Toast.Body>
               <strong>{message}</strong>
            </Toast.Body>
         </Toast>
      </>
   );
}

export default Dashboard;
