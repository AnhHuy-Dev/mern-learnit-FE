import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContextProvider';

function ActionButtons({ url, _id }) {
   const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext);
   const choosePost = () => {
      findPost(_id);
      setShowUpdatePostModal(true);
   };
   return (
      <>
         <Button className="post-button" href={url} target="_blank">
            <img src={playIcon} alt="play" width="24px" height="24px" />
         </Button>
         <Button className="post-button" onClick={() => choosePost()}>
            <img src={editIcon} alt="edit" width="24px" height="24px" />
         </Button>
         <Button className="post-button" onClick={() => deletePost(_id)}>
            <img src={deleteIcon} alt="delete" width="24px" height="24px" />
         </Button>
      </>
   );
}

export default ActionButtons;
