import axios from 'axios';

export function getGithubRepos(username, currentPage) {
  return axios.get(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=100`)
    .then(res => res.data)
    .catch(error => ({ message: error }));
}

export function getGithubInfo(username) {
  return axios.all([
    axios.get(`https://api.github.com/users/${username}/repos?per_page=100`),
    axios.get(`https://api.github.com/users/${username}`),
  ])
  .then(arr => ({ repos: arr[0].data, bio: arr[1].data }))
  .catch(error => ({ message: error }));
}
