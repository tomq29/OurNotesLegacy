import { FolderID } from '../../Folder/type/FolderType';
import { UserID } from '../../User/type/UserType';

export type Note = {
  id: number;
  title: string;
  description: string;
  folderID: FolderID;
  userID: UserID;
};

export type NoteID = Note['id'];
