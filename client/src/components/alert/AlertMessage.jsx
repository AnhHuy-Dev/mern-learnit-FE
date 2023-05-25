import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertMessage({ info }) {
   return info === null ? null : <Alert variant={info.type}>{info.message}</Alert>;
}

export default AlertMessage;
