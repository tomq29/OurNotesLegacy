import { AxiosResponse } from 'axios';
import { Note, NoteID, NoteWithTexts } from '../type/NoteType';

import axiosInstance from '../../../../services/axiosInstace';


export const getAllNotes = async (): Promise<Note[]> => {
  const { data }: AxiosResponse<Note[]> = await axiosInstance.get('/notes');
  return data;
};

export const getOneNote = async (id: NoteID): Promise<NoteWithTexts> => {
  const { data }: AxiosResponse<NoteWithTexts> = await axiosInstance.get(
    `/notes/note/${id}`
  );
  return data;
};
