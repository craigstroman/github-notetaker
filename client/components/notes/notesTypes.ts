export interface INote {
  _id: number;
  text: string;
  repo: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

export interface Notes {
  notes: INote[];
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
