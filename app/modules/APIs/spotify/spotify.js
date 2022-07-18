const { getAccessToken } = require("./authorization_code/getAccessToken");
const axios = require("axios");

const getSearchResults = (searchTerm, typeSearch, limit) => {
  return new Promise((resolve, rejects) => {
    getAccessToken().then(token => {
      let url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=${typeSearch}&limit=${limit}&access_token=${token.access_token}`;

      axios.get(url)
      .then((response) => {
        resolve(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
        rejects(error);
      });
    }).catch(err => {});
  });
};

module.exports = {
  getSearchResults,
};