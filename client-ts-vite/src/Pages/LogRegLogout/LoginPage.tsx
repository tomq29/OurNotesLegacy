import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../../services/axiosInstace';
import { AppContext } from '../../App/providers/context/contextProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email('Введите email').required('Введите email'),
    password: yup.string().required('Введите пароль'),
  })
  .required();

type loginPassType = {
  email: string;
  password: string;
};

function LoginPage(): JSX.Element {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { setCurrentUser } = useContext(AppContext);

  const navigate = useNavigate();

  const authorizationUser = async (loginPass: loginPassType) => {
    setServerError(null); // Reset server error before the request

    axiosInstance
      .post('/auth/login', loginPass)
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setCurrentUser(data.user);
        console.log(data.message);
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
            setServerError(data.message); // Set specific error message from the server
          } else {
            setServerError(
              'An unexpected error occurred. Please try again later.'
            );
          }
        } else if (error.request) {
          setServerError(
            'No response from the server. Please try again later.'
          );
        } else {
          setServerError('Network error. Please check your connection.');
        }
        console.log(error.message);
      });
  };

  return (
    <>
      <div style={{ width: '50%', margin: ' 0 auto' }}>
        <h2>Authorization</h2>
        <form onSubmit={handleSubmit(authorizationUser)}>
          <input
            type="text"
            {...register('email')}
            className="form-control mb-3"
            placeholder="Email"
          />
          <p className="text-danger  text-center mt-3">
            {errors.email?.message}
          </p>
          <input
            type="password"
            {...register('password')}
            className="form-control mb-3"
            placeholder="Пароль"
          />
          <p className="text-danger  text-center mt-3">
            {errors.password?.message}
          </p>
          <button type="submit" className="btn btn-outline-success">
            Войти
          </button>

          {serverError && (
            <p className="text-danger text-center mt-3">{serverError}</p>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
