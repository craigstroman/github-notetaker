const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

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

async function getProfile(req, res) {
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
}

async function getRepos(req, res) {
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
}

module.exports = {
  getProfile,
  getRepos,
};
