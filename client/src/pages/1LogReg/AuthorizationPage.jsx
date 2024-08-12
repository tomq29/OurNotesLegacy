import { useState } from 'react';
import apiAxiosInstance, {
  setAccessToken,
} from '../../../service/apiAxiosInstance';
import { useNavigate } from 'react-router-dom';

function AuthorizationPage({ setCurrentUser }) {
  const [error, setError] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const authorizationUser = (event) => {
    event.preventDefault();

    if (email && password) {
      apiAxiosInstance
        .post('/auth/login', { email: email.trim(), password: password.trim() })
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setCurrentUser(data.user);
          console.log(data.message);
          navigate('/');
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  return (
    <>
      <div style={{ width: '50%', margin: ' 0 auto' }}>
        <h2>Authorization</h2>
        <form onSubmit={authorizationUser}>
          <input
            type="text"
            onChange={({ target }) => setEmail(target.value)}
            className="form-control mb-3"
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            className="form-control mb-3"
            placeholder="Пароль"
            required
          />
          <button type="submit" className="btn btn-outline-success">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default AuthorizationPage;
