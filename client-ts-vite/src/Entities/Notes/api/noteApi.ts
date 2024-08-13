import { AxiosResponse } from 'axios';
import {
  Note,
  NoteID,
  NoteWithoutIDandFolderID,
  NoteWithTexts,
} from '../type/NoteType';

import axiosInstance from '../../../../services/axiosInstace';

class NoteApi {
  static getAllNotes = async (): Promise<Note[]> => {
    const { data }: AxiosResponse<Note[]> = await axiosInstance.get('/notes');
    return data;
  };

  static getOneNote = async (id: NoteID): Promise<NoteWithTexts> => {
    const { data }: AxiosResponse<NoteWithTexts> = await axiosInstance.get(
      `/notes/note/${id}`
    );
    return data;
  };

  static createNote = async (note: NoteWithoutIDandFolderID): Promise<Note> => {
    const { data } = await axiosInstance.post<Note>('/notes', note);
    return data;
  };

  static updateNote = async (note: Note): Promise<number> => {
    const { data } = await axiosInstance.put<{
      updateStatus: number;
    }>(`/notes/note/${note.id}`, note);

    return data.updateStatus;
  };

  static deteleNote = async (id: number): Promise<number> => {
    const { data } = await axiosInstance.delete<{
      countDeletedNotes: number;
    }>(`/notes/note/${id}`);
    return data.countDeletedNotes;
  };
}

export default NoteApi;
