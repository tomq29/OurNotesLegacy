import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Note, NoteWithoutIDandFolderID } from '../type/NoteType';
import NoteApi from '../api/noteApi';

const initialState: Note[] = [];

export const getAllNotes = createAsyncThunk('notes/getAll', () =>
  NoteApi.getAllNotes()
);
export const createlNote = createAsyncThunk(
  'notes/createNote',
  (note: NoteWithoutIDandFolderID) => NoteApi.createNote(note)
);
export const deleteNote = createAsyncThunk('notes/deleteNote', (id: number) =>
  NoteApi.deteleNote(id)
);
export const updateNote = createAsyncThunk('notes/updateNote', (note: Note) =>
  NoteApi.updateNote(note)
);

const notesSlice = createSlice({
  name: 'Notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.push(...action.payload);
    });

    builder.addCase(createlNote.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id);
    });

    builder.addCase(updateNote.fulfilled, (state, action) => {
      return state.map((el) =>
        el.id === action.payload.id ? action.meta.arg : el
      );
    });
  },
});

export default notesSlice.reducer;
