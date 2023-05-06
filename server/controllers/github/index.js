import axios from 'axios';

require('dotenv').config();

const apiURL = 'https://api.github.com';
const headers = {
  headers: {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'content-type': 'application/json',
  },
};

export async function getProfile(req, res) {
  const username = req.params.username;
  const FaceBookBioFixture = require('../../../fixtures/facebook/bio.json');
  const CraigStromanBioFixture = require('../../../fixtures/craigstroman/bio.json');

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

export async function getRepos(req, res) {
  const username = req.params.username;
  const FaceBookReposFixture = require('../../../fixtures/facebook/repos.json');
  const CraigStromanRepos = require('../../../fixtures/craigstroman/repos.json');

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
