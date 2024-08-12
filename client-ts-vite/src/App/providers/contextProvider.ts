import { createContext, Dispatch } from 'react';
import { Note } from '../../Entities/Notes/type/NoteType';
import { Text } from '../../Entities/Texts/type/TextType';
import { User } from '../../Entities/User/type/UserType';

type stateContext = {
  notes: Note[];
  setNotes: Dispatch<React.SetStateAction<Note[]>>;

  oneNote: Note;
  setOneNote: Dispatch<React.SetStateAction<Note>> | Promise<Note>;

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
};

const initState: stateContext = {
  notes: [],
  setNotes: () => {},

  oneNote: { id: 0, description: '', title: '', folderID: null, userID: 0 },
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
};

export const AppContext = createContext(initState);
