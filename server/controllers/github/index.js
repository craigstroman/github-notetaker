import axios from 'axios';
import { application } from 'express';
import util from 'util';
import { getNotes } from '../notes/index';

require('dotenv').config();

const apiURL = 'https://api.github.com';
const headers = {
  headers: {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    Authorization: process.env.GITHUB_TOKEN,
    'content-type': 'application/json',
    'x-ratelimit-reset': '1598048562',
  },
};
let repoCount = 0;

export function getProfile(req, res) {
  const username = req.params.username;
  const FaceBookBioFixture = require('../../../fixtures/facebook/bio.json');
  const CraigStromanBioFixture = require('../../../fixtures/craigstroman/bio.json');

  // if (process.env.NODE_ENV === 'development') {
  //   res.send(CraigStromanBioFixture);
  // } else {
  axios
    .get(`${apiURL}/users/${username}`, {
      headers,
    })
    .then((resp) => {
      repoCount = resp.data['public_repos'];
      res.send(resp.data);
    })
    .catch((error) => {
      if (error.message === 'Request failed with status code 404') {
        res.status(404).send({
          message: 'Not found',
          status: 404,
        });
      } else if (error.message.indexOf('API rate limit exceeded')) {
        res.status(500).send({
          message: 'Rate limit exceeded.',
          status: 500,
        });
      }
      res.status(500).send({
        error,
        message: 'There was an error.',
      });
    });
  // }
}

export function getRepos(req, res) {
  const username = req.params.username;
  const FaceBookReposFixture = require('../../../fixtures/facebook/repos.json');
  const CraigStromanRepos = require('../../../fixtures/craigstroman/repos.json');

  const url = `https://api.github.com/users/${username}/repos?page=1&per_page=100`;

  axios
    .get(url, {
      headers,
    })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((error) => {
      if (error.message === 'Request failed with status code 404') {
        res.status(404).send({
          message: 'Not found',
          status: 404,
        });
      }
      res.status(500).send({
        error,
      });
    });
}
