import { useNavigate } from 'react-router-dom';
import apiAxiosInstance, {
  setAccessToken,
} from '../../../service/apiAxiosInstance';
import { useState } from 'react';

function RegistrationPage({ setCurrentUser }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const navigate = useNavigate();

  const registrationUser = (event) => {
    event.preventDefault();

    if (confirm === password) {
      if (name && email && password) {
        apiAxiosInstance
          .post('/auth/reg', {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
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
            onChange={({ target }) => setName(target.value)}
            className="form-control mb-3"
            required
            placeholder="Имя"
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
}

export default RegistrationPage;
