import axios from 'axios';
import { IUser } from './userInfoTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getSessionStatus(): Promise<{ data: IUser }> {
  const result = await axios.get(`${apiUrl}/sessionStatus`);
  return { data: result.data.user };
}
