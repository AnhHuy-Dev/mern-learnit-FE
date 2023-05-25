import { Navigate } from 'react-router-dom'

function Landing() {
  return <Navigate to='/login' replace={true} />
}

export default Landing
