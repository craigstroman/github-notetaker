import axios from 'axios';
import { IProfile, IRepo, IUser } from './profileTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getProfile(username: string): Promise<{ data: IProfile }> {
  const result = await axios.get(`${apiUrl}/profile/${username}`);

  return { data: result.data };
}

export async function getRepos(username: string): Promise<{ data: IRepo[] }> {
  const result = await axios.get(`${apiUrl}/repos/${username}`);

  return { data: result.data };
}

export async function getSessionStatus(): Promise<{ data: IUser }> {
  const result = await axios.get('/api/sessionStatus');
  return { data: result.data.user };
}
