export interface INote {
  id: number;
  text: string;
  repo: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
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
  noteId: number;
}

export interface IUpdateNote {
  noteId: number;
  note: string;
}

export const notesInitialState: INotesState = {
  notes: [],
  status: 'idle',
};
