import axios from 'axios';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getNotes(repo: string) {
  const url = `${apiUrl}/notes/${repo}`;

  const res = await axios.get(url);

  return res.data;
}

export async function addNotes(repo: string, note: string) {
  const url = `${apiUrl}/notes/${repo}/${note}`;

  const result = await axios.post(url);

  return result.data;
}

export async function removeNotes(repo: string, noteId: number) {
  const url = `${apiUrl}/notes/${repo}/${noteId}`;

  const result = await axios.delete(url);

  return result.data;
}
