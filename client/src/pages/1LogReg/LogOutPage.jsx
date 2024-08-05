import { useNavigate } from 'react-router-dom';
import apiAxiosInstance, {
  setAccessToken,
} from '../../../service/apiAxiosInstance';

function LogOutPage({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const logoutUser = () => {
    apiAxiosInstance
      .delete('/auth/logout')
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setCurrentUser(null);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="vstack gap-2 col-md-5 mx-auto">
        <div> {currentUser.login}, Вы точно хотите выйти?</div>
        <button
          onClick={logoutUser}
          type="button"
          className="btn btn-outline-secondary"
        >
          Да!
        </button>
        <button
          onClick={() => navigate('/')}
          type="button"
          className="btn btn-outline-success"
        >
          Нет, хочу остаться
        </button>
      </div>
    </>
  );
}

export default LogOutPage;
