import { NoteID } from '../../Notes/type/NoteType';
import { UserID } from '../../User/type/UserType';

export type Text = {
  id: number;
  body: string;
  userID: UserID;
  noteID: NoteID;
};
