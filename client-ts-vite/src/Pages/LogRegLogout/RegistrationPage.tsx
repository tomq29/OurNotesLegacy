import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../../services/axiosInstace';
import { AppContext } from '../../App/providers/context/contextProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email('Введите email').required('Введите email'),
    login: yup.string().required('Введите login'),
    password: yup.string().required('Введите пароль'),
    confirm: yup.string().required('Потвердите пароль'),
  })
  .required();


  type logEmailPassType = {
    login: string;
    email: string;
    password: string;
    confirm: string;
  };

function RegistrationPage(): JSX.Element {
  const { setCurrentUser } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });


  const navigate = useNavigate();

  const registrationUser = (logEmailPass:logEmailPassType) => {
    if (logEmailPass.confirm === logEmailPass.password) {
      axiosInstance
      .post('/auth/reg', logEmailPass)
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
        <h2>Registration</h2>
        <form onSubmit={handleSubmit(registrationUser)}>
          <input
            type="text"
            {...register('login')}
            
            className="form-control mb-3"
            placeholder="Login"
          />
          <p className="text-danger  text-center mt-3">
            {errors.login?.message}
          </p>
          <input
            type="email"
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
          <input
            type="password"
            {...register('confirm')}
            className="form-control mb-3"
            placeholder="Подтвердите пароль"
          />
          <p className="text-danger  text-center mt-3">
            {errors.confirm?.message}
          </p>
          <button type="submit" className="btn btn-outline-success">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
}

export default RegistrationPage;
