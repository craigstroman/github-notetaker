import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { notesInitialState, INotesState, IAddNotes, IRemoveNotes, IUpdateNote } from './notesTypes';
import { getNotes, addNotes, removeNotes, updateNote } from './notes.API';

export const fetchNotesAsync = createAsyncThunk('notes/get', async (repo: string) => {
  const response = await getNotes(repo);

  return response.data;
});

export const addNotesAsync = createAsyncThunk('notes/add', async (notes: IAddNotes) => {
  const response = await addNotes(notes.repo, notes.note);

  return response.data;
});

export const removeNotesAsync = createAsyncThunk('notes/remove', async (notes: IRemoveNotes) => {
  const response = await removeNotes(notes.repo, notes.noteId);

  return response.data;
});

export const updateNoteAsync = createAsyncThunk('notes/update', async (notes: IUpdateNote) => {
  const response = await updateNote(notes.noteId, notes.note);

  return response.data;
});

export const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {
    resetState: () => {
      const newState = notesInitialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(fetchNotesAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'loaded';
        newState.notes = [...action.payload];
        return newState;
      })
      .addCase(fetchNotesAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'error';
        return newState;
      })
      .addCase(addNotesAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(addNotesAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'loaded';
        newState.notes = [...state.notes, action.payload];
        return newState;
      })
      .addCase(addNotesAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'error';
        return newState;
      })
      .addCase(removeNotesAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(removeNotesAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'loaded';
        newState.notes = [...state.notes];
        newState.notes = [...state.notes.filter((note) => note._id !== action.payload)];
        return newState;
      })
      .addCase(removeNotesAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'error';
        return newState;
      })
      .addCase(updateNoteAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'loaded';
        newState.notes = newState.notes.map((el) => {
          if (el._id === action.payload._id) {
            return {
              _id: action.payload._id,
              text: action.payload.text,
              repo: action.payload.repo,
              createdAt: action.payload.createdAt,
              updatedAt: action.payload.updatedAt,
              user_id: action.payload.user_id,
            };
          } else {
            return el;
          }
        });
        return newState;
      })
      .addCase(updateNoteAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'error';
        return newState;
      });
  },
});

export const { resetState } = notesSlice.actions;

export const selectNotesState = (state: RootState): INotesState => state.notes;

export default notesSlice.reducer;
