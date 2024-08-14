import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NoteID, NoteWithTexts } from '../type/NoteType';
import NoteApi from '../api/noteApi';

export const getOneNote = createAsyncThunk('note/getOne', (id: NoteID) =>
  NoteApi.getOneNote(id)
);

const initialState: NoteWithTexts = {
  id: 0,
  description: '',
  title: '',
  folderID: null,
  userID: 0,
  Texts: [],
};

const oneNote = createSlice({
  name: 'oneNote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneNote.fulfilled, (state, action) => {
      return { ...state, ...action.payload};
    });
  },
});

export default oneNote.reducer;
