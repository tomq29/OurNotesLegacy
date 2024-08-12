import { createContext, Dispatch } from 'react';
import { Note, NoteWithTexts } from '../../Entities/Notes/type/NoteType';
import { Text } from '../../Entities/Texts/type/TextType';
import { User } from '../../Entities/User/type/UserType';
import { ActionType } from '../store/appReducer';

type stateContext = {
  notes: Note[];
  setNotes: Dispatch<React.SetStateAction<Note[]>>;

  oneNote: NoteWithTexts;
  setOneNote: Dispatch<React.SetStateAction<NoteWithTexts>>;

  texts: Text[];
  setTexts: Dispatch<React.SetStateAction<Text[]>>;

  oneText: Text;
  setOneText: Dispatch<React.SetStateAction<Text>>;

  currentUser: User | undefined;
  setCurrentUser: Dispatch<React.SetStateAction<User | undefined>>;

  addMode: boolean;
  setAddMode: Dispatch<React.SetStateAction<boolean>>;

  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;

  state: Note[];
  dispatch: React.Dispatch<ActionType>;
};

const initState: stateContext = {
  notes: [],
  setNotes: () => {},

  oneNote: {
    id: 0,
    description: '',
    title: '',
    folderID: null,
    userID: 0,
    Texts: [],
  },
  setOneNote: () => {},

  texts: [],
  setTexts: () => {},

  oneText: { id: 0, body: '', userID: 0, noteID: 0 },
  setOneText: () => {},

  currentUser: undefined,

  setCurrentUser: () => {},

  addMode: false,
  setAddMode: () => {},

  loading: true,
  setLoading: () => {},

  state: [],
  dispatch: () => {},
};

export const AppContext = createContext(initState);
