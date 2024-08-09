import { createContext, Dispatch } from 'react';
import { Note } from '../../Entities/Notes/type/NoteType';
import { Text } from '../../Entities/Texts/type/TextType';

type stateContext = {
  notes: Note[];
  setNotes: Dispatch<React.SetStateAction<Note[]>>;

  note: {};
  setNote: Dispatch<React.SetStateAction<Note>>;

  texts: Text[];
  setTexts: Dispatch<React.SetStateAction<Text[]>>;

  text: {};
  setText: Dispatch<React.SetStateAction<Text>>;
};

const initState: stateContext = {
  notes: [],
  setNotes: () => {},

  note: {},
  setNote: () => {},

  texts: [],
  setTexts: () => {},

  text: {},
  setText: () => {},
};

export const AppContext = createContext(initState);
