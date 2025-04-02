import React, { useContext, useState } from 'react';
import Button from './Button';
import '../styles/SignIn.css';
import '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser } from '../api/auth';
import useFetch from '../hooks/useFetch';

const SignInForm = () => {
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const {setRole} = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Sign in complete');
    setLoading(true);
    setError([]);
    try {
      const { token } = await loginUser({ email, password });
      const fetchedData = await fetchData(
        `/user/?filter_field=email&filter_value=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = fetchedData.data[0];
      const userId = userData?._id;
      console.log("id:" ,userId)
      const userRole = userData?.role.name;
      console.log(userRole);
      setRole(userRole);
      console.log("role",userRole);
      login(userId, token);


      if(userRole == "Administrator"){
        navigate('/adminDashboard')
      }else{
        navigate('/dashboard');
      }
      
    } catch (err) {
      if (err.response) {
        console.error('Error del servidor:', err.response.data);
        console.error('Código de estado:', err.response.status);
        if (err.response.data.errors && Array.isArray(err.response.data.errors)) {
            // Si `errors` es un array, extraemos los mensajes
            setError(err.response.data.errors.map(error => error.msg));
          } else {
            // Si no, configuramos el mensaje como un array
            setError([err.response.data.message || 'Error al iniciar sesión']);
          }
      } else if (err.request) {
        console.error('Sin respuesta del servidor:', err.request);
        setError([err.request]);
      } else {
        console.error('Error desconocido:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <h1 className="signin-title">Sign In</h1>
        <h3 className="signin-subtitle">Sign in to continue</h3>
        <form className="signin-form">
          <div className="input-group">
            <label htmlFor="email">Username:</label>
            <input
              className="input"
              type="text"
              id="email"
              name="email"
              placeholder="Username"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error.length>0 && (
            <ul className='error-message'>
                {error.map((msg,index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
          )}
          <div className="checkbox-group">
            <input type="checkbox" id="rememberCheck" />
            <label htmlFor="rememberCheck">Remember me</label>
          </div>

          <center>
            <Button variant="filledBtn" label="Login" action={handleSubmit} />
          </center>
        </form>
        <div className="signin-links">
          <a href="/forgotpassword"> Forgot your password?</a>
          <a href="/SignUp">Create account</a>
        </div>
        <div className="signin-buttons">
          <Button
            href="/UserPage"
            variant="iconBtn"
            label={
              <>
                <FontAwesomeIcon icon={faGoogle} /> Continue with Google
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
