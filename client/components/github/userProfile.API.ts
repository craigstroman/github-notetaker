import axios from 'axios';
import { IProfile } from './userProfileTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getProfile(username: string): Promise<{ data: IProfile }> {
  const result = await axios.get(`${apiUrl}/profile/${username}`);

  return { data: result.data };
}
