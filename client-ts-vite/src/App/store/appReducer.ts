import { Note } from '../../Entities/Notes/type/NoteType';

type InitStateType = Note[];

export const initState: InitStateType = [];

export type ActionType =
  | { type: 'addNew'; payload: Note }
  | { type: 'delete'; payload: number }
  | { type: 'getAll'; payload: Note[] }
  | { type: 'update'; payload: Note };

export function reducer(state: InitStateType,action: ActionType): InitStateType {
  
  switch (action.type) {
    case 'addNew':
      return [...state, action.payload];

    case 'delete':
      return state.filter((el) => el.id !== action.payload);
    case 'getAll':
      return action.payload;

    case 'update':
      return state.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload };
        } else {
          return el;
        }
      });

    default:
      return state;
  }
}
