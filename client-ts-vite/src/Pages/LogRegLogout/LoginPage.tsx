import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../../services/axiosInstace';
import { AppContext } from '../../App/providers/context/contextProvider';

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setCurrentUser } = useContext(AppContext);

  const navigate = useNavigate();

  const authorizationUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && password) {
      axiosInstance
        .post('/auth/login', { email: email.trim(), password: password.trim() })
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setCurrentUser(data.user);
          console.log(data.message);
          navigate('/');
        })
        .catch(console.log);
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

  // return <div>LoginPage</div>;
}

export default LoginPage;
