import axios from 'axios';
import { IRepo } from './userReposTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getRepos(username: string): Promise<{ data: IRepo[] }> {
  const result = await axios.get(`${apiUrl}/repos/${username}`);

  return { data: result.data };
}
