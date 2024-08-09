import { useState } from 'react';
import AppRouter from './router/AppRouter';
import { User } from '../Entities/User/type/UserType';
import NavBar from '../Widgets/NavBar/NavBar';

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | undefined>({
    id: 1,
    login: 'tom',
    email: 'tom@tom',
    colorID: 1,
  });

  return (
    <>
      <NavBar currentUser={currentUser} />

      <AppRouter />
    </>
  );
}

export default App;
