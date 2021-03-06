import axios from 'axios';
import util from 'util';
import { getNotes } from '../notes/index';

require('dotenv').config();

const apiURL = 'https://api.github.com';
const headers = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
};
let repoCount = 0;

export function getProfile(req, res) {
  const username = req.params.username;

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
      }
      res.status(500).send({
        error,
      });
    });
}

export function getRepos(req, res) {
  const username = req.params.username;
  const pagenumber = req.params.page_number;
  const pagesize = req.params.page_size;

  if (repoCount > 100) {
    const pages = Math.ceil(repoCount / 100);
    let urls = [];

    for (let i = 1; i <= pages; i++) {
      let url = `${apiURL}/users/${username}/repos?page=${i}&per_page=100`;
      urls.push(url);
    }

    axios
      .all(
        urls.map((l) => axios.get(l)),
        {
          headers,
        },
      )
      .then((resp) => {
        let result = [];

        resp.forEach((r) => {
          result.push(...r.data);
        });

        res.send(result);
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
  } else {
    let url = `https://api.github.com/users/${username}/repos?page=1&per_page=100`;

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
}
