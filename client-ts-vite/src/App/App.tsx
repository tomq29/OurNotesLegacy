import { useEffect, useState } from 'react';
import AppRouter from './providers/router/AppRouter';

import NavBar from '../Widgets/NavBar/NavBar';

import { AppContext } from './providers/context/contextProvider';
import { useAppDispatch } from './providers/store/store';
import { refreshUser } from '../Entities/User/model/CurrentUserSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(refreshUser()).catch(console.log);
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          loading,
          setLoading,
        }}
      >
        <NavBar />

        <AppRouter />
      </AppContext.Provider>
    </>
  );
}

export default App;
