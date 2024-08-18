import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../../services/axiosInstace';
import { AppContext } from '../../App/providers/context/contextProvider';

function LogOutPage(): JSX.Element {


  const navigate = useNavigate();

  // const logoutUser = () => {
  //   axiosInstance
  //     .delete('/auth/logout')
  //     .then(({ data }) => {
  //       setAccessToken(data.accessToken);
  //       setCurrentUser(undefined);
  //       navigate('/');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <div className="vstack gap-2 col-md-5 mx-auto">
        <div> {currentUser?.login}, Вы точно хотите выйти?</div>
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

  // return <div>LogOutPage</div>;
}

export default LogOutPage;
