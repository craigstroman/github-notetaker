import axios from 'axios';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getProfile(username: string) {
  const result = await axios.get(`${apiUrl}/profile/${username}`);

  return result.data;
}
