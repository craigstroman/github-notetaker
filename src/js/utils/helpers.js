import axios from 'axios';

export default function getGithubInfo(username) {
  return axios.all([
    axios.get(`https://api.github.com/users/${username}/repos`),
    axios.get(`https://api.github.com/users/${username}`),
  ])
  .then(arr => ({ repos: arr[0].data, bio: arr[1].data }))
  .catch(error => ({ message: error }));
}
