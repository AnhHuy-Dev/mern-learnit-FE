import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ActionButtons from './ActionButtons';

const SinglePost = ({ post: { _id, title, description, url, status } }) => {
   return (
      <Card className="" border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
         <Card.Body>
            <Card.Title>
               <Row>
                  <Col>
                     <p className="post-title">{title}</p>
                     <Badge
                        bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}
                        pill
                        className="text-xl"
                     >
                        {status}
                     </Badge>
                  </Col>
                  <Col className="text-end">
                     <ActionButtons url={url} _id={_id} />
                  </Col>
               </Row>
            </Card.Title>

            <Card.Text>{description}</Card.Text>
         </Card.Body>
      </Card>
   );
};

export default SinglePost;
