import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const apiURL = 'https://api.github.com';
const headers = {
  headers: {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'content-type': 'application/json',
  },
};

export const getProfile = async (req, res) => {
  const username = req.params.username;

  try {
    const result = await axios.get(`${apiURL}/users/${username}`, {
      headers,
    });

    const { data } = result;

    res.status(200).send(data);
  } catch (error) {
    console.log('error: ');
    console.log(error);

    res.status(500).send(error);
  }
};

export const getRepos = async (req, res) => {
  const username = req.params.username;

  const url = `https://api.github.com/users/${username}/repos?page=1&per_page=100`;

  try {
    const result = await axios.get(url, {
      headers,
    });

    const { data } = result;

    res.status(200).send(data);
  } catch (error) {
    console.log('error: ');
    console.log(error);

    res.status(500).send(error);
  }
};
