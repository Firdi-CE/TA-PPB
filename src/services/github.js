const BASE_URL = 'https://api.github.com';
const USERNAME = 'Firdi-CE'; // Based on your file paths

export const githubApi = {

  getProfile: async () => {
    const response = await fetch(`${BASE_URL}/users/${USERNAME}`);
    return response.json();
  },

  getRepos: async () => {
    const response = await fetch(`${BASE_URL}/users/${USERNAME}/repos?sort=updated`);
    return response.json();
  },
  
  getFollowers: async () => {
    const response = await fetch(`${BASE_URL}/users/${USERNAME}/followers`);
    return response.json();
  },

  getUserDetail: async (login) => {
    const response = await fetch(`${BASE_URL}/users/${login}`);
    return response.json();
  }
};