import { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      alert(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

            {error && <p className="text-danger ps-5">{error}</p>}

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' type='email' size="lg"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' type='password' size="lg"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleLogin}>
              Login
            </MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don&apos;t have an account? <a href="#!" className="link-info">Register here</a></p>
          </div>
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Trevi" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
