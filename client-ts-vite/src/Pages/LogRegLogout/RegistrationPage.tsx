import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../../services/axiosInstace';
import { AppContext } from '../../App/providers/contextProvider';

function RegistrationPage(): JSX.Element {
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const [login, setLogin] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const navigate = useNavigate();

  const registrationUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (confirm === password) {
      if (login && email && password) {
        axiosInstance
          .post('/auth/reg', {
            login,
            email,
            password,
          })
          .then(({ data }) => {
            setAccessToken(data.accessToken);
            setCurrentUser(data.user);
            console.log(data.message);
            navigate('/');
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <div style={{ width: '50%', margin: ' 0 auto' }}>
        <h2>Registration</h2>
        <form onSubmit={registrationUser}>
          <input
            type="text"
            onChange={({ target }) => setLogin(target.value)}
            className="form-control mb-3"
            required
            placeholder="Login"
          />
          <input
            type="email"
            onChange={({ target }) => setEmail(target.value)}
            className="form-control mb-3"
            required
            placeholder="Email"
          />
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            className="form-control mb-3"
            required
            placeholder="Пароль"
          />
          <input
            type="password"
            onChange={({ target }) => setConfirm(target.value)}
            className="form-control mb-3"
            required
            placeholder="Подтвердите пароль"
          />
          <button type="submit" className="btn btn-outline-success">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );

  // return <div>RegistrationPage</div>;
}

export default RegistrationPage;
