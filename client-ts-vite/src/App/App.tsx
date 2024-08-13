import { useEffect, useReducer, useState } from 'react';
import AppRouter from './router/AppRouter';
import { User } from '../Entities/User/type/UserType';
import NavBar from '../Widgets/NavBar/NavBar';
import { AppContext } from './providers/contextProvider';
import { Text } from '../Entities/Texts/type/TextType';
import { Note, NoteWithTexts } from '../Entities/Notes/type/NoteType';
import axiosInstance, { setAccessToken } from '../../services/axiosInstace';
import { initStateForReducer, reducer } from './store/appReducer';

function App(): JSX.Element {
  // const [currentUser, setCurrentUser] = useState<User | undefined>({
  //   id: 1,
  //   login: 'tom',
  //   email: 'tom@tom',
  //   colorID: 1,
  // });

  const [state, dispatch] = useReducer(reducer, initStateForReducer);

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const [notes, setNotes] = useState<Note[]>([]);
  const [texts, setTexts] = useState<Text[]>([]);
  const [oneNote, setOneNote] = useState<NoteWithTexts>({
    id: 0,
    description: '',
    title: '',
    folderID: null,
    userID: 0,
    Texts: [],
  });
  const [oneText, setOneText] = useState<Text>({
    id: 0,
    body: '',
    userID: 0,
    noteID: 0,
  });

  const [addMode, setAddMode] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosInstance.get('/tokens/refresh').then(({ data }) => {
      setAccessToken(data.accessToken);
      setCurrentUser(data.user);
    });
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          notes,
          setNotes,
          texts,
          setTexts,
          oneNote,
          setOneNote,
          oneText,
          setOneText,
          addMode,
          setAddMode,
          loading,
          setLoading,
          state,
          dispatch,
        }}
      >
        <NavBar />

        <AppRouter />
      </AppContext.Provider>
    </>
  );
}

export default App;
