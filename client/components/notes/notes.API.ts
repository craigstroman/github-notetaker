import axios from 'axios';
import { stat } from 'fs';
import { INote, Notes, INotesState, IAddNotes, IRemoveNotes } from './notesTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getNotes(repo: string): Promise<{ data: Notes }> {
  const url = `${apiUrl}/notes/${repo}`;

  const res = await axios.get(url);

  return { data: res.data };
}

export async function addNotes(repo: string, note: string): Promise<{ data: INote }> {
  const url = `${apiUrl}/notes/${repo}/${note}`;

  const result = await axios.post(url);

  return { data: result.data };
}

export async function removeNotes(repo: string, noteId: number): Promise<{ data: number }> {
  const url = `${apiUrl}/notes/${repo}/${noteId}`;

  const result = await axios.delete(url);
  let id = 0;

  if (result.status === 200) {
    id = result.data.id;
  }

  return { data: id };
}
