import axios, { AxiosResponse } from 'axios';
import { Note } from '../type/NoteType';

export const noteRequest = axios.create({
  baseURL: '/api/notes',
});

export const getAllNotes = async (): Promise<Note[]> => {
  const { data }: AxiosResponse<Note[]> = await noteRequest.get('/');
  return data;
};
