import axios, { AxiosResponse } from 'axios';
import { Note } from '../type/NoteType';

import axiosInstance from '../../../../services/axiosInstace'


// export const noteRequest = axios.create({
//   baseURL: '/api/notes',
// });



export const getAllNotes = async (): Promise<Note[]> => {
  const { data }: AxiosResponse<Note[]> = await axiosInstance.get('/notes');
  return data;
};
