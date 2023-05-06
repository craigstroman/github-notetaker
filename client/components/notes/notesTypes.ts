export interface INote {
  _id: string;
  text: string;
  repo: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

export interface INotesState {
  notes: INote[];
  status: 'idle' | 'loading' | 'error' | 'loaded';
}

export interface IAddNotes {
  repo: string;
  note: string;
}

export interface IRemoveNotes {
  repo: string;
  noteId: string;
}

export const notesInitialState: INotesState = {
  notes: [],
  status: 'idle',
};
